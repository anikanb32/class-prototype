import Image from "next/image"
import Link from "next/link"
import { Home, BarChart2, Users, Lock, CheckCircle } from "lucide-react"

interface SidebarProps {
  activePage: string
}

export function Sidebar({ activePage }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* User profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-2 rounded-full overflow-hidden">
            <Image
              src="/joanday1.png"
              alt="Joan Day"
              className="w-full h-full object-cover"
              width={64}
              height={64}
            />
          </div>
          <h3 className="font-semibold text-black">Joan Day</h3>
          <p className="text-sm text-gray-600">Life Skills Specialist</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className={`flex items-center px-6 py-3 transition-smooth ${
                activePage === "dashboard"
                  ? "text-black bg-[#E0F1FA]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <Home className="w-5 h-5 mr-3" />
              <span className={activePage === "dashboard" ? "font-medium" : ""}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/activities"
              className={`flex items-center px-6 py-3 transition-smooth ${
                activePage === "activities"
                  ? "text-black bg-[#E0F1FA]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span className={activePage === "activities" ? "font-medium" : ""}>Activities</span>
            </Link>
          </li>
          <li>
            <Link
              href="/participants"
              className={`flex items-center px-6 py-3 transition-smooth ${
                activePage === "participants"
                  ? "text-black bg-[#E0F1FA]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              <span className={activePage === "participants" ? "font-medium" : ""}>Participants</span>
            </Link>
          </li>
          <li>
            <Link
              href="/checkin"
              className={`flex items-center px-6 py-3 transition-smooth ${
                activePage === "checkin"
                  ? "text-black bg-[#E0F1FA]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <CheckCircle className="w-5 h-5 mr-3" />
              <span className={activePage === "checkin" ? "font-medium" : ""}>Check-In</span>
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className={`flex items-center px-6 py-3 transition-smooth ${
                activePage === "account"
                  ? "text-black bg-[#E0F1FA]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <Lock className="w-5 h-5 mr-3" />
              <span className={activePage === "account" ? "font-medium" : ""}>Account</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logo */}
      <div className="p-6">
        <div className="flex justify-center">
          <Image src="/classlogo.png" alt="CLASS - Community Living And Support Services" width={140} height={80} />
        </div>
      </div>
    </div>
  )
}
