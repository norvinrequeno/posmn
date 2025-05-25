import Layout from "../components/Layout";
import LinkCard from "../components/LinkCard";
import { MenuItems } from "../routes";
import { LinkMenuType } from "../types";

export default function DashboardPage() {
  const links: LinkMenuType[] = MenuItems;

  return (
    <Layout title="Dashboard">
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
        {links.map((link: LinkMenuType, index) => {
          if (link.to) {
            return (
              <LinkCard
                icon={link.icon}
                title={link.name}
                to={link.to}
                key={link.name || index}
              />
            );
          }
          return null;
        })}
      </div>
    </Layout>
  );
}
