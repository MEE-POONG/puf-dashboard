import Image from 'next/image';
const Navbar: React.FC = () => {
    return (
        <nav className="bg-white border-b border-gray-300">
            <div className="flex justify-between items-center px-6">
                <button id="menu-button">
                    <i className="fas fa-bars text-cyan-500 text-lg"></i>
                </button>
                <div className="mx-auto">
                    <Image src="" className="h-20 w-28" width={100} height={100} alt='' />
                </div>
                <div className="space-x-4">
                    <button>
                        <i className="fas fa-bell text-cyan-500 text-lg"></i>
                    </button>
                    <button>
                        <i className="fas fa-user text-cyan-500 text-lg"></i>
                    </button>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;