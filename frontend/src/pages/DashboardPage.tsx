import Layout from "../components/Layout";
import { BookA } from "lucide-react";

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <div className="flex gap-3 ">
        <div className="w-4/12 min-h-32 items-center justify-center bg-white rounded-2xl shadow p-6 flex flex-col hover:shadow-md transition-all">
          <div>
            <div className="flex items-center space-x-3 text-amber-700 text-3xl">
              <BookA size={42} />
              <h2 className="text-lg font-semibold text-amber-900">
                Categorías
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
