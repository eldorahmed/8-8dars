import { Label } from "@/components/ui/label";
import { collectItem } from "../lib/my-utils";
import { useAppStore } from "../lib/zustand";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function SelectColor() {
  const flowers = useAppStore((state) => state.flowers);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Rangni tanlang ");

  const handleFocus = () => {
    setOpen(!open);
  };

  return (
    flowers && (
      <div>
        <Label onClick={handleFocus} className="ml-2">
          Rangni*
        </Label>
        <Select
          value={value}
          onValueChange={setValue}
          open={open}
          onOpenChange={setOpen}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              {" "}
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: value }}
                  className="inline-block h-4 w-4 rounded-full"
                ></span>
                <span className="lowercase tracking-widest">{value}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[170px] overflow-y-scroll">
            {collectItem(flowers, "color").map((value) => {
              return (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <span
                      style={{ backgroundColor: value }}
                      className="inline-block h-4 w-4 rounded-full"
                    ></span>
                    <span className="lowercase tracking-widest">{value}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    )
  );
}
