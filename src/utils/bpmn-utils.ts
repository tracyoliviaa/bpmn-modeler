/**
 * Save the diagram as SVG
 */
export async function saveSvg(bpmnModeler: any) {
  try {
    const { svg } = await bpmnModeler.saveSVG()

    // Create a blob from the SVG
    const blob = new Blob([svg], { type: "image/svg+xml" })

    // Create a download link
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = "diagram.svg"

    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return true
  } catch (err) {
    console.error("Error saving SVG", err)
    return false
  }
}

/**
 * Save the diagram as BPMN XML
 */
export async function saveDiagram(bpmnModeler: any) {
  try {
    const { xml } = await bpmnModeler.saveXML({ format: true })

    // Create a blob from the XML
    const blob = new Blob([xml], { type: "application/xml" })

    // Create a download link
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = "diagram.bpmn"

    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return true
  } catch (err) {
    console.error("Error saving BPMN", err)
    return false
  }
}

/**
 * Load a BPMN diagram from a file
 */
export async function loadDiagram(bpmnModeler: any, file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const xml = e.target?.result
        await bpmnModeler.importXML(xml)
        resolve(true)
      } catch (err) {
        console.error("Error importing BPMN diagram", err)
        reject(err)
      }
    }

    reader.onerror = (err) => {
      console.error("Error reading file", err)
      reject(err)
    }

    reader.readAsText(file)
  })
}
export {}