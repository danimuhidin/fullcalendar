import { Home, Info, User } from 'lucide-react';

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
                            Jadwal Ruang Rapat
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

export default LayoutPublik;
