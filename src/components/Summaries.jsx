import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { summaryLimit } from "../lib/my-utils";
import { useState } from "react";

export default function Summaries({ text }) {
  const [counter, setCounter] = useState(0);

  const writer = (e) => {
    const inputValue = e.target.value.trim();
    setCounter(inputValue.length);
  };

  return (
    <div>
      <Label className="ml-2" htmlFor="summary">
        Gul haqida ma'lumot*
      </Label>
      <Textarea
        maxLength="200"
        onChange={writer}
        defaultValue={text && text}
        name="summary"
        placeholder="Gul haqida ma'lumot kiriting..."
        id="summary"
      />
      {counter ? (
        <p className="flex justify-end text-muted-foreground">
          {counter}/{summaryLimit}
        </p>
      ) : (
        <p className="mb-3 pl-2 text-[12px] text-muted-foreground">
          Izoh 200 ta harifdan iborat bo'lishi kerak!
        </p>
      )}
    </div>
  );
}
