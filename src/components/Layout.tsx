import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <div className="ml-16 bg-gray-100 h-screen fixed w-full lg:w-3/4 transition-all duration-200 ease-in-out">
                {children}
            </div>
        </div>
    )
}