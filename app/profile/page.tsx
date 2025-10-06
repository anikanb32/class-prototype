"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { useRouter } from "next/navigation"
import { Pencil, Heart, Plus, X, Check } from "lucide-react"

export default function ViewProfilePage() {
  const router = useRouter()
  const [participantName, setParticipantName] = useState("Connor")
  
  // State for editing
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState("#87CEEB")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [activities, setActivities] = useState([
    "Create my own Playlist",
    "Play a memory game in the computer lab", 
    "Recall a favorite song and discuss why you like it"
  ])
  const [goals, setGoals] = useState([
    "I would like to read 5 books by the end of this year",
    "I want to learn how to play the guitar",
    "I want to learn how to sell crafts that I make"
  ])
  const [hobbies, setHobbies] = useState([
    "Reading Books",
    "Cooking", 
    "Listening to Music",
    "Making Crafts",
    "Shopping"
  ])
  const [newItem, setNewItem] = useState("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  // Load participant name from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("currentSurveyParticipant")
    if (storedName) {
      setParticipantName(storedName)
    }
  }, [])

  // Edit functions
  const startEditing = (section: string, index?: number, currentText?: string) => {
    setEditingSection(section)
    setEditingIndex(index ?? null)
    setEditingText(currentText || "")
    setNewItem("")
    setShowEditPopup(true)
  }

  const cancelEditing = () => {
    setEditingSection(null)
    setEditingIndex(null)
    setEditingText("")
    setNewItem("")
    setShowEditPopup(false)
  }

  const saveEdit = () => {
    if (editingSection === "activities") {
      if (editingIndex !== null) {
        const newActivities = [...activities]
        newActivities[editingIndex] = editingText
        setActivities(newActivities)
      } else {
        setActivities([...activities, editingText])
      }
    } else if (editingSection === "goals") {
      if (editingIndex !== null) {
        const newGoals = [...goals]
        newGoals[editingIndex] = editingText
        setGoals(newGoals)
      } else {
        setGoals([...goals, editingText])
      }
    } else if (editingSection === "hobbies") {
      if (editingIndex !== null) {
        const newHobbies = [...hobbies]
        newHobbies[editingIndex] = editingText
        setHobbies(newHobbies)
      } else {
        setHobbies([...hobbies, editingText])
      }
    }
    cancelEditing()
  }

  const deleteItem = (section: string, index: number) => {
    if (section === "activities") {
      setActivities(activities.filter((_, i) => i !== index))
    } else if (section === "goals") {
      setGoals(goals.filter((_, i) => i !== index))
    } else if (section === "hobbies") {
      setHobbies(hobbies.filter((_, i) => i !== index))
    }
  }

  // Sample data for the profile
  const profileData = {
    name: participantName,
    avatar: "/guy7.png",
    gallery: [
      { id: 1, image: "/ppuzzle.jpg", title: "Puzzle Project" },
      { id: 2, image: "/scrapbook.jpeg", title: "Scrapbook" },
      { id: 3, image: "/birthdaycard.webp", title: "Birthday Card" },
      { id: 4, image: "/braindrawing.jpeg", title: "Brain Drawing" }
    ]
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar activePage="checkin" />

        {/* Main content */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor }}>
          <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-xl text-gray-600 mb-1">
                <span>Pages / My Profile</span>
              </div>
              <h1 className="text-5xl font-bold text-black">Welcome, {profileData.name}!</h1>
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

          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-32 h-32 rounded-full bg-white overflow-hidden shadow-lg mr-8">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    width={128}
                    height={128}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="text-left">
                  <h2 className="text-4xl font-bold text-black">{profileData.name}</h2>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="bg-white hover:bg-gray-50 text-[#87CEEB] border-2 border-[#87CEEB] px-6 py-3 rounded-[10px] font-medium text-xl transition-colors"
                >
                  Customize Color
                </button>
                {showColorPicker && (
                  <div className="absolute top-full right-0 mt-2 p-6 bg-white border border-gray-300 rounded-[10px] shadow-lg z-10">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800 text-center">Choose Background Color</h3>
                      
                      {/* Color Wheel Grid */}
                      <div className="grid grid-cols-6 gap-2">
                        {[
                          // Whites and light colors
                          "#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd",
                          // Blues
                          "#87CEEB", "#6BB6E0", "#4A90E2", "#357ABD", "#2c5aa0", "#1e3a8a",
                          // Greens
                          "#98FB98", "#90EE90", "#7CFC00", "#32CD32", "#228B22", "#006400",
                          // Yellows/Oranges
                          "#FFE4E1", "#FFB6C1", "#FFA07A", "#FF7F50", "#FF6347", "#FF4500",
                          // Purples/Pinks
                          "#F0E68C", "#DDA0DD", "#D8BFD8", "#DA70D6", "#BA55D3", "#9932CC",
                          // Teals/Cyans
                          "#AFEEEE", "#40E0D0", "#00CED1", "#20B2AA", "#008B8B", "#006666"
                        ].map((color) => (
                          <button
                            key={color}
                            onClick={() => {
                              setBackgroundColor(color)
                              setShowColorPicker(false)
                            }}
                            className={`w-8 h-8 rounded-full hover:scale-110 transition-all duration-200 shadow-sm ${
                              color === "#ffffff" || color === "#f8f9fa" || color === "#e9ecef" || color === "#dee2e6" || color === "#ced4da" || color === "#adb5bd"
                                ? "border-2 border-gray-300 hover:border-gray-500"
                                : "border-0"
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      
                      {/* Custom Color Input */}
                      <div className="pt-2 border-t border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Color:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="w-12 h-10 rounded-[5px] border-0 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            placeholder="#87CEEB"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* My Activity Choices for Today */}
          <div className="glass-card rounded-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-black">My Activity Choices for Today</h2>
              <button 
                onClick={() => startEditing("activities")}
                className="bg-[#87CEEB] hover:bg-[#6BB6E0] text-white px-6 py-3 rounded-[10px] font-medium text-xl transition-colors"
              >
                Edit Activities
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((activity, index) => (
                <div key={index} className="bg-white border-2 border-gray-300 p-6 rounded-[10px] shadow-sm hover:shadow-md transition-shadow relative group">
                  <p className="text-xl text-gray-800 font-medium text-center">{activity}</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => deleteItem("activities", index)}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-[5px] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Goals */}
          <div className="glass-card rounded-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-black">My Goals</h2>
              <button 
                onClick={() => startEditing("goals")}
                className="bg-[#87CEEB] hover:bg-[#6BB6E0] text-white px-6 py-3 rounded-[10px] font-medium text-xl transition-colors"
              >
                Add Goals
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal, index) => (
                <div key={index} className="bg-white border-2 border-gray-300 p-6 rounded-[10px] shadow-sm hover:shadow-md transition-shadow relative group">
                  <p className="text-xl text-gray-800 font-medium text-center">{goal}</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => deleteItem("goals", index)}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-[5px] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Hobbies */}
          <div className="glass-card rounded-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-black">My Hobbies</h2>
              <button 
                onClick={() => startEditing("hobbies")}
                className="bg-[#87CEEB] hover:bg-[#6BB6E0] text-white px-6 py-3 rounded-[10px] font-medium text-xl transition-colors"
              >
                Add Hobbies
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {hobbies.map((hobby, index) => (
                <div key={index} className="bg-white border-2 border-gray-300 p-6 rounded-[10px] shadow-sm hover:shadow-md transition-shadow text-center relative group">
                  <p className="text-xl text-gray-800 font-medium">{hobby}</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => deleteItem("hobbies", index)}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-[5px] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Gallery */}
          <div className="glass-card rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-black">My Gallery</h2>
              <button className="text-[#87CEEB] hover:text-[#6BB6E0] text-xl font-medium transition-colors">
                See all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profileData.gallery.map((item) => (
                <div key={item.id} className="relative">
                  <div className="aspect-square bg-gray-200 rounded-[10px] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  {editingIndex !== null ? 'Edit Item' : 'Add New Item'}
                </h2>
                <p className="text-xl text-gray-600">
                  {editingSection === 'activities' && 'Edit your activity choice'}
                  {editingSection === 'goals' && 'Edit your goal'}
                  {editingSection === 'hobbies' && 'Edit your hobby'}
                </p>
              </div>
              <button
                onClick={cancelEditing}
                className="text-gray-400 hover:text-gray-600 transition-colors rounded-[10px] p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                placeholder={
                  editingSection === 'activities' ? 'Enter activity...' :
                  editingSection === 'goals' ? 'Enter goal...' :
                  'Enter hobby...'
                }
                className="w-full px-6 py-4 border border-gray-300 rounded-[10px] text-xl focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent transition-smooth"
                autoFocus
              />
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={cancelEditing}
                  className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-[10px] hover:bg-gray-50 transition-colors text-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="flex-1 px-6 py-4 bg-[#87CEEB] hover:bg-[#6BB6E0] text-white rounded-[10px] transition-colors text-xl font-medium"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
