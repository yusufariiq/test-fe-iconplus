export default function Loading() {
  return (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
        <span className="ml-2 text-gray-600">Memuat data...</span>
    </div>
  )
}