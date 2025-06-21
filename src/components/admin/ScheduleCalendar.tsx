'use client'
import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { listJobs } from '@/lib/jobs'

export default function ScheduleCalendar() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    const jobs = await listJobs()
    const mapped = jobs
      .filter((j: any) => j.scheduled_for)
      .map((j: any) => ({
        id: j.id,
        title: j.title || 'Job',
        start: j.scheduled_for,
        end: j.scheduled_for,
      }))
    setEvents(mapped)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Schedule</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
        events={events}
      />
    </div>
  )
}