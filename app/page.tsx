"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Info, Calendar, Clock, Users, Plus, ArrowRight, Calculator, Palette, Music, Puzzle, Target, ChevronDown } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// Sample data for dashboard
const suggestedActivities = [
  {
    id: "1",
    title: "Budgeting Practice",
    description: "Practice managing money and expenses",
    duration: "1 hour",
    participants: 5,
    totalParticipants: 6,
    icon: Calculator,
    enrolledAvatars: ["/guy1.jpg", "/guy2.jpg", "/guy3.jpg", "/guy4.png", "/guy5.jpg"]
  },
  {
    id: "2", 
    title: "Color & Painting",
    description: "Creative expression through art",
    duration: "45 min",
    participants: 3,
    totalParticipants: 6,
    icon: Palette,
    enrolledAvatars: ["/guy6.png", "/guy7.png", "/guy8.png"]
  },
  {
    id: "3",
    title: "Music Genres",
    description: "Explore different types of music",
    duration: "30 min", 
    participants: 4,
    totalParticipants: 6,
    icon: Music,
    enrolledAvatars: ["/guy1.jpg", "/guy2.jpg", "/guy3.jpg", "/guy4.png"]
  },
  {
    id: "4",
    title: "Puzzle",
    description: "Problem solving and critical thinking",
    duration: "1 hour",
    participants: 2,
    totalParticipants: 6,
    icon: Puzzle,
    enrolledAvatars: ["/guy5.jpg", "/guy6.png"]
  },
  {
    id: "5",
    title: "Goal Setting",
    description: "Plan and track personal objectives",
    duration: "45 min",
    participants: 6,
    totalParticipants: 6,
    icon: Target,
    enrolledAvatars: ["/guy1.jpg", "/guy2.jpg", "/guy3.jpg", "/guy4.png", "/guy5.jpg", "/guy6.png"]
  }
]

const todaysSchedule = [
  {
    time: "9:00 AM - 10:30 AM",
    activity: "Morning Meeting",
    location: "Main Room"
  },
  {
    time: "11:00 AM - 12:30 PM", 
    activity: "Stocking Shelves at Trader Joe's",
    location: "Trader Joe's"
  },
  {
    time: "1:00 PM - 2:30 PM",
    activity: "Math Activity for Harvey",
    location: "Classroom 101"
  },
  {
    time: "3:00 PM - 4:30 PM",
    activity: "1:1 Counseling with Dwayne", 
    location: "Office"
  }
]

const todaysParticipants = [
  {
    id: "1",
    name: "Adela Parkson",
    avatar: "/girl1.jpg",
    joinedDate: "Joined March, 16th 2024"
  },
  {
    id: "2", 
    name: "Christian Mad",
    avatar: "/guy1.jpg",
    joinedDate: "Joined March, 16th 2024"
  },
  {
    id: "3",
    name: "Luke Carter",
    avatar: "/guy2.jpg", 
    joinedDate: "Joined March, 16th 2024"
  },
  {
    id: "4",
    name: "Hans Beckham",
    avatar: "/guy3.jpg",
    joinedDate: "Joined March, 16th 2024"
  },
  {
    id: "5",
    name: "Connor Douglas",
    avatar: "/guy4.png",
    joinedDate: "Joined March, 16th 2024"
  }
]

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("By Interest Level")
  const filterDropdownRef = useRef<HTMLDivElement>(null)
  const monthDropdownRef = useRef<HTMLDivElement>(null)
  const yearDropdownRef = useRef<HTMLDivElement>(null)
  
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const currentDay = currentDate.getDate()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false)
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setShowMonthDropdown(false)
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filterOptions = [
    "By Interest Level",
    "By Duration", 
    "By Skills"
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const years = Array.from({ length: 10 }, (_, i) => 2021 + i)

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter)
    setShowFilterDropdown(false)
  }

  // Filter and sort activities based on selected filter
  const getFilteredActivities = () => {
    const activities = [...suggestedActivities]
    
    switch (selectedFilter) {
      case "By Interest Level":
        // Sort by participant count (higher interest = more participants)
        return activities.sort((a, b) => b.participants - a.participants)
      
      case "By Duration":
        // Sort by duration (shorter activities first)
        return activities.sort((a, b) => {
          const getDurationInMinutes = (duration: string) => {
            if (duration.includes('hour')) {
              return parseInt(duration) * 60
            }
            return parseInt(duration)
          }
          return getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration)
        })
      
      case "By Skills":
        // Sort alphabetically by title (as a proxy for skill type)
        return activities.sort((a, b) => a.title.localeCompare(b.title))
      
      default:
        return activities
    }
  }

  const setMonth = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1))
    setShowMonthDropdown(false)
  }

  const setYear = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1))
    setShowYearDropdown(false)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar activePage="dashboard" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-sm text-gray-600 mb-1">
                <span>Pages / Dashboard</span>
              </div>
              <h1 className="text-3xl font-bold text-black">Main Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-full glass-card border border-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-black placeholder-gray-500 transition-smooth"
                />
              </div>
              <button className="w-10 h-10 rounded-full glass-card border border-gray-200 flex items-center justify-center hover-lift transition-smooth">
                <Info className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Top Row: Suggested Activities (Left) and Calendar (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Suggested Activities */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-black">Suggested Activities</h2>
                  <p className="text-sm text-gray-600 mt-1">Total Number of Participants: <span className="text-[#87CEEB] font-medium">6</span></p>
                </div>
                <div className="relative" ref={filterDropdownRef}>
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    {selectedFilter}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showFilterDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg z-10 min-w-[200px]">
                      <div className="py-2">
                        {filterOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleFilterSelect(option)}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                              option === selectedFilter ? 'bg-[#87CEEB] bg-opacity-10 text-[#87CEEB]' : 'text-gray-700'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {getFilteredActivities().map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="glass-card rounded-xl p-4 hover-lift transition-smooth border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-300 to-cyan-500 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Time: {activity.duration}</div>
                          <div className="text-xs text-gray-500">{activity.participants}/{activity.totalParticipants} of Participants</div>
                        </div>
                      </div>
                      <h3 className="font-medium text-black mb-2">{activity.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {activity.enrolledAvatars.slice(0, 3).map((avatar, index) => (
                            <div key={index} className="w-6 h-6 rounded-full overflow-hidden border-2 border-white">
                              <Image
                                src={avatar}
                                alt=""
                                width={24}
                                height={24}
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                          ))}
                          {activity.participants > 3 && (
                            <div className="w-6 h-6 rounded-full bg-[#87CEEB] flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                              {activity.participants - 3}+
                            </div>
                          )}
                        </div>
                        <button className="bg-[#87CEEB] text-white px-3 py-1.5 text-sm rounded-md hover:bg-[#6BB6E0] transition-colors flex items-center border-0" style={{ borderRadius: '6px' }}>
                          <span className="mr-1">View</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Calendar with Schedule Below */}
            <div className="glass-card rounded-xl p-6">
              {/* Calendar Section */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <button className="text-[#87CEEB] text-sm font-medium hover:text-[#6BB6E0] transition-colors flex items-center">
                    <span>Expand</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="relative" ref={monthDropdownRef}>
                      <button
                        onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                        className="text-black px-4 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                      >
                        {months[currentDate.getMonth()]}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {showMonthDropdown && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg z-10 min-w-[160px]">
                          <div className="py-2">
                            {months.map((month, index) => (
                              <button
                                key={month}
                                onClick={() => setMonth(index)}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                                  index === currentDate.getMonth() ? 'bg-[#87CEEB] bg-opacity-10 text-[#87CEEB]' : 'text-gray-700'
                                }`}
                              >
                                {month}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative" ref={yearDropdownRef}>
                      <button
                        onClick={() => setShowYearDropdown(!showYearDropdown)}
                        className="text-black px-4 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                      >
                        {currentDate.getFullYear()}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {showYearDropdown && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg z-10 min-w-[120px]">
                          <div className="py-2">
                            {years.map((year) => (
                              <button
                                key={year}
                                onClick={() => setYear(year)}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                                  year === currentDate.getFullYear() ? 'bg-[#87CEEB] bg-opacity-10 text-[#87CEEB]' : 'text-gray-700'
                                }`}
                              >
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-6">
                {['Su', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`text-center text-sm py-2 rounded-full cursor-pointer hover:bg-gray-100 ${
                      day === 27 ? 'bg-[#87CEEB] text-white' : ''
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Schedule Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-black">Today</h2>
                  <span className="text-sm text-gray-600">April 27, 2025</span>
                </div>
                <div className="space-y-3">
                  {todaysSchedule.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-500 mr-3" />
                      <div className="flex-1">
                        <div className="font-medium text-black">{item.activity}</div>
                        <div className="text-sm text-gray-600">{item.time}</div>
                        <div className="text-xs text-gray-500">{item.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Today's Participants */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Today's Participants</h2>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-[#87CEEB] flex items-center justify-center hover:bg-[#6BB6E0] transition-colors">
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
              {todaysParticipants.map((participant) => (
                <div key={participant.id} className="flex-shrink-0 w-48 glass-card rounded-xl p-4 hover-lift transition-smooth">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                      <Image
                        src={participant.avatar}
                        alt={participant.name}
                        width={64}
                        height={64}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    <h3 className="font-medium text-black mb-1">{participant.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{participant.joinedDate}</p>
                    <Link href={`/participants/${participant.id}`}>
                      <button className="w-full bg-[#87CEEB] text-white px-4 py-2 rounded-md hover:bg-[#6BB6E0] transition-colors" style={{ borderRadius: '6px' }}>
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}