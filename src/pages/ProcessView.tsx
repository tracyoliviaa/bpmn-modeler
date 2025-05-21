import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from "../components/ui/button"
import BpmnModeler from "../components/bpmn/BpmnModeler"
import PropertiesPanel from "../components/bpmn/PropertiesPanel"
import { api } from "../services/api"
import { orderProcessTemplate } from "../utils/bpmn-templates"

export default function BpmnModelerPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = !id

  // Import type if available, otherwise use 'any' as a fallback
  const [bpmnModeler, setBpmnModeler] = useState<any>(null)
  const [selectedElement, setSelectedElement] = useState(null)
  const [processName, setProcessName] = useState(isNew ? "Neuer Prozess" : `Prozess ${id}`)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("properties")

  useEffect(() => {
    // In a real app, this would fetch the process from an API if id exists
    if (!isNew) {
      const fetchProcess = async () => {
        try {
          setLoading(true)
          const process = await api.getProcess(id)
          setProcessName(process.name)
          setLoading(false)
        } catch (err) {
          console.error(`Error fetching process ${id}:`, err)
          setLoading(false)
        }
      }
      
      fetchProcess()
    } else {
      setLoading(false)
    }
  }, [id, isNew])

  const handleSave = async () => {
    if (!bpmnModeler) return

    try {
      // Get the BPMN XML
      const { xml } = await bpmnModeler.saveXML({ format: true })
      
      if (isNew) {
        // Create a new process
        const newProcess = await api.createProcess({
          name: processName,
          description: "Erstellt mit BPMN Modeler",
          definition: { bpmnXml: xml },
          status: "draft",
        })
        
        alert("Prozess erfolgreich erstellt!")
        navigate(`/processes/${newProcess.id}`)
      } else {
        // Update existing process
        await api.updateProcess(id, {
          definition: { bpmnXml: xml },
        })
        
        alert("Prozess erfolgreich gespeichert!")
      }
    } catch (err) {
      console.error("Error saving process", err)
      alert("Fehler beim Speichern des Prozesses")
    }
  }

  const handleDeploy = async () => {
    if (!bpmnModeler) return

    try {
      const { xml } = await bpmnModeler.saveXML({ format: true })
      
      if (isNew) {
        // Create and deploy a new process
        const newProcess = await api.createProcess({
          name: processName,
          description: "Erstellt mit BPMN Modeler",
          definition: { bpmnXml: xml },
          status: "active", // Set as active when deploying
        })
        
        alert("Prozess erfolgreich bereitgestellt!")
        navigate(`/processes/${newProcess.id}`)
      } else {
        // Update and deploy existing process
        await api.updateProcess(id, {
          definition: { bpmnXml: xml },
          status: "active", // Set as active when deploying
        })
        
        alert("Prozess erfolgreich bereitgestellt!")
      }
    } catch (err) {
      console.error("Error deploying process", err)
      alert("Fehler bei der Bereitstellung des Prozesses")
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between p-4 border-b bg-background">
          <h1 className="text-xl font-bold">BPMN Prozess-Modellierer</h1>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">Wird geladen...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <Link to="/processes" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Zurück zur Prozessliste
          </Link>
          <h1 className="text-xl font-bold">{processName}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </Button>
          <Button onClick={handleDeploy}>Bereitstellen</Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          <div className="absolute inset-0 m-4 overflow-hidden border rounded-lg bg-white">
            <BpmnModeler
              setBpmnModeler={setBpmnModeler}
              setSelectedElement={setSelectedElement}
              initialDiagram={isNew ? orderProcessTemplate : null}
            />
          </div>
        </div>

        <div className="w-80 border-l bg-background overflow-y-auto">
          <div className="border-b">
            <div className="flex">
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activeTab === "properties" ? "border-b-2 border-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("properties")}
              >
                Eigenschaften
              </button>
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activeTab === "xml" ? "border-b-2 border-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("xml")}
              >
                XML
              </button>
            </div>
          </div>

          <div className="p-4">
            {activeTab === "properties" ? (
              <PropertiesPanel selectedElement={selectedElement} bpmnModeler={bpmnModeler} />
            ) : (
              <div className="text-sm text-muted-foreground">
                <p>Anzeigen und Bearbeiten des rohen BPMN-XML.</p>
                <p className="mt-2">Diese Funktion wird mit dem nächsten Update verfügbar sein.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export {}