import { useState } from 'react';
import { Edit2, Trash } from 'lucide-react';

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
            <h3 className="text-2xl font-bold mb-6">Kelola Penjadwalan</h3>
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

export default CrudPenjadwalan;
