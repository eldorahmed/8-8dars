import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFormData } from "../lib/my-utils/index";
import { useAppStore } from "../lib/zustand";
import SelectCategory from "./SelectCategory";
import SelectColor from "./SelectColor";
import { SelectCountry } from "./SelectCountry";
import LifeTime from "./LifeTime";
import UploadImage from "./UploadImage";

export default function AddNewItemModal() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
  };

  const addItemModal = useAppStore((state) => state.addItemModal);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  return (
    <Dialog open={addItemModal} onOpenChange={setAddItemModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ma'lumot qo'shish</DialogTitle>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label htmlFor="name" className="ml-2">
                Gul nomi*
              </Label>
              <Input id="name" placeholder="Gul nomini kiriting" name="name" />
            </div>
            <div className="mb-3">
              <Label htmlFor="price" className="ml-2">
                Narxi*
              </Label>
              <Input
                id="price"
                placeholder="Gul narxini kiriting"
                name="price"
              />
            </div>
            <div className="mb-3 flex items-center justify-between">
              <SelectCategory />
              <SelectColor />
            </div>
            <div className="mb-3">
              <SelectCountry />
            </div>
            <div>
              <Label className="ml-2" htmlFor="summary">
                Gul haqida ma'lumot*
              </Label>
              <Textarea
                placeholder="Gul haqida ma'lumot kiriting..."
                id="summary"
              />
            </div>
            <div className="mb-3">
              <Label className="ml-2" htmlFor="smell">
                Hid*
              </Label>
              <Input
                type="text"
                id="smell"
                placeholder="Gul hidini kiriting..."
              />
            </div>
            <div>
              <LifeTime />
            </div>
            <div className="w-full">
              <UploadImage />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
