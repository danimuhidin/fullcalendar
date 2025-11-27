import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Building2, Briefcase, Watch } from 'lucide-react';

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

    const getStatusJadwal = (jadwalItem) => {
        const sekarang = new Date();
        const waktuMulai = new Date(jadwalItem.waktuMulai);
        const waktuSelesai = new Date(jadwalItem.waktuSelesai);

        if (sekarang > waktuSelesai) {
            return 'selesai'; // Jadwal sudah berlalu
        } else if (sekarang >= waktuMulai && sekarang <= waktuSelesai) {
            return 'berlangsung'; // Jadwal sedang berlangsung
        } else {
            return 'akan-datang'; // Jadwal akan datang
        }
    };

    const getWarnaJadwal = (status) => {
        switch (status) {
            case 'selesai':
                return 'bg-gray-300 text-gray-600'; // Abu-abu untuk jadwal selesai
            case 'berlangsung':
                return 'bg-green-200 text-green-800'; // Hijau untuk sedang berlangsung
            case 'akan-datang':
                return 'bg-blue-100 text-blue-800'; // Biru untuk akan datang
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="bg-white/70 bg-opacity-90 backdrop-blur-lg text-gray-900 rounded-lg shadow-2xl p-2 md:p-4 w-full max-w-[95vw] mx-auto">
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
                                {jadwalHari.map(j => {
                                    const status = getStatusJadwal(j);
                                    const warnaKelas = getWarnaJadwal(status);
                                    return (
                                        <div key={j.id} className={`${warnaKelas} p-0.5 rounded text-[9px] md:text-[10px] leading-tight`}>
                                            <p className="font-bold truncate">{j.judul}</p>
                                            <p className="truncate"><Building2 className="w-2 h-2 inline-block mr-0.5" />{ruanganMap.get(j.ruanganId) || 'N/A'}</p>
                                            <p className="truncate"><Briefcase className="w-2 h-2 inline-block mr-0.5" />{divisiMap.get(j.divisiId) || 'N/A'}</p>
                                            <p className="font-medium"><Watch className="w-2 h-2 inline-block mr-0.5" />{formatJam(j.waktuMulai)} - {formatJam(j.waktuSelesai)}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default KalenderBulanan;
