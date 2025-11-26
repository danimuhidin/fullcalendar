import { useMemo } from 'react';
import CardJadwal from '../components/CardJadwal';

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
            <CardJadwal judul="Jadwal Telah Berlalu" data={jadwalTelahBerlalu} ruanganMap={ruanganMap} divisiMap={divisiMap} variant="past" />
            <CardJadwal judul="Jadwal Sedang Berlangsung" data={jadwalSedangBerlangsung} ruanganMap={ruanganMap} divisiMap={divisiMap} variant="current" />
            <CardJadwal judul="Jadwal Akan Datang" data={jadwalAkanDatang} ruanganMap={ruanganMap} divisiMap={divisiMap} variant="upcoming" />
        </div>
    );
};

export default HalamanRingkasan;
