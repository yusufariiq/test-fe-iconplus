import { useEffect, useState } from "react";
import type { BookingFormData, MappedConsumptionType, MeetingRoomData } from "../types/booking";

const initialFormData: BookingFormData ={
    unitId: '',
    meetingRoomId: '',
    meetingDate: '',
    startTime: '',
    endTime: '',
    participantCount: '',
    consumptionTypes: [] as string[],
    totalAmount: 0
}

export const useBookingForm = (
    meetingRooms: MeetingRoomData[],
    mappedConsumptionTypes: MappedConsumptionType[]
) => {
    const [formData, setFormData] = useState<BookingFormData>(initialFormData)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [availableRooms, setAvailableRooms] = useState<MeetingRoomData[]>([])
    const [selectedRoom, setSelectedRoom] = useState<MeetingRoomData | null>(null)

    // Filter ruangan berdasarkan pilihan unit
    useEffect(() => {
        if (formData.unitId){
            const filtered = meetingRooms.filter(room => room.officeId === formData.unitId)
            setAvailableRooms(filtered)

            if (formData.meetingRoomId && !filtered.find(room => room.id === formData.meetingRoomId)){
                setFormData(prev => ({ ...prev, meetingRoomId: '', participantCount: ''}))
                setSelectedRoom(null)
            }
        } else {
            setAvailableRooms([])
            setFormData(prev => ({ ...prev, meetingRoomId: '', participantCount: '' }))
            setSelectedRoom(null)
        }
    }, [formData.unitId, meetingRooms])

    // Update ruangan yang dipilih jika ada perubahan pemilihan ruangan
    useEffect(() => {
        if (formData.meetingRoomId){
          const room = meetingRooms.find(room => room.id === formData.meetingRoomId)
          setSelectedRoom(room || null)
        } else {
          setSelectedRoom(null)
        }
    }, [formData.meetingRoomId, meetingRooms])

    // Kalkualsi tipe konsumsi dan total nominal
    useEffect(() => {
        if (formData.startTime && formData.endTime && formData.participantCount && mappedConsumptionTypes.length > 0) {
            const applicableConsumption: string[] = []
            let totalCost = 0
            
            mappedConsumptionTypes.forEach(type => {
                if (type.condition && type.condition(formData.startTime, formData.endTime)) {
                    applicableConsumption.push(type.id)
                    totalCost += (type.maxPrice || 0) * parseInt(formData.participantCount || '0')
                }
            })

            setFormData(prev => ({
                ...prev,
                consumptionTypes: applicableConsumption,
                totalAmount: totalCost
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                consumptionTypes: [],
                totalAmount: 0
            }))
        }
    }, [formData.startTime, formData.endTime, formData.participantCount, mappedConsumptionTypes])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const currentDate = new Date().toISOString().split('T')[0]

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        // Required fields
        if (!formData.unitId) newErrors.unitId = 'Unit harus dipilih'
        if (!formData.meetingRoomId) newErrors.meetingRoomId = 'Ruang meeting harus dipilih'
        if (!formData.meetingDate) newErrors.meetingDate = 'Tanggal rapat harus diisi'
        if (!formData.startTime) newErrors.startTime = 'Waktu mulai harus dipilih'
        if (!formData.endTime) newErrors.endTime = 'Waktu selesai harus dipilih'
        if (!formData.participantCount) newErrors.participantCount = 'Jumlah peserta harus diisi'

        // Validasi tanggal
        if (formData.meetingDate && formData.meetingDate < currentDate) {
            newErrors.meetingDate = 'Tanggal rapat tidak boleh kurang dari hari ini'
        }

        // Validasi waktu
        if (formData.startTime && formData.endTime) {
            const startHour = parseInt(formData.startTime.split(':')[0])
            const startMinute = parseInt(formData.startTime.split(':')[1])
            const endHour = parseInt(formData.endTime.split(':')[0])
            const endMinute = parseInt(formData.endTime.split(':')[1])
      
            const startTimeInMinutes = startHour * 60 + startMinute
            const endTimeInMinutes = endHour * 60 + endMinute
      
            if (startTimeInMinutes >= endTimeInMinutes) {
              newErrors.endTime = 'Waktu selesai harus lebih besar dari waktu mulai'
            }
        }

        // Validasi kuota partisipan
        if (formData.participantCount && selectedRoom) {
            const count = parseInt(formData.participantCount)
            if (count <= 0) {
              newErrors.participantCount = 'Jumlah peserta harus lebih dari 0'
            } else if (count > selectedRoom.capacity) {
              newErrors.participantCount = `Jumlah peserta tidak boleh melebihi kapasitas ruangan (${selectedRoom.capacity})`
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return {
        formData,
        errors,
        availableRooms,
        selectedRoom,
        currentDate,
        handleInputChange,
        validateForm
    };
}