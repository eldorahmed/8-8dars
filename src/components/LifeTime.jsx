import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LifeTime({ time }) {
  return (
    <div>
      <div className="mb-3">
        <Label className="mb-1 ml-2">
          Gulning gulash vaqti (max. haftada)*
        </Label>
        <div className="flex gap-3">
          <Input
            name="lifetime"
            defaultValue={time && time}
            placeholder="Davir kiriting"
            className="w-full"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}
