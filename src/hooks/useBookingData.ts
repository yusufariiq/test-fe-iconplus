import { useEffect, useState } from "react"
import type { ConsumptionTypeData, MeetingRoomData, UnitData } from "../types/booking"
import { bookingService } from "../services/bookingServices"
import { TIME_RULES } from "../constants/timeRules"
import toast from "react-hot-toast"

export const useBookingData = () => {
    const [units, setUnits] = useState<UnitData[]>([])
    const [meetingRooms, setMeetingRooms] = useState<MeetingRoomData[]>([])
    const [consumptionTypes, setConsumptionTypes] = useState<ConsumptionTypeData[]>([])
    const [mappedConsumptionTypes, setMappedConsumptionTypes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadAllData = async () => {
            try {
                setLoading(true)
    
                const [unitsData, roomsData, consumptionData] = await Promise.all([
                    bookingService.fetchUnit(),
                    bookingService.fetchMeetingRooms(),
                    bookingService.fetchConsumptionType(),
                ])
    
                setUnits(unitsData)
                setMeetingRooms(roomsData)
                setConsumptionTypes(consumptionData)
                
                const mapped = TIME_RULES.map((rule, index) => ({
                    id: consumptionData[index]?.id || rule.key,
                    name: consumptionData[index]?.name || rule.displayName,
                    maxPrice: consumptionData[index]?.maxPrice || (rule.key.includes('makan') ? 30000 : 20000),
                    condition: rule.condition,
                    ruleKey: rule.key
                }))
                
                setMappedConsumptionTypes(mapped)

            } catch (error) {
                console.error('Gagal memuat data:', error)
                toast.error("Gagal memuat data, silahkan coba lagi");
            } finally {
                setLoading(false)
            }
        }
    
        loadAllData()
    }, [])
    
    return {
        units,
        meetingRooms,
        consumptionTypes,
        mappedConsumptionTypes,
        loading,
    }
}