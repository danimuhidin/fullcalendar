import { useState } from 'react';
import { Edit2, Trash } from 'lucide-react';

const CrudUser = ({ users, setUsers }) => {
    const [form, setForm] = useState({ id: null, username: '', password: '' });
    const [modeEdit, setModeEdit] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username || !form.password) return;

        if (modeEdit) {
            setUsers(users.map(u => u.id === form.id ? form : u));
        } else {
            setUsers([...users, { ...form, id: Date.now() }]);
        }
        setForm({ id: null, username: '', password: '' });
        setModeEdit(false);
    };

    const handleEdit = (u) => {
        setForm(u);
        setModeEdit(true);
    };

    const handleHapus = (id) => {
        // Admin tidak bisa dihapus
        if (id === 1) {
            alert("User 'admin' tidak dapat dihapus.");
            return;
        }
        setUsers(users.filter(u => u.id !== id));
    };

    const handleBatal = () => {
        setForm({ id: null, username: '', password: '' });
        setModeEdit(false);
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6">Kelola User</h3>
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold mb-4">{modeEdit ? 'Edit User' : 'Tambah User Baru'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Username"
                            disabled={form.id === 1} // Admin username tidak bisa diedit
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
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
                            <th className="p-3">Username</th>
                            <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{u.username}</td>
                                <td className="p-3 flex space-x-2">
                                    <button onClick={() => handleEdit(u)} className="text-blue-600 hover:text-blue-800 p-1">
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleHapus(u.id)}
                                        className={`p-1 ${u.id === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}
                                        disabled={u.id === 1}
                                    >
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

export default CrudUser;
