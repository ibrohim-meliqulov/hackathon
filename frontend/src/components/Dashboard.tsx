import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import AnalysisTool from "./AnalysisTool";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      <Sidebar onLogout={onLogout} />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <main className="p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-2">Xush kelibsiz, Jamshid!</h1>
              <p className="text-gray-500">Bugun qaysi o'simlikni tekshiramiz?</p>
            </div>

            <AnalysisTool />
          </div>
        </main>
      </div>
    </div>
  );
}
