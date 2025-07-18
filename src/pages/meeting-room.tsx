import { Plus } from "lucide-react"
import { Button } from "../components/ui/button"
// import Button from "../components/ui/button"

export function MeetingRoom() {
    return (
        <main className="flex-1 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
                <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ruang Meeting</h1>
                <p className="text-gray-600">Ruang Meeting</p>
                </div>

                <Button variant="default" className="flex gap-2">
                    <Plus className="h-4 w-4" />
                    Pesan Ruangan
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center text-gray-500">
                <p>Meeting room content will be displayed here</p>
                </div>
            </div>
        </main>
    )
}
