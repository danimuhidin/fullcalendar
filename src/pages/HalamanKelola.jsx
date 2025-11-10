import React, { useState } from 'react';
import { useSchedule } from '../context/ScheduleContext';

// Helper untuk format tanggal ke "dd/mm/yyyy HH:mm"
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

// Helper untuk format tanggal ke input datetime-local (YYYY-MM-DDTHH:mm)
const toLocalISOString = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const tzOffset = d.getTimezoneOffset() * 60000;
  const localISOTime = new Date(d - tzOffset).toISOString().slice(0, 16);
  return localISOTime;
};

function HalamanKelola() {
  const { schedules, addSchedule, updateSchedule, deleteSchedule } = useSchedule();
  
  // State untuk form
  const [judul, setJudul] = useState('');
  const [mulai, setMulai] = useState('');
  const [selesai, setSelesai] = useState('');
  
  // State untuk mode edit
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul || !mulai || !selesai) {
      alert('Semua kolom wajib diisi!');
      return;
    }

    const data = {
      judul,
      mulai: new Date(mulai),
      selesai: new Date(selesai),
    };

    if (isEditing) {
      updateSchedule(currentId, data);
    } else {
      addSchedule(data);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setJudul('');
    setMulai('');
    setSelesai('');
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (schedule) => {
    setIsEditing(true);
    setCurrentId(schedule.id);
    setJudul(schedule.judul);
    setMulai(toLocalISOString(schedule.mulai));
    setSelesai(toLocalISOString(schedule.selesai));
  };

  return (
    <div>
      <h1 className="halaman-judul">Kelola Data Penjadwalan</h1>

      {/* Formulir Tambah/Edit */}
      <div className="card">
        <h2>{isEditing ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h2>
        <form className="form-kelola" onSubmit={handleSubmit}>
          <div className="form-grup">
            <label htmlFor="judul">Judul Jadwal</label>
            <input
              type="text"
              id="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Rapat Proyek"
            />
          </div>
          <div className="form-grup">
            <label htmlFor="mulai">Waktu Mulai</label>
            <input
              type="datetime-local"
              id="mulai"
              value={mulai}
              onChange={(e) => setMulai(e.target.value)}
            />
          </div>
          <div className="form-grup">
            <label htmlFor="selesai">Waktu Selesai</label>
            <input
              type="datetime-local"
              id="selesai"
              value={selesai}
              onChange={(e) => setSelesai(e.target.value)}
            />
          </div>
          <div className="item-aksi">
            <button type="submit" className="tombol">
              {isEditing ? 'Simpan Perubahan' : 'Simpan Jadwal'}
            </button>
            {isEditing && (
              <button type="button" className="tombol tombol-edit" onClick={resetForm}>
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Daftar Jadwal */}
      <div className="card">
        <h2>Daftar Semua Jadwal</h2>
        <div className="daftar-jadwal">
          <ul>
            {schedules.length === 0 ? (
              <li className="pesan-kosong">Belum ada jadwal.</li>
            ) : (
              schedules.map((s) => (
                <li key={s.id} className="item-jadwal">
                  <div className="item-info">
                    <h3>{s.judul}</h3>
                    <p>Mulai: {formatTanggal(s.mulai)}</p>
                    <p>Selesai: {formatTanggal(s.selesai)}</p>
                  </div>
                  <div className="item-aksi">
                    <button className="tombol tombol-edit" onClick={() => handleEdit(s)}>
                      Edit
                    </button>
                    <button className="tombol tombol-hapus" onClick={() => deleteSchedule(s.id)}>
                      Hapus
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HalamanKelola;