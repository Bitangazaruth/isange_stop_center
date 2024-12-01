import Header from "./settingHeader";
import { Outlet } from "react-router-dom";

function SettingLayout() {
  return (
    <main className=" ">
      {" "}
      <Header />
      <section className=" ">
        <Outlet />
      </section>
    </main>
  );
}
export default SettingLayout;
