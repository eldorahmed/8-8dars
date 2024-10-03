import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

export default function Mainlayout() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <main className="flex h-full w-full bg-white">
        <SideBar />

        <div className="h-full w-full bg-slate-100 p-5">
          <div className="h-full w-full bg-white p-5">
            <Outlet />
          </div>
        </div>
      </main>
      <div className="sticky bottom-0 z-10 bg-white text-black">
        <Footer />
      </div>
    </>
  );
}
