import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { periods } from "../lib/my-utils";
import { Label } from "@/components/ui/label";

export default function LifeTime() {
  return (
    <div>
      <div className="mb-3">
        <Label className="mb-1 ml-2">Min. davir (dan)</Label>
        <div className="flex gap-3">
          <Input
            placeholder="Darvir kiriting"
            className="w-full"
            type="number"
          />
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Davir davomiyligini tanlang..." />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => {
                return (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-3">
        <Label className="mb-1 ml-2">Max. davir (gacha)</Label>
        <div className="flex gap-3">
          <Input
            placeholder="Darvir kiriting"
            className="w-full"
            type="number"
          />
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Davir davomiyligini tanlang..." />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => {
                return (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
