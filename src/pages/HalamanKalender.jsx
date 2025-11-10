import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSchedule } from '../context/ScheduleContext';

function HalamanKalender() {
  const { schedules } = useSchedule();

  // Ubah data context menjadi format yang dimengerti FullCalendar
  const calendarEvents = schedules.map((s) => ({
    id: s.id,
    title: s.judul,
    start: s.mulai,
    end: s.selesai,
  }));

  return (
    <div>
      <h1 className="halaman-judul">Jadwal Penggunaan Ruang Meeting</h1>
      <div className="card">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={calendarEvents}
          locale="id" // Mengatur bahasa ke Indonesia
          editable={false} // Nonaktifkan drag-and-drop karena kita kelola di /kelola
          selectable={false}
          height="auto" // Biarkan kalender menyesuaikan tinggi
        />
      </div>
    </div>
  );
}

export default HalamanKalender;