import { useState } from 'react';
import { Building, Menu, X, LogOut, List, Users, Briefcase, Building2 } from 'lucide-react';
import NavLink from '../components/NavLink';
import CrudPenjadwalan from '../components/crud/CrudPenjadwalan';
import CrudRuangan from '../components/crud/CrudRuangan';
import CrudDivisi from '../components/crud/CrudDivisi';
import CrudUser from '../components/crud/CrudUser';

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

export default HalamanDashboard;
