import { Link } from "react-router-dom"
import { Plus } from 'lucide-react'
import { Button } from "../components/ui/button"
import Layout from "../components/layout/Layout"

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Übersicht</h1>
        <Link to="/modeler">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neuer Prozess
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Gesamte Prozesse</h2>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 im Vergleich zum letzten Monat</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Aktive Prozesse</h2>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">+1 im Vergleich zum letzten Monat</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Prozessausführungen</h2>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-muted-foreground">+22% im Vergleich zum letzten Monat</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Aktuelle Prozesse</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Bestellprozess</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Prozess zur Bearbeitung von Kundenbestellungen</p>
            <div className="flex justify-between mt-4">
              <Link to="/processes/1">
                <Button variant="outline" size="sm">
                  Ansehen
                </Button>
              </Link>
              <Link to="/modeler/1">
                <Button size="sm">Bearbeiten</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Kunden-Onboarding</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Registrierungsprozess für neue Kunden</p>
            <div className="flex justify-between mt-4">
              <Link to="/processes/2">
                <Button variant="outline" size="sm">
                  Ansehen
                </Button>
              </Link>
              <Link to="/modeler/2">
                <Button size="sm">Bearbeiten</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Rechnungsfreigabe</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Prozess zur Freigabe von Rechnungen</p>
            <div className="flex justify-between mt-4">
              <Link to="/processes/3">
                <Button variant="outline" size="sm">
                  Ansehen
                </Button>
              </Link>
              <Link to="/modeler/3">
                <Button size="sm">Bearbeiten</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export {}