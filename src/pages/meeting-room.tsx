import { ChevronLeft, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { useState } from "react"
import Breadcrumbs from "../components/common/breadcrumbs"
import BookingForm from "../components/common/booking-form"

export function MeetingRoom() {
    const [showBookingForm, setShowBookingForm] = useState(false)

    const breadcrumbsItems = showBookingForm ? 
    [
        { label: "Ruang Meeting", href: "/#" },
        { label: "Pesan Ruangan", isActive: true },
        
    ] : [
        { label: "Ruang Meeting", isActive: true }
    ]

    const handleBookRoom = () => {
        setShowBookingForm(true)
    }

    const handleBack = () => {
        setShowBookingForm(false)
    }

    const handleCancel = () => {
        setShowBookingForm(false)
    }

    const handleSave = () => {
        setShowBookingForm(false)
    }

    return (
        <main className="flex-1 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    {showBookingForm && (
                        <Button onClick={handleBack} className="p-2 rounded-md transition-colors">
                            <ChevronLeft className="h-5 w-5 text-white" />
                        </Button>
                    )}
                    <div>
                        <h1 className="text-[28px] font-bold text-gray-900 mb-2">Ruang Meeting</h1>
                    </div>
                </div>
                
                {!showBookingForm && (
                    <Button onClick={handleBookRoom} className="flex gap-2">
                        <Plus className="h-4 w-4" />
                        Pesan Ruangan
                    </Button>
                )}
            </div>

            <Breadcrumbs items={breadcrumbsItems}/>
            

            {showBookingForm && (
                <div className="transition-all duration-300 ease-in-out">
                    <div className="animate-in slide-in-from-right-4 duration-300">
                        <BookingForm onCancel={handleCancel} onSave={handleSave}/>
                    </div>
                </div>
            )}
        </main>
    )
}
