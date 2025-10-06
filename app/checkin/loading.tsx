import { Sidebar } from "@/components/sidebar"

export default function Loading() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar activePage="checkin" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-sm text-gray-600 mb-1">
                <span>Pages / Check-In</span>
              </div>
              <h1 className="text-3xl font-bold text-black">Loading...</h1>
            </div>
          </div>

          {/* Loading grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 flex flex-col items-center animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
