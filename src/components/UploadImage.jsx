import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function UploadImage() {
  return (
    <div className="w-full">
      <Label className="ml-2">Rasim Yuklang..</Label>
      <Tabs defaultValue="local" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="local">
            Local
          </TabsTrigger>
          <TabsTrigger className="w-full" value="url">
            URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Label>
            <span
              className={`w-full py-1 ${buttonVariants({ variant: "outline" })}`}
            >
              <PlusCircleIcon />
            </span>
            <Input className="sr-only" type="file" />
          </Label>
        </TabsContent>
        <TabsContent value="url">
          <Label htmlFor="url" className="mb-1 ml-2">
            Havola*
          </Label>
          <Input
            id="url"
            placeholder=" Rasimni havolasini kiriting"
            className="w-full"
            type="url"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
