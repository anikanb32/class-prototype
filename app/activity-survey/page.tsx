"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface Activity {
  id: string
  name: string
  selected: boolean
}

interface ActivityCategory {
  id: string
  name: string
  activities: Activity[]
  isExpanded: boolean
}

export default function ActivitySurveyPage() {
  const router = useRouter()

  // Get participant name from localStorage
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

  const [activityCategories, setActivityCategories] = useState<ActivityCategory[]>([
    {
      id: "art",
      name: "Art",
      isExpanded: false,
      activities: [
        { id: "art1", name: "Drawing a self-portrait", selected: false },
        { id: "art2", name: "Creating a collage of your interests", selected: false },
        { id: "art3", name: "Creating a mood board for 2025", selected: false },
      ],
    },
    {
      id: "music",
      name: "Music",
      isExpanded: false,
      activities: [
        { id: "music1", name: "Create your own playlist", selected: false },
        { id: "music2", name: "Learn a new instrument", selected: false },
      ],
    },
    {
      id: "math",
      name: "Math",
      isExpanded: false,
      activities: [
        { id: "math1", name: "Go through finances", selected: false },
        { id: "math2", name: "Play math games on iPad", selected: false },
      ],
    },
    {
      id: "memory",
      name: "Memory",
      isExpanded: false,
      activities: [
        { id: "memory1", name: "Play a memory game with others", selected: false },
        { id: "memory2", name: "Recall a favorite song and discuss why you like it", selected: false },
      ],
    },
  ])

  const [suggestedActivity, setSuggestedActivity] = useState("")

  const toggleCategory = (categoryId: string) => {
    setActivityCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? { ...category, isExpanded: !category.isExpanded } : category
      )
    )
  }

  const toggleActivity = (categoryId: string, activityId: string) => {
    setActivityCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              activities: category.activities.map((activity) =>
                activity.id === activityId ? { ...activity, selected: !activity.selected } : activity
              ),
            }
          : category
      )
    )
  }

  const addSuggestedActivity = () => {
    if (suggestedActivity.trim()) {
      // Here you would typically add the suggested activity to a list or send it to a server
      console.log("Suggested activity:", suggestedActivity)
      setSuggestedActivity("")
      // You could show a toast notification here
    }
  }

  const handleSubmit = () => {
    // Collect all selected activities
    const selectedActivities = activityCategories
      .flatMap((category) =>
        category.activities
          .filter((activity) => activity.selected)
          .map((activity) => ({ category: category.name, activity: activity.name }))
      )

    console.log("Selected activities:", selectedActivities)
    
    // Save the data to localStorage (in a real app, this would go to a server)
    localStorage.setItem("activitySurveyData", JSON.stringify({
      participantName,
      selectedActivities,
      suggestedActivity,
      timestamp: new Date().toISOString()
    }))
    
    // Navigate to success page
    router.push('/activity-survey/success')
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
                <span>Pages / Activity Survey</span>
              </div>
              <h1 className="text-5xl font-bold text-black">Welcome, {participantName}!</h1>
              <p className="text-2xl text-gray-600 mt-2">Please select the activities you are interested in!</p>
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

          {/* Main Survey Container */}
          <div className="glass-card rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-black mb-4">
                Activity Interest Survey
              </h2>
              
              <p className="text-xl text-gray-600">
                Click on the categories below to expand and see the choices for activities.
              </p>
            </div>

            {/* Activity Categories */}
            <div className="space-y-4 mb-8">
              {activityCategories.map((category) => (
                <div key={category.id} className="glass-card rounded-xl overflow-hidden hover-lift transition-smooth">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition-smooth flex items-center justify-between text-left rounded-[10px]"
                  >
                    <span className="text-2xl font-medium text-black">{category.name}</span>
                    {category.isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {/* Category Activities */}
                  {category.isExpanded && (
                    <div className="px-6 pb-4 bg-gray-50">
                      <div className="space-y-3">
                        {category.activities.map((activity) => (
                          <label
                            key={activity.id}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition-smooth"
                          >
                            <input
                              type="checkbox"
                              checked={activity.selected}
                              onChange={() => toggleActivity(category.id, activity.id)}
                              className="w-6 h-6 text-[#87CEEB] bg-gray-100 border-gray-300 rounded focus:ring-[#87CEEB] focus:ring-2"
                            />
                            <span className="text-xl text-gray-700 font-medium">{activity.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggest Activity */}
            <div className="mb-8">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-3xl font-bold text-black mb-4">Suggest an Activity</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter your activity suggestion..."
                    value={suggestedActivity}
                    onChange={(e) => setSuggestedActivity(e.target.value)}
                    className="flex-1 px-6 py-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent transition-smooth text-xl"
                    onKeyPress={(e) => e.key === "Enter" && addSuggestedActivity()}
                  />
                  <button
                    onClick={addSuggestedActivity}
                    className="px-8 py-4 bg-[#87CEEB] text-white rounded-[10px] hover:bg-[#6BB6E0] transition-smooth font-medium text-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="text-center">
              <div className="glass-card rounded-xl p-6">
                <p className="text-xl text-gray-600 mb-6">
                  When you are done with your selection, click submit!
                </p>
                <button
                  onClick={handleSubmit}
                  className="bg-[#87CEEB] hover:bg-[#6BB6E0] text-white px-12 py-4 rounded-[10px] font-medium transition-smooth hover-lift text-2xl"
                >
                  Submit Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
