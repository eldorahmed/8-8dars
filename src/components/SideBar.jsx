import { Navigate, NavLink } from "react-router-dom";
import parse from "html-react-parser";
import { panelLinks } from "../lib/my-utils";
import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "../lib/zustand";

export default function SideBar() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  return (
    <div
      className={`h-full text-nowrap border-r px-1 pt-7 transition-all ${sidebarOpen ? "w-[210px]" : `w-[64px]`}`}
    >
      <ul className="flex flex-col gap-3">
        {panelLinks.map(({ active, title, path, icon }) => {
          return (
            <li key={path}>
              {active && (
                <TooltipProvider
                  delayDuration="0"
                  disableHoverableContent="false"
                >
                  <Tooltip>
                    <span className="relative inline-block w-full overflow-hidden rounded-md hover:bg-accent hover:text-accent-foreground">
                      {!sidebarOpen && (
                        <TooltipTrigger className="absolute inset-0 inline-block h-full w-full"></TooltipTrigger>
                      )}
                      <NavLink
                        className={`${buttonVariants({ variant: "ghost" })} relative flex !w-full items-center !justify-start gap-2`}
                        to={path}
                      >
                        <>{parse(icon)}</>
                        <span
                          className={`transition-transform ${sidebarOpen ? "translate-x-0 scale-100 overflow-hidden text-ellipsis opacity-100" : "absolute -translate-x-full scale-0 opacity-0"}`}
                        >
                          {title}
                        </span>
                      </NavLink>
                    </span>
                    <TooltipContent side="right">
                      <p>{title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
