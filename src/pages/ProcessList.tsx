import { useEffect, useState } from "react" 
import { Link } from "react-router-dom" 
import { Plus } from 'lucide-react' 
import { Button } from "../components/ui/button" 
import Layout from "../components/layout/Layout" 
import { api, Process } from "../services/api"  

export default function ProcessList() {   
  const [processes, setProcesses] = useState<Process[]>([])   
  const [loading, setLoading] = useState(true)   
  const [error, setError] = useState<string | null>(null)    
  
  useEffect(() => {     
    const fetchProcesses = async () => {       
      try {         
        setLoading(true)         
        const data = await api.getProcesses()         
        setProcesses(data)       
      } catch (err) {         
        console.error("Error fetching processes:", err)         
        setError("Prozesse konnten nicht geladen werden. Bitte versuchen Sie es erneut.")       
      } finally {         
        setLoading(false)       
      }     
    }      
    
    fetchProcesses()   
  }, [])    
  
  return (     
    <Layout>       
      <div className="flex items-center justify-between mb-6">         
        <h1 className="text-2xl font-bold">Prozesse</h1>         
        <Link to="/modeler">           
          <Button>             
            <Plus className="mr-2 h-4 w-4" />             
            Neuer Prozess           
          </Button>         
        </Link>       
      </div>        
      
      <div className="max-w-6xl w-full mx-auto flex items-center gap-4 mb-6">         
        <form className="flex-1">           
          <input             
            placeholder="Prozesse durchsuchen..."             
            className="w-full p-2 border rounded-md bg-background"           
          />           
          <Button type="submit" className="sr-only">             
            Absenden           
          </Button>         
        </form>       
      </div>        
      
      {loading ? (         
        <div className="text-center py-8">Prozesse werden geladen...</div>       
      ) : error ? (         
        <div className="text-center py-8 text-red-500">{error}</div>       
      ) : processes.length === 0 ? (         
        <div className="text-center py-8">           
          <p className="text-muted-foreground mb-4">Keine Prozesse gefunden</p>           
          <Link to="/modeler">             
            <Button>Erstellen Sie Ihren ersten Prozess</Button>           
          </Link>         
        </div>       
      ) : (         
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">           
          {processes.map((process) => (             
            <div key={process.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">               
              <div className="p-4 border-b">                 
                <div className="flex items-center justify-between">                   
                  <h3 className="font-medium">{process.name}</h3>                   
                  <div                     
                    className={`px-2 py-1 text-xs rounded-full ${                       
                      process.status === "active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"                     
                    }`}                   
                  >                     
                    {process.status === "active" ? "Aktiv" : "Entwurf"}                   
                  </div>                 
                </div>                 
                <p className="text-sm text-muted-foreground">{process.description || "Keine Beschreibung"}</p>               
              </div>               
              <div className="p-4">                 
                <div className="text-sm text-muted-foreground">                   
                  Zuletzt bearbeitet: {new Date(process.updatedAt).toLocaleDateString()}                 
                </div>                 
                <div className="text-sm text-muted-foreground">Version: {process.version}</div>                 
                <div className="flex justify-between mt-4">                   
                  <Link to={`/processes/${process.id}`}>                     
                    <Button variant="outline" size="sm">                       
                      Ansehen                     
                    </Button>                   
                  </Link>                   
                  <Link to={`/modeler/${process.id}`}>                     
                    <Button size="sm">Bearbeiten</Button>                   
                  </Link>                 
                </div>               
              </div>             
            </div>           
          ))}         
        </div>       
      )}     
    </Layout>   
  ) 
} 

export {}