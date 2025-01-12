import NavBar from "@/components/shared/NavBar";
import SideBar from "@/components/shared/SideBar";
import { Outlet } from "react-router-dom";
import useMediaQuery from "./useMediaQuery";

function AdminLayout() {
  const isAboveMediumScreen = useMediaQuery("(min-width: 600px)");
  return (
    <main className="h-screen flex overflow-hidden ">
      <aside>
        <SideBar />
      </aside>
      <section className="flex-1 h-screen bg-[#084287]">
        <NavBar isAboveMediumScreen={isAboveMediumScreen} />
        <div className="overflow-y-auto h-[100vh] bg-white ">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default AdminLayout;
