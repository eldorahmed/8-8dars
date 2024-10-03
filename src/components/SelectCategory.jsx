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

export default function SelectCategory({ outsideCategory }) {
  const flowers = useAppStore((state) => state.flowers);
  const [open, setOpen] = useState(false);

  const handleFocus = () => {
    setOpen(!open);
  };

  return (
    flowers && (
      <div>
        <Label onClick={handleFocus} className="ml-2">
          Turkumni tanlang
        </Label>
        <Select
          defaultValue={outsideCategory && outsideCategory}
          name="category"
          open={open}
          onOpenChange={setOpen}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Turkumni tanlang" />
          </SelectTrigger>
          <SelectContent className="max-h-[170px] overflow-y-scroll">
            {collectItem(flowers, "category").map((value) => {
              return (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    )
  );
}
