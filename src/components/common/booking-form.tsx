import { AlertCircle, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

interface Unit {
    id: string
    name: string
}

interface MeetingRoom {
    id: string 
    name: string
    capacity: number
    unitId: string
}

interface ConsumptionType {
    id: string
    name: string
    price: number
    startTime: string
    endTime: string
}

interface BookingFormProps {
    onCancel: () => void
    onSave: (data: any) => void
}

export default function BookingForm({ onCancel, onSave }: BookingFormProps) {
    const [units] = useState<Unit[]>([
        { id: '1', name: 'Unit Pusat' },
        { id: '2', name: 'Unit Jakarta' },
        { id: '3', name: 'Unit Bandung' },
        { id: '4', name: 'Unit Surabaya' }
    ])
    
    const [meetingRooms] = useState<MeetingRoom[]>([
        { id: '1', name: 'Ruang Meeting A', capacity: 10, unitId: '1' },
        { id: '2', name: 'Ruang Meeting B', capacity: 15, unitId: '1' },
        { id: '3', name: 'Ruang Meeting C', capacity: 20, unitId: '2' },
        { id: '4', name: 'Ruang Meeting D', capacity: 25, unitId: '2' },
        { id: '5', name: 'Ruang Meeting E', capacity: 30, unitId: '3' },
        { id: '6', name: 'Ruang Meeting F', capacity: 8, unitId: '4' }
    ])

    const consumptionTypes: ConsumptionType[] = [
        { id: 'snack_siang', name: 'Snack Siang', price: 20000, startTime: '00:00', endTime: '11:00' },
        { id: 'makan_siang', name: 'Makan Siang', price: 30000, startTime: '11:00', endTime: '14:00' },
        { id: 'snack_sore', name: 'Snack Sore', price: 20000, startTime: '14:00', endTime: '23:59' }
    ]

    const [formData, setFormData] = useState({
        unitId: '',
        meetingRoomId: '',
        meetingDate: '',
        startTime: '',
        endTime: '',
        participantCount: '',
        consumptionTypes: [] as string[],
        totalAmount: 0
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [availableRooms, setAvailableRooms] = useState<MeetingRoom[]>([])
    const [selectedRoom, setSelectedRoom] = useState<MeetingRoom | null>(null)

    // Slot pilihan jam mulai dan selesai meeting
    const timeSlots = Array.from({ length: 31 }, (_, i) => {
        const hour = Math.floor(i / 2) + 7
        const minute = i % 2 === 0 ? '00' : '30'
        return `${hour.toString().padStart(2, '0')}:${minute}`
    })

    // Tanggal hari ini 
    const today = new Date().toISOString().split('T')[0]

    // Filter ruangan berdasarkan pilihan unit
    useEffect(() => {
        if (formData.unitId){
            const filtered = meetingRooms.filter(room => room.unitId === formData.unitId)
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
        if (formData.startTime && formData.endTime && formData.participantCount){
            const startHour = parseInt(formData.startTime.split(':')[0])
            const startMinute = parseInt(formData.startTime.split(':')[1])
            const endHour = parseInt(formData.endTime.split(':')[0])
            const endMinute = parseInt(formData.endTime.split(':')[1])

            const startTimeMinutes = startHour * 60 + startMinute
            const endTimeMinutes = endHour * 60 + endMinute

            const consumption: string[] = []
            let totalCost = 0
            
            consumptionTypes.forEach(type => {
                const typeStartHour = parseInt(type.startTime.split(":")[0])
                const typeStartMinute = parseInt(type.startTime.split(":")[1])
                const typeEndHour = parseInt(type.endTime.split(":")[0])
                const typeEndMinute = parseInt(type.endTime.split(":")[1])

                const typeStartInMinutes = typeStartHour * 60 + typeStartMinute
                const typeEndInMinutes = typeEndHour * 60 + typeEndMinute

                const hasOverlap = startTimeMinutes < typeEndInMinutes && endTimeMinutes > typeStartInMinutes

                if (hasOverlap) {
                    consumption.push(type.id)
                    totalCost += type.price * parseInt(formData.participantCount)
                }
            })

            setFormData(prev => ({
                ...prev,
                consumptionTypes: consumption,
                totalAmount: totalCost
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                consumptionTypes: [],
                totalAmount: 0
            }))
        }
    }, [formData.startTime, formData.endTime, formData.participantCount])

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
        if (formData.meetingDate && formData.meetingDate < today) {
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

    const handleSubmit = () => {
        if (validateForm()) {
          onSave(formData)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    // Function untuk formatting Rupiah
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(amount)
    }

    return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
      
        {/* Meeting Room Information */}
        <div className="border-b-2 border-gray-200 mb-8 pb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Ruang Meeting</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select 
                            value={formData.unitId}
                            onChange={(e) => handleInputChange('unitId', e.target.value)}    
                            className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none ${
                                errors.unitId ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Pilih Unit</option>
                            {units.map(unit => (
                                <option key={unit.id} value={unit.id}>{unit.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.unitId && <p className="mt-1 text-sm text-red-600">{errors.unitId}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ruang Meeting <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select 
                            value={formData.meetingRoomId}
                            onChange={(e) => handleInputChange('meetingRoomId', e.target.value)}
                            disabled={!formData.unitId}    
                            className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none ${
                                errors.meetingRoomId ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Pilih Ruang Meeting</option>
                            {availableRooms.map(room => (
                                <option key={room.id} value={room.id}>{room.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.meetingRoomId && <p className="mt-1 text-sm text-red-600">{errors.meetingRoomId}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas</label>
                    <div className="w-full px-3 py-2 bg-gray-200 rounded-md text-gray-600">
                        {selectedRoom ? selectedRoom.capacity : 0}
                    </div>
               </div>
            </div>
        </div>

        {/* Meeting Information */}
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Rapat</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Rapat<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={formData.meetingDate}
                            onChange={(e) => handleInputChange('meetingDate', e.target.value)}
                            min={today}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
                                errors.meetingDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                    </div>
                    {errors.meetingDate && <p className="mt-1 text-sm text-red-600">   {errors.meetingDate}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Mulai</label>
                    <div className="relative">
                        <select 
                            value={formData.startTime}
                            onChange={(e) => handleInputChange('startTime', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none ${
                                errors.startTime ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Pilih Waktu Mulai</option>
                            {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Selesai</label>
                    <div className="relative">
                        <select
                            value={formData.endTime}
                            onChange={(e) => handleInputChange('endTime', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none ${
                                errors.endTime ? 'border-red-500' : 'border-gray-300'
                            }`}>
                            <option value="">Pilih Waktu Selesai</option>
                            {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Peserta</label>
                    <input
                        type="number"
                        value={formData.participantCount}
                        onChange={(e) => handleInputChange('participantCount', e.target.value)}
                        placeholder="Masukkan Jumlah Peserta"
                        min="1"
                        max={selectedRoom?.capacity || 999}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
                            errors.participantCount ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.participantCount && <p className="mt-1 text-sm text-red-600">{errors.participantCount}</p>}
                </div>
            </div>
        </div>

        {/* Consumption Information */}
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Jenis Konsumsi
                </label>
                <div className="space-y-2">
                    {consumptionTypes.map(type => (
                        <label key={type.id} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.consumptionTypes.includes(type.id)}
                                readOnly
                                className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-not-allwed"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                {type.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nominal Konsumsi <span className="text-sm text-gray-500">(Terisi otomatis)</span>
                    </label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                            Rp.
                        </span>
                        <input
                            type="text"
                            value={formData.totalAmount.toLocaleString('id-ID')}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Validation Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Terdapat kesalahan pada form:</h4>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button 
                type="button"
                onClick={onCancel} 
                className="px-6 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
                Batal
            </button>
            <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Simpan
            </button>
        </div>
    </div>
  )
}
