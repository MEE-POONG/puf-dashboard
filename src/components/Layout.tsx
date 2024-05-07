import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const openSidebar = () => {
        // Implement openNav functionality
      };

    return (
        <section>
            {/* <Navbar /> */}
            <Sidebar openSidebar={openSidebar} />
            <main className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-9 pb-4">
                {children}
            </main>
        </section>
    )
}