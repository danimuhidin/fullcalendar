import { Building2, Briefcase, CalendarDays, Clock } from 'lucide-react';

const CardJadwal = ({ judul, data, ruanganMap, divisiMap, variant = 'default' }) => {
    const formatTanggalWaktu = (isoString) => {
        if (!isoString) return 'N/A';
        const tgl = new Date(isoString);
        return tgl.toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }) + ' WIB';
    };

    // Color variants for different schedule states
    const colorClasses = {
        past: 'text-gray-500',      // Telah Berlalu - Gray
        current: 'text-green-600',  // Sedang Berlangsung - Green
        upcoming: 'text-blue-600',  // Akan Datang - Blue
        default: 'text-blue-700'
    };

    const titleColor = colorClasses[variant] || colorClasses.default;

    return (
        <div className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-900 rounded-lg shadow-xl p-6 w-full">
            <h3 className={`text-xl font-bold ${titleColor} mb-4`}>{judul}</h3>
            {data ? (
                <div className="space-y-2">
                    <p className="text-lg font-semibold">{data.judul}</p>
                    <p className="flex items-center"><Building2 className="w-5 h-5 mr-2 text-gray-600" /> {ruanganMap.get(data.ruanganId) || 'N/A'}</p>
                    <p className="flex items-center"><Briefcase className="w-5 h-5 mr-2 text-gray-600" /> {divisiMap.get(data.divisiId) || 'N/A'}</p>
                    <p className="flex items-center"><CalendarDays className="w-5 h-5 mr-2 text-gray-600" /> Mulai: {formatTanggalWaktu(data.waktuMulai)}</p>
                    <p className="flex items-center"><Clock className="w-5 h-5 mr-2 text-gray-600" /> Selesai: {formatTanggalWaktu(data.waktuSelesai)}</p>
                </div>
            ) : (
                <p className="text-gray-600">Tidak ada jadwal.</p>
            )}
        </div>
    );
};

export default CardJadwal;
