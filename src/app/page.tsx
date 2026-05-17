import { Dashboard } from "@/components/Dashboard";
import { Shell } from "@/components/Shell";
import { planA26Snapshot } from "@/domain/planA26Data";

export default function Home() {
  return (
    <Shell>
      <Dashboard snapshot={planA26Snapshot} />
    </Shell>
  );
}
