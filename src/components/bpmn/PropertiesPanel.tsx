import { useEffect, useState } from "react"

interface PropertiesPanelProps {
  selectedElement: any
  bpmnModeler: any
}

export default function PropertiesPanel({ selectedElement, bpmnModeler }: PropertiesPanelProps) {
  const [elementType, setElementType] = useState<string>("")
  const [elementId, setElementId] = useState<string>("")
  const [elementName, setElementName] = useState<string>("")
  const [elementDocumentation, setElementDocumentation] = useState<string>("")

  useEffect(() => {
    if (!selectedElement || !bpmnModeler) {
      setElementType("")
      setElementId("")
      setElementName("")
      setElementDocumentation("")
      return
    }

    const modeling = bpmnModeler.get("modeling")
    const elementRegistry = bpmnModeler.get("elementRegistry")
    const moddle = bpmnModeler.get("moddle")

    // Get element type
    setElementType(selectedElement.type.replace("bpmn:", ""))

    // Get element ID
    setElementId(selectedElement.id || "")

    // Get element name
    setElementName(selectedElement.businessObject.name || "")

    // Get element documentation
    const documentation =
      selectedElement.businessObject.documentation &&
      selectedElement.businessObject.documentation[0] &&
      selectedElement.businessObject.documentation[0].text
    setElementDocumentation(documentation || "")
  }, [selectedElement, bpmnModeler])

  const updateProperty = (property: string, value: string) => {
    if (!selectedElement || !bpmnModeler) return

    const modeling = bpmnModeler.get("modeling")
    const moddle = bpmnModeler.get("moddle")

    if (property === "id") {
      modeling.updateProperties(selectedElement, { id: value })
      setElementId(value)
    } else if (property === "name") {
      modeling.updateProperties(selectedElement, { name: value })
      setElementName(value)
    } else if (property === "documentation") {
      const documentation = moddle.create("bpmn:Documentation", {
        text: value,
      })
      modeling.updateProperties(selectedElement, {
        documentation: [documentation],
      })
      setElementDocumentation(value)
    }
  }

  if (!selectedElement) {
    return (
      <div className="text-center text-muted-foreground p-8">Select an element to view and edit its properties</div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Element Type</label>
        <div className="p-2 border rounded-md bg-muted/50">{elementType}</div>
      </div>

      <div>
        <label htmlFor="element-id" className="block text-sm font-medium mb-1">ID</label>
        <input
          id="element-id"
          className="w-full p-2 border rounded-md"
          value={elementId}
          onChange={(e) => updateProperty("id", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="element-name" className="block text-sm font-medium mb-1">Name</label>
        <input
          id="element-name"
          className="w-full p-2 border rounded-md"
          value={elementName}
          onChange={(e) => updateProperty("name", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="element-documentation" className="block text-sm font-medium mb-1">Documentation</label>
        <textarea
          id="element-documentation"
          className="w-full p-2 border rounded-md h-32"
          value={elementDocumentation}
          onChange={(e) => updateProperty("documentation", e.target.value)}
        />
      </div>

      {elementType === "Task" && (
        <div>
          <label htmlFor="task-type" className="block text-sm font-medium mb-1">Task Type</label>
          <select
            id="task-type"
            className="w-full p-2 border rounded-md"
            defaultValue="userTask"
            onChange={(e) => {
              if (!bpmnModeler || !selectedElement) return

              const bpmnReplace = bpmnModeler.get("bpmnReplace")
              const newElement = bpmnReplace.replaceElement(selectedElement, {
                type: `bpmn:${e.target.value}`,
              })

              // Update the selected element
              bpmnModeler.get("selection").select(newElement)
            }}
          >
            <option value="Task">None</option>
            <option value="UserTask">User</option>
            <option value="ServiceTask">Service</option>
            <option value="SendTask">Send</option>
            <option value="ReceiveTask">Receive</option>
            <option value="ManualTask">Manual</option>
            <option value="BusinessRuleTask">Business Rule</option>
            <option value="ScriptTask">Script</option>
          </select>
        </div>
      )}

      {elementType === "Gateway" && (
        <div>
          <label htmlFor="gateway-type" className="block text-sm font-medium mb-1">Gateway Type</label>
          <select
            id="gateway-type"
            className="w-full p-2 border rounded-md"
            defaultValue="exclusiveGateway"
            onChange={(e) => {
              if (!bpmnModeler || !selectedElement) return

              const bpmnReplace = bpmnModeler.get("bpmnReplace")
              const newElement = bpmnReplace.replaceElement(selectedElement, {
                type: `bpmn:${e.target.value}`,
              })

              // Update the selected element
              bpmnModeler.get("selection").select(newElement)
            }}
          >
            <option value="ExclusiveGateway">Exclusive</option>
            <option value="ParallelGateway">Parallel</option>
            <option value="InclusiveGateway">Inclusive</option>
            <option value="EventBasedGateway">Event Based</option>
          </select>
        </div>
      )}
    </div>
  )
}export {}