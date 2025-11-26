const NavLink = ({ ikon, label, namaView, view, setView, setSidebarBuka }) => (
    <button
        onClick={() => {
            setView(namaView);
            setSidebarBuka(false);
        }}
        className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${view === namaView
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
    >
        {ikon}
        <span className="font-semibold">{label}</span>
    </button>
);

export default NavLink;
