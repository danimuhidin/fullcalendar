import { useState } from 'react';
import { Edit2, Trash } from 'lucide-react';

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
            <h3 className="text-2xl font-bold mb-6">Kelola Ruangan</h3>
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

export default CrudRuangan;
