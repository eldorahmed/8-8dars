import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormData, validation } from "../lib/my-utils/index";
import { useAppStore } from "../lib/zustand";
import SelectCategory from "./SelectCategory";
import SelectColor from "./SelectColor";
import { SelectCountry } from "./SelectCountry";
import LifeTime from "./LifeTime";
import UploadImage from "./UploadImage";
import { toast } from "sonner";
import Summaries from "./Summaries";
import { editFlower, refreshToken } from "../request";
import { useEffect, useState } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";

export default function EditFlower({ editedData, editing, setEditing }) {
  console.log(editedData?.name);

  const [loading, setLoading] = useState(false);
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const editModal = useAppStore((state) => state.editModal);
  const setEditModal = useAppStore((state) => state.setEditModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    const { checker, errorMessage } = validation(result);
    if (checker) {
      toast.warning(errorMessage);
    } else {
      setEditing({ ...result, id: editedData.id });
    }
  };

  useEffect(() => {
    if (editing) {
      setLoading(true);
      editFlower(admin?.access_token, editing)
        .then((res) => {
          toast.dismiss();
          toast.success(res);
          setEditing(null);
          setEditModal();
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken(admin?.refresh_token)
              .then(({ access_token }) => {
                setAdmin({ ...admin, access_token });
              })
              .catch(() => {
                toast.info("Tizimga qayta kiring");
                setAdmin(null);
              });
          }
          toast.error(message);
        })
        .finally(() => setLoading(false));
    }
  }, [admin, editing]);

  return (
    <Dialog open={editModal} onOpenChange={setEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ma'lumot tahrirlash</DialogTitle>
          <DialogDescription>
            Inputlarga qayta ma'lumot kiritish orqali yangi ma'lumotga
            o'zgartirish mumkin
          </DialogDescription>
          <form className="" onSubmit={handleSubmit}>
            <div className="max-h-96 overflow-x-hidden overflow-y-scroll px-2">
              <div className="mb-3">
                <Label htmlFor="name" className="ml-2">
                  Gul nomi*
                </Label>
                <Input
                  id="name"
                  defaultValue={editedData?.name}
                  autoComplete="off"
                  placeholder="Gul nomini kiriting"
                  name="name"
                />
              </div>
              <div className="mb-3">
                <Label htmlFor="price" className="ml-2">
                  Narxi (so'mda)*
                </Label>
                <Input
                  id="price"
                  defaultValue={editedData.price}
                  autoComplete="off"
                  placeholder="Gul narxini kiriting"
                  name="price"
                  type="number"
                />
              </div>
              <div className="mb-3 flex items-center justify-between">
                <SelectCategory outsideCategory={editedData.category} />
                <SelectColor outsideColor={editedData.color} />
              </div>

              <div className="mb-3">
                <SelectCountry outsideCountry={editedData.country} />
              </div>
              <div>
                <Summaries text={editedData.summary} />
              </div>
              <div className="mb-3">
                <Label className="ml-2" htmlFor="smell">
                  Hid*
                </Label>
                <Input
                  name="smell"
                  defaultValue={editedData.smell}
                  autoComplete="off"
                  type="text"
                  id="smell"
                  placeholder="Gul hidini kiriting..."
                />
              </div>
              <div>
                <LifeTime time={editedData.lifetime} />
              </div>
              <div className="w-full">
                <UploadImage outsideImg={editedData.imageUrl} />
              </div>
            </div>
            <div className="flex w-full justify-end gap-5 px-5">
              <Button onClick={setEditModal} variant="outline" type="button">
                Bekor qilish
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <UpdateIcon className="animate-spin" /> : "O'zgartirish"}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
