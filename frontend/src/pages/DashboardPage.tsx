import Layout from "../components/Layout";
import { CalendarHeart } from "lucide-react";
import LinkCard from "../components/LinkCard";

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <div className="flex gap-3 flex-wrap">
        <LinkCard
          icon={<CalendarHeart size={24} />}
          title="Categorias"
          to="/categorias"
        />
      </div>
    </Layout>
  );
}
