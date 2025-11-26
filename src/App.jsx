import { useState, useMemo } from 'react';
import { RUANGAN_DEMO, DIVISI_DEMO, USERS_DEMO, generateDemoJadwal } from './data/demoData';
import LayoutPublik from './components/LayoutPublik';
import HalamanUtama from './pages/HalamanUtama';
import HalamanRingkasan from './pages/HalamanRingkasan';
import HalamanLogin from './pages/HalamanLogin';
import HalamanDashboard from './pages/HalamanDashboard';

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
