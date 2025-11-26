// --- DATA DEMO ---
export const RUANGAN_DEMO = [
  { id: 1, nama: 'Ruang Rapat A (Lantai 1)' },
  { id: 2, nama: 'Aula Utama (Lantai 3)' },
  { id: 3, nama: 'Ruang Konferensi (Lantai 2)' },
  { id: 4, nama: 'Ruang Diskusi B (Lantai 1)' },
];

export const DIVISI_DEMO = [
  { id: 1, nama: 'Group Supporting' },
  { id: 2, nama: 'Konsumer' },
  { id: 3, nama: 'Funding' },
  { id: 4, nama: 'Komersial' },
  { id: 5, nama: 'UMKM' },
  { id: 6, nama: 'CFR' },
  { id: 7, nama: 'MRO' },
];

export const USERS_DEMO = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'manajer_it', password: 'password123' },
];

export const generateDemoJadwal = () => {
  const now = new Date();
  const hariIni = now.getDate();
  const bulanIni = now.getMonth();
  const tahunIni = now.getFullYear();

  return [
    // Jadwal Telah Berlalu (untuk Halaman Ringkasan)
    {
      id: 1,
      judul: 'Evaluasi Kinerja Karyawan Q3',
      ruanganId: 1,
      divisiId: 2,
      waktuMulai: new Date(tahunIni, bulanIni, hariIni - 2, 9, 0).toISOString(),
      waktuSelesai: new Date(tahunIni, bulanIni, hariIni - 2, 11, 0).toISOString(),
    },
    // Jadwal Sedang Berlangsung (untuk Halaman Ringkasan)
    {
      id: 2,
      judul: 'Daily Standup Tim IT',
      ruanganId: 4,
      divisiId: 1,
      waktuMulai: new Date(now.getTime() - 30 * 60000).toISOString(), // 30 menit lalu
      waktuSelesai: new Date(now.getTime() + 60 * 60000).toISOString(), // 1 jam dari sekarang
    },
    // Jadwal Akan Datang (untuk Halaman Ringkasan)
    {
      id: 3,
      judul: 'Presentasi Strategi Marketing Q4',
      ruanganId: 3,
      divisiId: 3,
      waktuMulai: new Date(tahunIni, bulanIni, hariIni + 1, 14, 0).toISOString(),
      waktuSelesai: new Date(tahunIni, bulanIni, hariIni + 1, 16, 0).toISOString(),
    },
    // Jadwal lain untuk kalender
    {
      id: 4,
      judul: 'Rapat Anggaran Tahunan',
      ruanganId: 2,
      divisiId: 4,
      waktuMulai: new Date(tahunIni, bulanIni, 15, 10, 0).toISOString(),
      waktuSelesai: new Date(tahunIni, bulanIni, 15, 15, 0).toISOString(),
    },
    {
      id: 5,
      judul: 'Pelatihan Sistem Baru',
      ruanganId: 1,
      divisiId: 1,
      waktuMulai: new Date(tahunIni, bulanIni, hariIni + 3, 9, 0).toISOString(),
      waktuSelesai: new Date(tahunIni, bulanIni, hariIni + 3, 17, 0).toISOString(),
    },
  ];
};
