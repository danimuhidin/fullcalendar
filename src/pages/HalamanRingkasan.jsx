import React from 'react';
import { useSchedule } from '../context/ScheduleContext';

// Helper format tanggal (bisa di-import dari file terpisah jika diinginkan)
const formatTanggal = (date) => {
  if (!date) return '';
  const d = new Date(date);

  // Opsi untuk mendapatkan format "Senin, 10 November 2025"
  const optionsTanggal = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    locale: 'id-ID' // Pastikan lokal Indonesia
  };
  const tanggalStr = new Intl.DateTimeFormat('id-ID', optionsTanggal).format(d);

  // Dapatkan jam dan menit secara manual untuk memastikan format HH:MM
  const HH = String(d.getHours()).padStart(2, '0');
  const MM = String(d.getMinutes()).padStart(2, '0');

  return `${tanggalStr} ${HH}:${MM}`;
};

// Komponen kecil untuk menampilkan item ringkasan
const ItemRingkasan = ({ schedule }) => {
  if (!schedule) {
    return null; // Jangan render apa-apa jika tidak ada jadwal
  }
  return (
    <div className="item-ringkasan">
      <h3>{schedule.judul}</h3>
      <p>Mulai: {formatTanggal(schedule.mulai)}</p>
      <p>Selesai: {formatTanggal(schedule.selesai)}</p>
    </div>
  );
};

function HalamanRingkasan() {
  const { schedules } = useSchedule();
  const now = new Date();

  // 1. Jadwal Selesai (1 terbaru)
  const jadwalSelesai = schedules
    .filter((s) => s.selesai < now)
    .sort((a, b) => b.selesai - a.selesai); // Urutkan descending, ambil yg terbaru
  const terbaruSelesai = jadwalSelesai[0]; // Ambil HANYA 1

  // 2. Jadwal Berlangsung (1 yang paling dulu mulai)
  const jadwalBerlangsung = schedules
    .filter((s) => s.mulai <= now && s.selesai > now)
    .sort((a, b) => a.mulai - b.mulai); // Urutkan ascending, ambil yg pertama
  const sedangBerlangsung = jadwalBerlangsung[0]; // Ambil HANYA 1

  // 3. Jadwal Akan Datang (1 berikutnya)
  const jadwalAkanDatang = schedules
    .filter((s) => s.mulai > now)
    .sort((a, b) => a.mulai - b.mulai); // Urutkan ascending, ambil yg paling dekat
  const akanDatang = jadwalAkanDatang[0]; // Ambil HANYA 1

  return (
    <div>
      <h1 className="halaman-judul">Ringkasan</h1>

      <div className="ringkasan-grup">
        <h2>Jadwal Berlangsung</h2>
        {sedangBerlangsung ? (
          <ItemRingkasan schedule={sedangBerlangsung} />
        ) : (
          <p className="pesan-kosong">Tidak ada jadwal yang sedang berlangsung.</p>
        )}
      </div>

      <div className="ringkasan-grup">
        <h2>Jadwal Akan Datang (Berikutnya)</h2>
        {akanDatang ? (
          <ItemRingkasan schedule={akanDatang} />
        ) : (
          <p className="pesan-kosong">Tidak ada jadwal yang akan datang.</p>
        )}
      </div>

      <div className="ringkasan-grup">
        <h2>Jadwal Selesai (Terbaru)</h2>
        {terbaruSelesai ? (
          <ItemRingkasan schedule={terbaruSelesai} />
        ) : (
          <p className="pesan-kosong">Tidak ada jadwal yang telah selesai.</p>
        )}
      </div>
    </div>
  );
}

export default HalamanRingkasan;