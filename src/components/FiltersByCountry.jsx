import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export default function FiltersByCountry({ countries, handleEnableToFilter }) {
  const button = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    let id = null;
    const changer = () => {
      if (open && button) {
        id = setTimeout(() => {
          const element = document.querySelector(
            "[data-radix-popper-contents-wrapper]",
          );
          console.log(element);
          element.style.width = button.current.offsetWidth + "px";
        }, 1);
      }
    };

    changer();

    window.addEventListener("resize", changer);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", changer);
      id = null;
    };
  }, [open, button]);

  return (
    countries && (
      <div className="flex w-full flex-col gap-1">
        <input
          className="sr-only"
          type="text"
          onChange={setValue}
          value={value}
          name="country"
        />
        <Label className="ml-2" onClick={() => setOpen(!open)}>
          Hudud bo'yicha
        </Label>

        <Popover
          className="w-full"
          open={open}
          onValueChange={handleEnableToFilter}
          onOpenChange={setOpen}
        >
          <PopoverTrigger asChild>
            <Button
              ref={button}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {value
                ? countries.find((country) => country === value)
                : "Hududni tanlang..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command className="w-full">
              <CommandInput placeholder="Hududni qidirish..." />
              <CommandList className="w-full">
                <CommandEmpty>Bunday hudud topilmadi.</CommandEmpty>
                <CommandGroup className="max-h-[105px] w-full">
                  {countries.map((country) => (
                    <CommandItem
                      className="w-full"
                      key={country}
                      value={country}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === country ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
  );
}
