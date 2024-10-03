import { LogOutIcon } from "lucide-react";
import { ModeToggle } from "./ToggleMode";
import { Button } from "@/components/ui/button";
import { useAppStore } from "../lib/zustand";
import { PinRightIcon, PinLeftIcon } from "@radix-ui/react-icons";

export default function Header() {
  const setAdmin = useAppStore((state) => state.setAdmin);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  const handleSidebarOpen = () => {
    setSidebarOpen();
  };

  return (
    <div className="px-5 py-3 shadow-sm">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <h2 className="text-3xl font-bold text-black">Gullar Market</h2>
          <Button onClick={handleSidebarOpen} variant="outline" size="icon">
            {!sidebarOpen ? <PinRightIcon /> : <PinLeftIcon />}
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <ModeToggle />
          <Button
            onClick={() => {
              const checker = confirm("Tizimdan chiqmoqchimisiz?🤔");

              checker && setAdmin(null);
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            Chiqish
            <LogOutIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
