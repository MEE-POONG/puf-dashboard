import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { Prompt } from 'next/font/google'
 
const promt = Prompt({
  weight: '400',
  subsets: ['latin'],
})

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const openSidebar = () => {
        // Implement openNav functionality
    };

    return (
        <section className={promt.className}>
            {/* <Navbar /> */}
            <Sidebar openSidebar={openSidebar} />
            <main className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-4">
                {children}
            </main>
        </section>
    )
}