"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

// Define participant type
interface Participant {
  id: string
  name: string
  avatar: string
  isCheckedIn: boolean
}

export default function CheckInPage() {
  const router = useRouter()
  
  // State for popup
  const [showSurveyPopup, setShowSurveyPopup] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  
  // Initial participants data
  const initialParticipants: Participant[] = [
    {
      id: "1",
      name: "Luke Carter",
      avatar: "/guy9.png",
      isCheckedIn: false,
    },
    {
      id: "2",
      name: "Jack Hughes",
      avatar: "/guy2.jpg",
      isCheckedIn: false,
    },
    {
      id: "3",
      name: "Hans Beckham",
      avatar: "/guy6.png",
      isCheckedIn: false,
    },
    {
      id: "4",
      name: "Mary Jarris",
      avatar: "/girl1.png",
      isCheckedIn: false,
    },
    {
      id: "5",
      name: "Hilary Canes",
      avatar: "/girl2.jpg",
      isCheckedIn: false,
    },
    {
      id: "6",
      name: "McArthur Jin",
      avatar: "/guy5.jpg",
      isCheckedIn: false,
    },
    {
      id: "7",
      name: "Harry Zhang",
      avatar: "/guy8.png",
      isCheckedIn: false,
    },
    {
      id: "8",
      name: "Connor Douglas",
      avatar: "/guy7.png",
      isCheckedIn: false,
    },
  ]

  const [participants, setParticipants] = useState<Participant[]>(initialParticipants)

  // Load check-in data from localStorage on initial render
  useEffect(() => {
    const savedCheckIns = localStorage.getItem("participantCheckIns")

    if (savedCheckIns) {
      try {
        const checkInData = JSON.parse(savedCheckIns)

        // Update the participants with saved check-in data
        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) => ({
            ...participant,
            isCheckedIn: checkInData[participant.id] || false,
          })),
        )
      } catch (error) {
        console.error("Error loading check-in data:", error)
      }
    }
  }, [])

  // Function to toggle participant check-in status and update localStorage
  const toggleCheckIn = (id: string) => {
    setParticipants((prevParticipants) => {
      const updatedParticipants = prevParticipants.map((participant) =>
        participant.id === id ? { ...participant, isCheckedIn: !participant.isCheckedIn } : participant,
      )

      // Save check-in data to localStorage
      const checkInData = updatedParticipants.reduce(
        (acc, participant) => {
          acc[participant.id] = participant.isCheckedIn
          return acc
        },
        {} as Record<string, boolean>,
      )

      localStorage.setItem("participantCheckIns", JSON.stringify(checkInData))

      // Show survey popup when checking in (not when unchecking) - except for Luke Carter
      const participant = prevParticipants.find(p => p.id === id)
      const newParticipant = updatedParticipants.find(p => p.id === id)
      if (participant && !participant.isCheckedIn && newParticipant?.isCheckedIn && newParticipant.name !== "Luke Carter") {
        setSelectedParticipant(newParticipant)
        setShowSurveyPopup(true)
      }

      return updatedParticipants
    })
  }

  // Function to close popup
  const closePopup = () => {
    setShowSurveyPopup(false)
    setSelectedParticipant(null)
  }

  // Function to start survey for selected participant
  const startSurvey = () => {
    // Store the selected participant name for the survey
    localStorage.setItem("currentSurveyParticipant", selectedParticipant?.name || "")
    closePopup()
    router.push("/activity-survey")
  }

  // Hardcoded greeting
  const getCurrentGreeting = () => {
    return "Good Morning!"
  }

  // Navigate to activity survey
  const goToActivitySurvey = () => {
    router.push("/activity-survey")
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
              <div className="text-xl text-gray-600 mb-1">
                <span>Pages / Check-In</span>
              </div>
              <h1 className="text-5xl font-bold text-black mt-6">{getCurrentGreeting()}</h1>
              <p className="text-2xl text-gray-600 mt-2">Please click on your photo to check in.</p>
            </div>
          </div>

          {/* Participants Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className={`glass-card rounded-2xl p-6 flex flex-col items-center hover-lift transition-smooth ${
                  participant.isCheckedIn ? "ring-2 ring-green-400 bg-green-50" : ""
                }`}
              >
                {/* Participant photo */}
                <div className="w-24 h-24 rounded-full bg-white mb-4 overflow-hidden shadow-md">
                  <Image
                    src={participant.avatar || "/placeholder.svg"}
                    alt={participant.name}
                    width={96}
                    height={96}
                    className="object-cover object-center w-full h-full"
                  />
                </div>

                {/* Participant name */}
                <h3 
                  className="text-2xl font-semibold text-black text-center mb-4"
                >
                  {participant.name}
                </h3>

                {/* Check-in indicator - centered under name */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer mb-2 ${
                    participant.isCheckedIn
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                  }`}
                  onClick={() => toggleCheckIn(participant.id)}
                >
                  {participant.isCheckedIn && (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                {/* Check-in status */}
                <div className="text-center">
                  {participant.isCheckedIn ? (
                    <span className="text-lg text-green-600 font-medium">Checked In</span>
                  ) : (
                    <span className="text-lg text-gray-500">Click checkmark to check in</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 glass-card rounded-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-black">Check-In Summary</h2>
                <p className="text-xl text-gray-600">
                  {participants.filter((p) => p.isCheckedIn).length} of {participants.length} participants checked in
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#87CEEB]">
                  {Math.round((participants.filter((p) => p.isCheckedIn).length / participants.length) * 100)}%
                </div>
                <div className="text-xl text-gray-600">Attendance Rate</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Survey Popup */}
      {showSurveyPopup && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-4xl font-bold text-black mb-2">Activity Survey</h2>
                <p className="text-2xl text-gray-600">
                  Hi {selectedParticipant.name}! Would you like to take our activity survey?
                </p>
              </div>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors rounded-[10px] p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-600">
                Help us plan this week's activities by sharing your interests and preferences.
              </p>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closePopup}
                  className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-[10px] hover:bg-gray-50 transition-colors text-xl font-medium"
                >
                  Maybe Later
                </button>
                <button
                  onClick={startSurvey}
                  className="flex-1 px-6 py-4 bg-[#87CEEB] hover:bg-[#6BB6E0] text-white rounded-[10px] transition-colors text-xl font-medium"
                >
                  Take Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
