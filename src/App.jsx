import React, { useState, useMemo } from 'react';
import {
  Building,
  Calendar,
  Clock,
  User,
  Plus,
  Edit2,
  Trash,
  LogOut,
  List,
  Users,
  Briefcase,
  Home,
  Info,
  Menu,
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Building2,
  CalendarDays,
  Watch
} from 'lucide-react';

// --- DATA DEMO ---
const RUANGAN_DEMO = [
  { id: 1, nama: 'Ruang Rapat A (Lantai 1)' },
  { id: 2, nama: 'Aula Utama (Lantai 3)' },
  { id: 3, nama: 'Ruang Konferensi (Lantai 2)' },
  { id: 4, nama: 'Ruang Diskusi B (Lantai 1)' },
];

const DIVISI_DEMO = [
  { id: 1, nama: 'IT & Pengembangan' },
  { id: 2, nama: 'HRD & Personalia' },
  { id: 3, nama: 'Marketing & Komunikasi' },
  { id: 4, nama: 'Operasional' },
];

const USERS_DEMO = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'manajer_it', password: 'password123' },
];

const generateDemoJadwal = () => {
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

// --- KOMPONEN KALENDER (Halaman Utama) ---
const KalenderBulanan = ({ jadwal, ruanganMap, divisiMap }) => {
  const [tanggalSaatIni, setTanggalSaatIni] = useState(new Date());

  const { hariKalender, hariPertamaBulan } = useMemo(() => {
    const hari = [];
    const tanggal = new Date(tanggalSaatIni.getFullYear(), tanggalSaatIni.getMonth(), 1);
    const hariPertama = (tanggal.getDay() + 6) % 7; // 0 = Senin, 6 = Minggu

    // Mundur ke hari Senin pertama di grid
    tanggal.setDate(tanggal.getDate() - hariPertama);

    // Isi 6 minggu (42 hari)
    for (let i = 0; i < 42; i++) {
      hari.push(new Date(tanggal));
      tanggal.setDate(tanggal.getDate() + 1);
    }
    return { hariKalender: hari, hariPertamaBulan: new Date(tanggalSaatIni.getFullYear(), tanggalSaatIni.getMonth(), 1) };
  }, [tanggalSaatIni]);

  const namaHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const gantiBulan = (offset) => {
    setTanggalSaatIni(new Date(tanggalSaatIni.getFullYear(), tanggalSaatIni.getMonth() + offset, 1));
  };

  const formatJam = (isoString) => new Date(isoString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const getJadwalUntukHari = (hari) => {
    return jadwal.filter(j => {
      const tglMulai = new Date(j.waktuMulai);
      return tglMulai.getFullYear() === hari.getFullYear() &&
        tglMulai.getMonth() === hari.getMonth() &&
        tglMulai.getDate() === hari.getDate();
    }).sort((a, b) => new Date(a.waktuMulai) - new Date(b.waktuMulai));
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-900 rounded-lg shadow-2xl p-2 md:p-4 w-full max-w-[95vw] mx-auto">
      {/* Header Kalender */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => gantiBulan(-1)} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-center">
          {hariPertamaBulan.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => gantiBulan(1)} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Grid Hari */}
      <div className="grid grid-cols-7 gap-0.5 md:gap-1">
        {namaHari.map(hari => (
          <div key={hari} className="text-center font-semibold text-xs md:text-sm text-gray-600 p-1 hidden md:block">
            {hari}
          </div>
        ))}
        {namaHari.map(hari => (
          <div key={hari + '-mobile'} className="text-center font-semibold text-xs text-gray-600 p-1 md:hidden">
            {hari.substring(0, 1)}
          </div>
        ))}

        {/* Grid Tanggal */}
        {hariKalender.map((hari, index) => {
          const bulanIni = hari.getMonth() === tanggalSaatIni.getMonth();
          const hariIni = new Date().toDateString() === hari.toDateString();
          const jadwalHari = getJadwalUntukHari(hari);

          return (
            <div
              key={index}
              className={`border border-gray-200 rounded p-1 min-h-[60px] md:min-h-[80px] flex flex-col ${bulanIni ? 'bg-white' : 'bg-gray-100'}`}
            >
              <span className={`text-xs font-semibold ${hariIni ? 'bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]' : ''} ${bulanIni ? 'text-gray-800' : 'text-gray-400'}`}>
                {hari.getDate()}
              </span>
              <div className="flex-grow overflow-y-auto mt-0.5 space-y-0.5">
                {jadwalHari.map(j => (
                  <div key={j.id} className="bg-blue-100 text-blue-800 p-0.5 rounded text-[9px] md:text-[14px] leading-tight">
                    <p className="font-bold truncate">{j.judul}</p>
                    <p className="truncate"><Building2 className="w-2 h-2 inline-block mr-0.5" />{ruanganMap.get(j.ruanganId) || 'N/A'}</p>
                    <p className="truncate"><Briefcase className="w-2 h-2 inline-block mr-0.5" />{divisiMap.get(j.divisiId) || 'N/A'}</p>
                    <p className="font-medium"><Watch className="w-2 h-2 inline-block mr-0.5" />{formatJam(j.waktuMulai)} - {formatJam(j.waktuSelesai)}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// --- KOMPONEN LAYOUT PUBLIK (Wrapper) ---
const LayoutPublik = ({ children, halamanAktif, setHalaman }) => {
  const bgImage = halamanAktif === 'utama'
    ? '/gedung2.png'
    : '/gedung2.png';

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Image */}
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="fixed inset-0 bg-cover bg-center z-0"
      />
      {/* Overlay Gelap */}
      <div className="fixed inset-0 z-0" />

      {/* Konten */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-center items-center p-4 md:p-1">
          <div className="flex items-center space-x-3 md:space-x-5">
            <img src="/brand.png" alt="Logo" className="w-12 h-12 md:w-32 md:h-32 object-contain" />
            <div className="w-px h-12 bg-white/30 hidden md:block" />
            <h1 className="text-xl md:text-4xl font-bold text-center text-shadow-lg/10">
              Penjadwalan Ruangan
              </h1>
          </div>
        </header>

        {/* Children (Konten Halaman) */}
        <main className="flex-grow overflow-hidden p-2 md:p-4 pb-20 flex items-start justify-center">
          {children}
        </main>

        {/* Navigasi Bawah */}
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg p-2 flex space-x-2">
          <button
            onClick={() => setHalaman('utama')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-colors ${halamanAktif === 'utama' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Penjadwalan</span>
          </button>
          <button
            onClick={() => setHalaman('ringkasan')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-colors ${halamanAktif === 'ringkasan' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            <Info className="w-5 h-5" />
            <span className="hidden sm:inline">Ringkasan</span>
          </button>
        </nav>

        {/* Tombol Admin Bubble */}
        <button
          onClick={() => setHalaman('login')}
          className="fixed bottom-4 right-4 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-110"
          aria-label="Login Admin"
        >
          <User className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

// --- KOMPONEN HALAMAN UTAMA ---
const HalamanUtama = ({ jadwal, ruanganMap, divisiMap }) => {
  return (
    <KalenderBulanan jadwal={jadwal} ruanganMap={ruanganMap} divisiMap={divisiMap} />
  );
};

// --- KOMPONEN CARD JADWAL (untuk Halaman Ringkasan) ---
const CardJadwal = ({ judul, data, ruanganMap, divisiMap }) => {
  const formatTanggalWaktu = (isoString) => {
    if (!isoString) return 'N/A';
    const tgl = new Date(isoString);
    return tgl.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }) + ' WIB';
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-900 rounded-lg shadow-xl p-6 w-full">
      <h3 className="text-lg md:text-xl font-bold text-blue-700 mb-2 md:mb-4">{judul}</h3>
      {data ? (
        <div className="space-y-2">
          <p className="text-base md:text-lg font-semibold">{data.judul}</p>
          <p className="flex items-center"><Building2 className="w-4 md:w-5 h-4 md:h-5 mr-2 text-gray-600" /> {ruanganMap.get(data.ruanganId) || 'N/A'}</p>
          <p className="flex items-center"><Briefcase className="w-4 md:w-5 h-4 md:h-5 mr-2 text-gray-600" /> {divisiMap.get(data.divisiId) || 'N/A'}</p>
          <p className="flex items-center"><CalendarDays className="w-4 md:w-5 h-4 md:h-5 mr-2 text-gray-600" /> Mulai: {formatTanggalWaktu(data.waktuMulai)}</p>
          <p className="flex items-center"><Clock className="w-4 md:w-5 h-4 md:h-5 mr-2 text-gray-600" /> Selesai: {formatTanggalWaktu(data.waktuSelesai)}</p>
        </div>
      ) : (
        <p className="text-gray-600">Tidak ada jadwal.</p>
      )}
    </div>
  );
};

// --- KOMPONEN HALAMAN RINGKASAN ---
const HalamanRingkasan = ({ jadwal, ruanganMap, divisiMap }) => {
  const now = useMemo(() => new Date(), []);

  const jadwalTelahBerlalu = useMemo(() =>
    jadwal
      .filter(j => new Date(j.waktuSelesai) < now)
      .sort((a, b) => new Date(b.waktuSelesai) - new Date(a.waktuSelesai))[0]
    , [jadwal, now]);

  const jadwalSedangBerlangsung = useMemo(() =>
    jadwal.find(j => new Date(j.waktuMulai) <= now && new Date(j.waktuSelesai) >= now)
    , [jadwal, now]);

  const jadwalAkanDatang = useMemo(() =>
    jadwal
      .filter(j => new Date(j.waktuMulai) > now)
      .sort((a, b) => new Date(a.waktuMulai) - new Date(b.waktuMulai))[0]
    , [jadwal, now]);

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:my-14">
      <CardJadwal judul="Jadwal Telah Berlalu" data={jadwalTelahBerlalu} ruanganMap={ruanganMap} divisiMap={divisiMap} />
      <CardJadwal judul="Jadwal Sedang Berlangsung" data={jadwalSedangBerlangsung} ruanganMap={ruanganMap} divisiMap={divisiMap} />
      <CardJadwal judul="Jadwal Akan Datang" data={jadwalAkanDatang} ruanganMap={ruanganMap} divisiMap={divisiMap} />
    </div>
  );
};

// --- KOMPONEN HALAMAN LOGIN ---
const HalamanLogin = ({ setHalaman, setAutentikasi }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setAutentikasi(true);
      setHalaman('dashboard');
      setError('');
      setUsername('');
      setPassword('');
    } else {
      setError('Username atau password salah.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => setHalaman('utama')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Halaman Utama
        </button>
        <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-6">
            <UserCircle className="w-20 h-20 text-blue-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800 mt-2">Login Administrator</h2>
          </div>

          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// --- KOMPONEN HALAMAN DASHBOARD (dan sub-CRUD) ---

// --- CRUD Ruangan ---
const CrudRuangan = ({ ruangan, setRuangan }) => {
  const [form, setForm] = useState({ id: null, nama: '' });
  const [modeEdit, setModeEdit] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, nama: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama) return;

    if (modeEdit) {
      setRuangan(ruangan.map(r => r.id === form.id ? form : r));
    } else {
      setRuangan([...ruangan, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, nama: '' });
    setModeEdit(false);
  };

  const handleEdit = (r) => {
    setForm(r);
    setModeEdit(true);
  };

  const handleHapus = (id) => {
    setRuangan(ruangan.filter(r => r.id !== id));
  };

  const handleBatal = () => {
    setForm({ id: null, nama: '' });
    setModeEdit(false);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Kelola Ruangan</h3>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-4">{modeEdit ? 'Edit Ruangan' : 'Tambah Ruangan Baru'}</h4>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="namaRuangan">Nama Ruangan</label>
          <input
            type="text"
            id="namaRuangan"
            value={form.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="cth: Ruang Rapat Lt. 5"
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {modeEdit ? 'Update' : 'Simpan'}
          </button>
          {modeEdit && (
            <button type="button" onClick={handleBatal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">
              Batal
            </button>
          )}
        </div>
      </form>
      {/* Tabel */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-3">Nama Ruangan</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {ruangan.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{r.nama}</td>
                <td className="p-3 flex space-x-2">
                  <button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-800 p-1">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleHapus(r.id)} className="text-red-600 hover:text-red-800 p-1">
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- CRUD Divisi ---
const CrudDivisi = ({ divisi, setDivisi }) => {
  const [form, setForm] = useState({ id: null, nama: '' });
  const [modeEdit, setModeEdit] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, nama: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama) return;

    if (modeEdit) {
      setDivisi(divisi.map(d => d.id === form.id ? form : d));
    } else {
      setDivisi([...divisi, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, nama: '' });
    setModeEdit(false);
  };

  const handleEdit = (d) => {
    setForm(d);
    setModeEdit(true);
  };

  const handleHapus = (id) => {
    setDivisi(divisi.filter(d => d.id !== id));
  };

  const handleBatal = () => {
    setForm({ id: null, nama: '' });
    setModeEdit(false);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Kelola Divisi</h3>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-4">{modeEdit ? 'Edit Divisi' : 'Tambah Divisi Baru'}</h4>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="namaDivisi">Nama Divisi</label>
          <input
            type="text"
            id="namaDivisi"
            value={form.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="cth: IT & Pengembangan"
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {modeEdit ? 'Update' : 'Simpan'}
          </button>
          {modeEdit && (
            <button type="button" onClick={handleBatal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">
              Batal
            </button>
          )}
        </div>
      </form>
      {/* Tabel */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-3">Nama Divisi</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {divisi.map(d => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.nama}</td>
                <td className="p-3 flex space-x-2">
                  <button onClick={() => handleEdit(d)} className="text-blue-600 hover:text-blue-800 p-1">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleHapus(d.id)} className="text-red-600 hover:text-red-800 p-1">
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- CRUD User ---
const CrudUser = ({ users, setUsers }) => {
  const [form, setForm] = useState({ id: null, username: '', password: '' });
  const [modeEdit, setModeEdit] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return;

    if (modeEdit) {
      setUsers(users.map(u => u.id === form.id ? form : u));
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, username: '', password: '' });
    setModeEdit(false);
  };

  const handleEdit = (u) => {
    setForm(u);
    setModeEdit(true);
  };

  const handleHapus = (id) => {
    // Admin tidak bisa dihapus
    if (id === 1) {
      alert("User 'admin' tidak dapat dihapus.");
      return;
    }
    setUsers(users.filter(u => u.id !== id));
  };

  const handleBatal = () => {
    setForm({ id: null, username: '', password: '' });
    setModeEdit(false);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Kelola User</h3>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-4">{modeEdit ? 'Edit User' : 'Tambah User Baru'}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              disabled={form.id === 1} // Admin username tidak bisa diedit
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {modeEdit ? 'Update' : 'Simpan'}
          </button>
          {modeEdit && (
            <button type="button" onClick={handleBatal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">
              Batal
            </button>
          )}
        </div>
      </form>
      {/* Tabel */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-3">Username</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.username}</td>
                <td className="p-3 flex space-x-2">
                  <button onClick={() => handleEdit(u)} className="text-blue-600 hover:text-blue-800 p-1">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleHapus(u.id)}
                    className={`p-1 ${u.id === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}
                    disabled={u.id === 1}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- CRUD Penjadwalan ---
const CrudPenjadwalan = ({ jadwal, setJadwal, ruangan, divisi, ruanganMap, divisiMap }) => {
  const [form, setForm] = useState({
    id: null,
    judul: '',
    ruanganId: '',
    divisiId: '',
    waktuMulai: '',
    waktuSelesai: '',
  });
  const [modeEdit, setModeEdit] = useState(false);

  const formatUntukInput = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    // Format YYYY-MM-DDTHH:mm
    return d.getFullYear() + '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
      ('0' + d.getDate()).slice(-2) + 'T' +
      ('0' + d.getHours()).slice(-2) + ':' +
      ('0' + d.getMinutes()).slice(-2);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.judul || !form.ruanganId || !form.divisiId || !form.waktuMulai || !form.waktuSelesai) {
      alert("Semua field wajib diisi.");
      return;
    }

    const dataSubmit = {
      ...form,
      ruanganId: parseInt(form.ruanganId),
      divisiId: parseInt(form.divisiId),
      waktuMulai: new Date(form.waktuMulai).toISOString(),
      waktuSelesai: new Date(form.waktuSelesai).toISOString(),
    };

    if (modeEdit) {
      setJadwal(jadwal.map(j => j.id === dataSubmit.id ? dataSubmit : j));
    } else {
      setJadwal([...jadwal, { ...dataSubmit, id: Date.now() }]);
    }

    setForm({ id: null, judul: '', ruanganId: '', divisiId: '', waktuMulai: '', waktuSelesai: '' });
    setModeEdit(false);
  };

  const handleEdit = (j) => {
    setForm({
      ...j,
      waktuMulai: formatUntukInput(j.waktuMulai),
      waktuSelesai: formatUntukInput(j.waktuSelesai),
    });
    setModeEdit(true);
  };

  const handleHapus = (id) => {
    setJadwal(jadwal.filter(j => j.id !== id));
  };

  const handleBatal = () => {
    setForm({ id: null, judul: '', ruanganId: '', divisiId: '', waktuMulai: '', waktuSelesai: '' });
    setModeEdit(false);
  };

  const formatTabelWaktu = (isoString) => new Date(isoString).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Kelola Penjadwalan</h3>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-4">{modeEdit ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="judul">Judul Kegiatan</label>
            <input
              type="text"
              id="judul"
              name="judul"
              value={form.judul}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="cth: Rapat Bulanan"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="ruanganId">Ruangan</label>
            <select
              id="ruanganId"
              name="ruanganId"
              value={form.ruanganId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Ruangan --</option>
              {ruangan.map(r => (
                <option key={r.id} value={r.id}>{r.nama}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="divisiId">Divisi</label>
            <select
              id="divisiId"
              name="divisiId"
              value={form.divisiId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Divisi --</option>
              {divisi.map(d => (
                <option key={d.id} value={d.id}>{d.nama}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="waktuMulai">Waktu Mulai</label>
            <input
              type="datetime-local"
              id="waktuMulai"
              name="waktuMulai"
              value={form.waktuMulai}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="waktuSelesai">Waktu Selesai</label>
            <input
              type="datetime-local"
              id="waktuSelesai"
              name="waktuSelesai"
              value={form.waktuSelesai}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {modeEdit ? 'Update' : 'Simpan'}
          </button>
          {modeEdit && (
            <button type="button" onClick={handleBatal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Tabel */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-3">Judul Kegiatan</th>
              <th className="p-3">Ruangan</th>
              <th className="p-3">Divisi</th>
              <th className="p-3">Mulai</th>
              <th className="p-3">Selesai</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map(j => (
              <tr key={j.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{j.judul}</td>
                <td className="p-3">{ruanganMap.get(j.ruanganId) || 'N/A'}</td>
                <td className="p-3">{divisiMap.get(j.divisiId) || 'N/A'}</td>
                <td className="p-3">{formatTabelWaktu(j.waktuMulai)}</td>
                <td className="p-3">{formatTabelWaktu(j.waktuSelesai)}</td>
                <td className="p-3 flex space-x-2">
                  <button onClick={() => handleEdit(j)} className="text-blue-600 hover:text-blue-800 p-1">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleHapus(j.id)} className="text-red-600 hover:text-red-800 p-1">
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Komponen NavLink (untuk Dashboard) ---
const NavLink = ({ ikon, label, namaView, view, setView, setSidebarBuka }) => (
  <button
    onClick={() => {
      setView(namaView);
      setSidebarBuka(false);
    }}
    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${view === namaView
      ? 'bg-blue-600 text-white'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
  >
    {ikon}
    <span className="font-semibold">{label}</span>
  </button>
);

// --- Komponen Dashboard Wrapper ---
const HalamanDashboard = (props) => {
  const { setHalaman, setAutentikasi } = props;
  const [view, setView] = useState('penjadwalan');
  const [sidebarBuka, setSidebarBuka] = useState(false);

  const handleLogout = () => {
    setAutentikasi(false);
    setHalaman('login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Tombol Buka Sidebar (Mobile) */}
      <button
        onClick={() => setSidebarBuka(true)}
        className="fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-md md:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 flex flex-col z-40
                  transform transition-transform ${sidebarBuka ? 'translate-x-0' : '-translate-x-full'} 
                  md:translate-x-0 md:static md:z-auto shadow-lg`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Building className="w-8 h-8" />
            <span className="text-xl font-bold">Dashboard</span>
          </div>
          <button onClick={() => setSidebarBuka(false)} className="md:hidden p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-grow space-y-2">
          <NavLink ikon={<List className="w-5 h-5" />} label="Penjadwalan" namaView="penjadwalan" view={view} setView={setView} setSidebarBuka={setSidebarBuka} />
          <NavLink ikon={<Building2 className="w-5 h-5" />} label="Ruangan" namaView="ruangan" view={view} setView={setView} setSidebarBuka={setSidebarBuka} />
          <NavLink ikon={<Briefcase className="w-5 h-5" />} label="Divisi" namaView="divisi" view={view} setView={setView} setSidebarBuka={setSidebarBuka} />
          <NavLink ikon={<Users className="w-5 h-5" />} label="User" namaView="user" view={view} setView={setView} setSidebarBuka={setSidebarBuka} />
        </nav>

        <div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        {/* Overlay untuk mobile saat sidebar buka */}
        {sidebarBuka && <div onClick={() => setSidebarBuka(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" />}

        {view === 'penjadwalan' && <CrudPenjadwalan {...props} />}
        {view === 'ruangan' && <CrudRuangan {...props} />}
        {view === 'divisi' && <CrudDivisi {...props} />}
        {view === 'user' && <CrudUser {...props} />}
      </main>
    </div>
  );
};


// --- KOMPONEN APP UTAMA ---
function App() {
  const [halaman, setHalaman] = useState('utama'); // 'utama', 'ringkasan', 'login', 'dashboard'
  const [autentikasi, setAutentikasi] = useState(false);

  // Data State
  const [ruangan, setRuangan] = useState(RUANGAN_DEMO);
  const [divisi, setDivisi] = useState(DIVISI_DEMO);
  const [users, setUsers] = useState(USERS_DEMO);
  const [jadwal, setJadwal] = useState(generateDemoJadwal());

  // Buat Maps untuk pencarian nama yang efisien
  const ruanganMap = useMemo(() =>
    new Map(ruangan.map(r => [r.id, r.nama]))
    , [ruangan]);

  const divisiMap = useMemo(() =>
    new Map(divisi.map(d => [d.id, d.nama]))
    , [divisi]);

  const propsDashboard = {
    setHalaman, setAutentikasi,
    ruangan, setRuangan,
    divisi, setDivisi,
    users, setUsers,
    jadwal, setJadwal,
    ruanganMap, divisiMap
  };

  // Navigasi
  const renderHalaman = () => {
    switch (halaman) {
      case 'utama':
        return (
          <LayoutPublik halamanAktif="utama" setHalaman={setHalaman}>
            <HalamanUtama jadwal={jadwal} ruanganMap={ruanganMap} divisiMap={divisiMap} />
          </LayoutPublik>
        );
      case 'ringkasan':
        return (
          <LayoutPublik halamanAktif="ringkasan" setHalaman={setHalaman}>
            <HalamanRingkasan jadwal={jadwal} ruanganMap={ruanganMap} divisiMap={divisiMap} />
          </LayoutPublik>
        );
      case 'login':
        return <HalamanLogin setHalaman={setHalaman} setAutentikasi={setAutentikasi} />;
      case 'dashboard':
        return autentikasi ? <HalamanDashboard {...propsDashboard} /> : <HalamanLogin setHalaman={setHalaman} setAutentikasi={setAutentikasi} />;
      default:
        return (
          <LayoutPublik halamanAktif="utama" setHalaman={setHalaman}>
            <HalamanUtama jadwal={jadwal} ruanganMap={ruanganMap} divisiMap={divisiMap} />
          </LayoutPublik>
        );
    }
  };

  return (
    <div className="antialiased">
      {renderHalaman()}
    </div>
  );
}

export default App;