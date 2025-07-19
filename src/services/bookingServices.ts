import axios from "axios"
import type { ConsumptionTypeData, MeetingRoomData, UnitData } from "../types/booking"

export const bookingService = {
    async fetchUnit(): Promise<UnitData[]> {
        try {
            const response = await axios.get(`${import.meta.env.VITE_UNIT}`)
            return response.data
        } catch (error) {
            console.error("Gagal memuat unit data:", error)
            throw error
        }
    },
    
    async fetchMeetingRooms(): Promise<MeetingRoomData[]> {
        try {
            const response = await axios.get(`${import.meta.env.VITE_MEETING_ROOM}`)
            return response.data
        } catch (error) {
            console.error("Gagal memuat data ruang meeting:", error)
            throw error
        }
    },
    
    async fetchConsumptionType(): Promise<ConsumptionTypeData[]> {
        try {
            const response = await axios.get(`${import.meta.env.VITE_JENIS_KONSUMSI}`)
            return response.data.slice(0, 3)
        } catch (error) {
            console.error("Gagal memuat data jenis konsumsi:", error)
            throw error
        }
    }
}