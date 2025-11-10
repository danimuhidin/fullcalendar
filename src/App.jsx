import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScheduleProvider } from './context/ScheduleContext';
import TabBar from './components/TabBar';
import HalamanKalender from './pages/HalamanKalender';
import HalamanKelola from './pages/HalamanKelola';
import HalamanRingkasan from './pages/HalamanRingkasan';

function App() {
  return (
    <ScheduleProvider>
      <BrowserRouter>
        <div className="app-container">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HalamanKalender />} />
              <Route path="/kelola" element={<HalamanKelola />} />
              <Route path="/ringkasan" element={<HalamanRingkasan />} />
            </Routes>
          </main>
          
          <TabBar />
        </div>
      </BrowserRouter>
    </ScheduleProvider>
  );
}

export default App;