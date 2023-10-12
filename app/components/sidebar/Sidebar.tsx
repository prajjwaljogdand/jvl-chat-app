import getCurrentUser from "@/queries/getCurrentUser";

import DesktopSidebar from "./component/DesktopSidebar";
import MobileFooter from "./component/MobileFooter";
import { SocketIndicator } from "../SocketIndicator";
async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="">
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter currentUser={currentUser} />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
