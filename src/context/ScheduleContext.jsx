import React, { createContext, useContext, useState } from 'react';

// Buat Context
const ScheduleContext = createContext();

// Helper untuk data dummy dinamis
const generateDummyData = () => {
  const now = new Date();
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;

  return [
    // 1. Jadwal masa lalu
    {
      id: '1',
      judul: 'Technical Meeting',
      mulai: new Date(now.getTime() - oneDay - oneHour),
      selesai: new Date(now.getTime() - oneDay),
    },
    // 2. Jadwal sedang berlangsung
    {
      id: '2',
      judul: 'Sales Presentation',
      mulai: new Date(now.getTime() - oneHour),
      selesai: new Date(now.getTime() + oneHour),
    },
    // 3. Jadwal masa depan
    {
      id: '3',
      judul: 'Human Resource Interview',
      mulai: new Date(now.getTime() + oneDay),
      selesai: new Date(now.getTime() + oneDay + oneHour),
    },
  ];
};

// Buat Provider
export const ScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState(generateDummyData());

  const addSchedule = (data) => {
    const newSchedule = {
      ...data,
      id: crypto.randomUUID(), // Gunakan crypto.randomUUID() untuk id unik
    };
    setSchedules([...schedules, newSchedule]);
  };

  const updateSchedule = (id, updatedData) => {
    setSchedules(
      schedules.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    );
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  return (
    <ScheduleContext.Provider
      value={{ schedules, addSchedule, updateSchedule, deleteSchedule }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

// Buat custom hook untuk menggunakan context
export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule harus digunakan di dalam ScheduleProvider');
  }
  return context;
};