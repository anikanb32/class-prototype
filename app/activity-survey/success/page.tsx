"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { useRouter } from "next/navigation"

export default function ActivitySurveySuccessPage() {
  const router = useRouter()
  const [participantName, setParticipantName] = useState("")

  // Load participant name from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("currentSurveyParticipant")
    if (storedName) {
      setParticipantName(storedName)
    } else {
      // Fallback if no name is stored
      setParticipantName("Participant")
    }
  }, [])

  const handleViewProfile = () => {
    // Navigate to user profile page
    router.push("/profile")
  }

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
                <span>Pages / Activity Survey / Success</span>
              </div>
              <h1 className="text-3xl font-bold text-black">Welcome, {participantName}!</h1>
              <p className="text-lg text-gray-600 mt-2">Thank you for completing the activity survey!</p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/classlogo.png"
                alt="CLASS Community Living And Support Services"
                width={200}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          {/* Success Message Container */}
          <div className="glass-card rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-[#87CEEB] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-black mb-4">Thanks for your input!</h2>
            
            <p className="text-lg text-gray-600 mb-8">
              The staff will take your selections into consideration for this week's activities.
            </p>

            <button
              onClick={handleViewProfile}
              className="bg-[#87CEEB] hover:bg-[#6BB6E0] text-white px-8 py-3 rounded-[10px] font-medium transition-smooth hover-lift"
            >
              View My Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
