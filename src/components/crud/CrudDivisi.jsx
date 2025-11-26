import { useState } from 'react';
import { Edit2, Trash } from 'lucide-react';

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
            <h3 className="text-2xl font-bold mb-6">Kelola Divisi</h3>
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

export default CrudDivisi;
