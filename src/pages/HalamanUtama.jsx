import KalenderBulanan from '../components/KalenderBulanan';

const HalamanUtama = ({ jadwal, ruanganMap, divisiMap }) => {
    return (
        <KalenderBulanan jadwal={jadwal} ruanganMap={ruanganMap} divisiMap={divisiMap} />
    );
};

export default HalamanUtama;
