import { Calendar, ChevronDown } from "lucide-react"

interface BookingFormProps {
  onCancel: () => void
  onSave: () => void
}

export function BookingForm({ onCancel, onSave }: BookingFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
      
        {/* Meeting Room Information */}
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Ruang Meeting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <div className="relative">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none">
                            <option>Pilih Unit</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ruang Meeting</label>
                    <div className="relative">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none">
                            <option>Pilih Ruang Meeting</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas</label>
                <div className="w-full px-3 py-2 bg-gray-200 rounded-md text-gray-600">0</div>
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
                            type="text"
                            value="28 Juni 2022"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                            readOnly
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Mulai</label>
                    <div className="relative">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none">
                            <option>Pilih Waktu Mulai</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Selesai</label>
                    <div className="relative">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none">
                            <option>Pilih Waktu Selesai</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Peserta</label>
                <input
                    type="text"
                    placeholder="Masukkan Jumlah Peserta"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
            </div>
        </div>

        {/* Consumption Information */}
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Jenis Konsumsi</label>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                        <span className="ml-2 text-sm text-gray-700">Snack Siang</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                        <span className="ml-2 text-sm text-gray-700">Makan Siang</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                        <span className="ml-2 text-sm text-gray-700">Snack Sore</span>
                    </label>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nominal Konsumsi</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                        Rp.
                    </span>
                    <input
                        type="number"
                        placeholder="0"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button 
                onClick={onCancel} 
                className="px-6 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
                Batal
            </button>
            <button
                onClick={onSave}
                className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
            >
                Simpan
            </button>
        </div>
    </div>
  )
}
