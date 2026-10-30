
import { Building2, Users, MessageSquare } from "lucide-react";

const stats = [
  {
    title: "Total Properties",
    value: "24",
    icon: Building2,
  },
  {
    title: "Total Users",
    value: "156",
    icon: Users,
  },
  {
    title: "Enquiries",
    value: "38",
    icon: MessageSquare,
  },
];

export default function Dashboard() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">
          Dashboard
        </h1>
        <p className="mt-2 text-text-light">
          Welcome to your admin panel.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-bg-light bg-bg p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-text-light">
                  {stat.title}
                </p>

                <div className="rounded-lg bg-secondary/10 p-3">
                  <Icon size={22} className="text-secondary" />
                </div>
              </div>

              <p className="mt-5 text-3xl font-bold text-primary">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
