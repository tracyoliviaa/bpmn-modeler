
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ProcessList from "./pages/ProcessList"
import ProcessView from "./pages/ProcessView"
import BpmnModeler from "./pages/BpmnModeler"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/processes" element={<ProcessList />} />
        <Route path="/processes/:id" element={<ProcessView />} />
        <Route path="/modeler" element={<BpmnModeler />} />
        <Route path="/modeler/:id" element={<BpmnModeler />} />
        
      </Routes>
    </Router>
  )
}

export default App




