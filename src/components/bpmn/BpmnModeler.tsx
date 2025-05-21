import { useEffect, useRef } from "react"
import BpmnJS from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"
import { emptyBpmnTemplate } from "../../utils/bpmn-templates"

interface BpmnModelerProps {
  setBpmnModeler: (modeler: any) => void
  setSelectedElement: (element: any) => void
  initialDiagram?: string | null
}

export default function BpmnModeler({ setBpmnModeler, setSelectedElement, initialDiagram }: BpmnModelerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize the BPMN modeler
    const modeler = new BpmnJS({
      container: containerRef.current,
    })

    // Set the modeler in parent component
    setBpmnModeler(modeler)

    // Import the BPMN diagram
    modeler.importXML(initialDiagram || emptyBpmnTemplate).catch((err: Error) => {
      console.error("Error importing BPMN diagram", err)
    })

    // Add event listener for element selection
    modeler.on("element.click", (event: any) => {
      const { element } = event
      setSelectedElement(element)
    })

    // Clean up on unmount
    return () => {
      modeler.destroy()
    }
  }, [setBpmnModeler, setSelectedElement, initialDiagram])

  return <div ref={containerRef} className="w-full h-full" />
}
export {}