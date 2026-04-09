import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex bg-gray-900 text-white min-h-screen">

            <Sidebar />

            <main className="flex-1 flex justify-start">

                <div className="w-full max-w-5xl p-8">
                    {children}
                </div>

            </main>

        </div>
    );
}