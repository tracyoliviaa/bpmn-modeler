import { useEffect, useRef } from "react"
import BpmnJS from 'bpmn-js/lib/NavigatedViewer';
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"
import { emptyBpmnTemplate } from "../../utils/bpmn-templates"

interface BpmnViewerProps {
  xml: string
}

export default function BpmnViewer({ xml }: BpmnViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize the BPMN viewer
    const viewer = new BpmnJS({
      container: containerRef.current,
    })

    // Import the BPMN diagram
    viewer.importXML(xml || emptyBpmnTemplate).catch((err: Error) => {
      console.error("Error importing BPMN diagram", err)
    })

    // Clean up on unmount
    return () => {
      viewer.destroy()
    }
  }, [xml])

  return <div ref={containerRef} className="w-full h-full" />
}
export {}