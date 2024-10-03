import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useState } from "react";

export default function FiltersByColor({ colors, handleEnableToFilter }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full">
      <div className="">
        <Label className="mb-3" onClick={handleFocus}>
          Rang
        </Label>
        <Select
          name="color"
          onOpenChange={setOpen}
          open={open}
          onValueChange={(valeu) => {
            setValue(valeu);
            handleEnableToFilter();
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Rang bo'yicha">
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: value }}
                  className="inline-block h-4 w-4 rounded-full border"
                ></span>
                <span className="lowercase tracking-widest">{value}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-32">
              <SelectLabel>Ranglar</SelectLabel>
              {colors?.map((color) => {
                return (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: color }}
                        className="inline-block h-4 w-4 rounded-full border"
                      ></span>
                      <span className="lowercase tracking-widest">{color}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
