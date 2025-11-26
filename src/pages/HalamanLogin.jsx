import { useState } from 'react';
import { ArrowLeft, UserCircle } from 'lucide-react';

const HalamanLogin = ({ setHalaman, setAutentikasi }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setAutentikasi(true);
            setHalaman('dashboard');
            setError('');
            setUsername('');
            setPassword('');
        } else {
            setError('Username atau password salah.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <button
                    onClick={() => setHalaman('utama')}
                    className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali ke Halaman Utama
                </button>
                <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center mb-6">
                        <UserCircle className="w-20 h-20 text-blue-600 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-800 mt-2">Login Administrator</h2>
                    </div>

                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">{error}</p>}

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HalamanLogin;
