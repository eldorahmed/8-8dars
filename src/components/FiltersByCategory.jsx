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

export default function FiltersByCategory({
  categories,
  handleEnableToFilter,
}) {
  const [open, setOpen] = useState(false);

  const handleFocus = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full">
      <div className="">
        <Label onClick={handleFocus}>Turkumlash</Label>
        <Select
          open={open}
          onValueChange={handleEnableToFilter}
          onOpenChange={handleFocus}
          name="category"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Turkum bo'yicha" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-32">
              <SelectLabel>Turkumlar</SelectLabel>
              {categories.map((category) => {
                return (
                  <SelectItem key={category} value={category}>
                    {category}
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
