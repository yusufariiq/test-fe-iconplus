import { ChevronDown } from "lucide-react"
import toast from "react-hot-toast"
import type { BookingFormProps } from "../../types/booking"
import { useBookingData } from "../../hooks/useBookingData"
import Loading from "./loading"
import { useBookingForm } from "../../hooks/useBookingForm"
import { TIME_SLOTS } from "../../constants/timeSlots"

export default function BookingForm({ onCancel, onSave }: BookingFormProps) {
    const { units, meetingRooms, mappedConsumptionTypes, loading } = useBookingData();
    const {
        formData,
        errors,
        availableRooms,
        selectedRoom,
        currentDate,
        handleInputChange,
        validateForm
    } = useBookingForm(meetingRooms, mappedConsumptionTypes)

    const handleSubmit = () => {
        if (validateForm()) {
          onSave(formData)
          toast.success('Ruang meeting berhasil di book')
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
        <>
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
                                    <option key={unit.id} value={unit.id}>{unit.officeName}</option>
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
                                    <option key={room.id} value={room.id}>{room.roomName}</option>
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
                                min={currentDate}
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
                                {TIME_SLOTS.map(time => (
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
                                {TIME_SLOTS.map(time => (
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
                        {mappedConsumptionTypes.map(type => (
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
        </>

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
