"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAppStore } from "../lib/zustand";

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
import { collectItem } from "../lib/my-utils";
import { Label } from "@/components/ui/label";

export function SelectCountry() {
  const flowers = useAppStore((state) => state.flowers);
  console.log(flowers);
  const country = flowers && collectItem(flowers, "country");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    flowers && (
      <div className="flex w-full flex-col gap-1">
        <Label className="ml-2" onClick={() => setOpen(!open)}>
          Hudud*
        </Label>
        <Popover className="w-full" open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {value
                ? country.find((country) => country === value)
                : "Hududni tanlang..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Hududni qidirish..." />
              <CommandList>
                <CommandEmpty>Bunday hudud topilmadi.</CommandEmpty>
                <CommandGroup>
                  {country.map((country) => (
                    <CommandItem
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
