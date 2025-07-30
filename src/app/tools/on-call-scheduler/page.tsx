'use client'

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Download, Plus, Trash2, Calendar, Users, Clock } from 'lucide-react'

interface TeamMember {
  name: string
  email: string
}

interface ScheduleItem {
  member: TeamMember
  startDate: Date
  endDate: Date
  period: number
}


const OnCallScheduleCreator = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ name: '', email: '' }])
  const [frequency, setFrequency] = useState<string>('weekly')
  const [customFrequency, setCustomFrequency] = useState<number>(7)
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [currentStep, setCurrentStep] = useState<number>(1)

  useEffect(() => {
    document.title = 'On-Call Schedule Creator | Free Team Rotation Tool'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create perfect on-call schedules for your team. Generate rotation schedules with custom frequencies, export to Excel/Outlook. Free online tool for DevOps and engineering teams.')
    }
  }, [])

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '' }])
  }

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index))
    }
  }

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = teamMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member,
    )
    setTeamMembers(updated)
  }

  const generateSchedule = () => {
    const validMembers = teamMembers.filter(
      (member) => member.name.trim() && member.email.trim(),
    )
    if (validMembers.length === 0) return

    const scheduleItems: ScheduleItem[] = []
    const scheduleStartDate = new Date(startDate)
    let currentDate = new Date(scheduleStartDate)

    const rotationDays = frequency === 'daily' ? 1 
      : frequency === 'weekly' ? 7 
      : frequency === 'biweekly' ? 14
      : frequency === 'custom' ? customFrequency
      : 7

    for (let i = 0; i < 12; i++) {
      // Generate 12 periods
      const memberIndex = i % validMembers.length
      const endDate = new Date(currentDate)
      endDate.setDate(endDate.getDate() + rotationDays - 1)

      scheduleItems.push({
        member: validMembers[memberIndex],
        startDate: new Date(currentDate),
        endDate: new Date(endDate),
        period: i + 1,
      })

      currentDate.setDate(currentDate.getDate() + rotationDays)
    }

    setSchedule(scheduleItems)
    setCurrentStep(3)
  }

  const exportToCSV = () => {
    const headers = ['Period', 'Name', 'Email', 'Start Date', 'End Date']
    const rows = schedule.map((item) => [
      item.period,
      item.member.name,
      item.member.email,
      item.startDate.toLocaleDateString(),
      item.endDate.toLocaleDateString(),
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((field) => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'oncall-schedule.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToICS = () => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//On-Call Schedule//EN',
      'CALSCALE:GREGORIAN',
    ]

    schedule.forEach((item, index) => {
      icsContent.push(
        'BEGIN:VEVENT',
        `UID:oncall-${index}-${Date.now()}@oncallschedule.com`,
        `DTSTART:${formatDate(item.startDate)}`,
        `DTEND:${formatDate(new Date(item.endDate.getTime() + 24 * 60 * 60 * 1000))}`,
        `SUMMARY:On-Call: ${item.member.name}`,
        `DESCRIPTION:On-call duty for ${item.member.name} (${item.member.email})`,
        `ATTENDEE:MAILTO:${item.member.email}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
      )
    })

    icsContent.push('END:VCALENDAR')

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'oncall-schedule.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-pink-50">
      {/* Header */}
      <div className="border-b-4 border-pink-300 bg-yellow-200">
        <div className="mx-auto max-w-4xl px-8 py-6">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-wide text-pink-800">
              THE ON-CALL SCHEDULE CREATOR
            </h1>
            <p className="text-lg text-pink-600">
              A perfectly symmetrical approach to duty rotation
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-4 text-lg font-bold ${
                    currentStep >= step
                      ? 'border-pink-600 bg-pink-400 text-white'
                      : 'border-pink-300 bg-white text-pink-400'
                  }`}
                >
                  {step === 1 && <Users size={20} />}
                  {step === 2 && <Clock size={20} />}
                  {step === 3 && <Calendar size={20} />}
                </div>
                {step < 3 && (
                  <div
                    className={`mx-2 h-1 w-16 ${
                      currentStep > step ? 'bg-pink-400' : 'bg-pink-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Team Members */}
        {currentStep === 1 && (
          <div className="rounded-lg border-4 border-yellow-300 bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold text-pink-800">
                ASSEMBLE YOUR CREW
              </h2>
              <p className="text-pink-600">
                Enter the distinguished members of your on-call roster
              </p>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={member.name}
                        onChange={(e) =>
                          updateTeamMember(index, 'name', e.target.value)
                        }
                        className="w-full rounded-lg border-2 border-pink-200 px-4 py-3 font-medium focus:border-pink-400 focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="email"
                        placeholder="email@company.com"
                        value={member.email}
                        onChange={(e) =>
                          updateTeamMember(index, 'email', e.target.value)
                        }
                        className="w-full rounded-lg border-2 border-pink-200 px-4 py-3 font-medium focus:border-pink-400 focus:outline-none"
                      />
                    </div>
                    {teamMembers.length > 1 && (
                      <button
                        onClick={() => removeTeamMember(index)}
                        className="rounded-lg border-2 border-red-200 bg-red-100 p-3 transition-colors hover:bg-red-200"
                      >
                        <Trash2 size={20} className="text-red-600" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={addTeamMember}
                className="flex items-center space-x-2 rounded-lg border-2 border-green-400 bg-green-200 px-6 py-3 font-bold text-green-800 transition-colors hover:bg-green-300"
              >
                <Plus size={20} />
                <span>ADD TEAM MEMBER</span>
              </button>

              <button
                onClick={() => setCurrentStep(2)}
                disabled={
                  !teamMembers.some((m) => m.name.trim() && m.email.trim())
                }
                className="rounded-lg border-2 border-pink-600 bg-pink-400 px-8 py-3 font-bold text-white transition-colors hover:bg-pink-500 disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500"
              >
                PROCEED TO SCHEDULING
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Frequency Selection */}
        {currentStep === 2 && (
          <div className="rounded-lg border-4 border-blue-300 bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold text-blue-800">
                CHOOSE YOUR RHYTHM
              </h2>
              <p className="text-blue-600">
                Select the rotation frequency for your on-call schedule
              </p>
            </div>

            <div className="mb-8 space-y-6">
              <div className="mb-6">
                <label className="mb-2 block text-lg font-bold text-blue-800">
                  START DATE
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border-2 border-blue-200 px-4 py-3 font-medium focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <button
                  onClick={() => setFrequency('daily')}
                  className={`rounded-lg border-4 p-6 transition-all ${
                    frequency === 'daily'
                      ? 'bg-green-200 border-green-400'
                      : 'bg-green-50 border-green-200 hover:bg-green-100'
                  }`}
                >
                  <div className="text-2xl font-bold text-green-800 mb-2">
                    DAILY
                  </div>
                  <div className="text-green-600">
                    Every 24 hours
                  </div>
                </button>
                
                <button
                  onClick={() => setFrequency('weekly')}
                  className={`rounded-lg border-4 p-6 transition-all ${
                    frequency === 'weekly'
                      ? 'bg-yellow-200 border-yellow-400'
                      : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                  }`}
                >
                  <div className="text-2xl font-bold text-yellow-800 mb-2">
                    WEEKLY
                  </div>
                  <div className="text-yellow-600">
                    Every 7 days
                  </div>
                </button>
                
                <button
                  onClick={() => setFrequency('biweekly')}
                  className={`rounded-lg border-4 p-6 transition-all ${
                    frequency === 'biweekly'
                      ? 'bg-purple-200 border-purple-400'
                      : 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  <div className="text-2xl font-bold text-purple-800 mb-2">
                    BI-WEEKLY
                  </div>
                  <div className="text-purple-600">
                    Every 14 days
                  </div>
                </button>
                
                <button
                  onClick={() => setFrequency('custom')}
                  className={`rounded-lg border-4 p-6 transition-all ${
                    frequency === 'custom'
                      ? 'bg-indigo-200 border-indigo-400'
                      : 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  <div className="text-2xl font-bold text-indigo-800 mb-2">
                    CUSTOM
                  </div>
                  <div className="text-indigo-600">
                    Custom days
                  </div>
                </button>
              </div>
              
              {frequency === 'custom' && (
                <div className="mt-6">
                  <label className="mb-2 block text-lg font-bold text-blue-800">
                    CUSTOM FREQUENCY (DAYS)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={customFrequency}
                    onChange={(e) => setCustomFrequency(parseInt(e.target.value) || 1)}
                    className="w-full rounded-lg border-2 border-blue-200 px-4 py-3 font-medium focus:border-blue-400 focus:outline-none"
                    placeholder="Enter number of days"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="rounded-lg border-2 border-gray-400 bg-gray-200 px-6 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-300"
              >
                BACK TO TEAM
              </button>

              <button
                onClick={generateSchedule}
                className="rounded-lg border-2 border-blue-600 bg-blue-400 px-8 py-3 font-bold text-white transition-colors hover:bg-blue-500"
              >
                GENERATE SCHEDULE
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Schedule Display & Export */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="rounded-lg border-4 border-green-300 bg-white p-8 shadow-lg">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-green-800">
                  YOUR MASTERPIECE
                </h2>
                <p className="text-green-600">
                  A beautifully orchestrated on-call schedule
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-green-300 bg-green-100">
                      <th className="px-4 py-3 text-left font-bold text-green-800">
                        PERIOD
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-green-800">
                        TEAM MEMBER
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-green-800">
                        EMAIL
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-green-800">
                        START DATE
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-green-800">
                        END DATE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}
                      >
                        <td className="px-4 py-3 font-medium text-green-800">
                          {item.period}
                        </td>
                        <td className="px-4 py-3 font-medium text-green-800">
                          {item.member.name}
                        </td>
                        <td className="px-4 py-3 text-green-600">
                          {item.member.email}
                        </td>
                        <td className="px-4 py-3 text-green-600">
                          {item.startDate.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-green-600">
                          {item.endDate.toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border-4 border-orange-300 bg-white p-8 shadow-lg">
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-2xl font-bold text-orange-800">
                  EXPORT YOUR CREATION
                </h3>
                <p className="text-orange-600">
                  Download your schedule for Excel or Outlook
                </p>
              </div>

              <div className="flex justify-center space-x-6">
                <button
                  onClick={exportToCSV}
                  className="flex items-center space-x-2 rounded-lg border-2 border-orange-400 bg-orange-200 px-6 py-4 font-bold text-orange-800 transition-colors hover:bg-orange-300"
                >
                  <Download size={20} />
                  <span>EXPORT TO EXCEL</span>
                </button>

                <button
                  onClick={exportToICS}
                  className="flex items-center space-x-2 rounded-lg border-2 border-purple-400 bg-purple-200 px-6 py-4 font-bold text-purple-800 transition-colors hover:bg-purple-300"
                >
                  <Download size={20} />
                  <span>EXPORT TO OUTLOOK</span>
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setCurrentStep(1)
                    setSchedule([])
                    setTeamMembers([{ name: '', email: '' }])
                  }}
                  className="rounded-lg border-2 border-gray-400 bg-gray-200 px-6 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-300"
                >
                  CREATE NEW SCHEDULE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnCallScheduleCreator
