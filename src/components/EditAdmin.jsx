import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet";
  import { useAppStore } from "../lib/zustand";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { getFormData } from "../lib/my-utils";
  import { editAdmin, refreshToken } from "../request";
  import { useEffect, useState } from "react";
  import { toast } from "sonner";
  import { UpdateIcon } from "@radix-ui/react-icons";
  
  export default function EditAdmin({ editedAdmin, setAdmins }) {
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [loading, setLoading] = useState(false);
    const { adminEditSheet, setAdminEditSheet, admin, setAdmin } = useAppStore();
  
    function handleSubmit(e) {
      e.preventDefault();
      const result = getFormData(e.target);
      setEditingAdmin({ ...result, id: editedAdmin.id });
    }
  
    useEffect(() => {
      if (editingAdmin) {
        setLoading(true);
        editAdmin(admin.access_token, editingAdmin)
          .then((data) => {
            setAdmins((admins) => {
              const filtredData = admins.filter((admin) => {
                admin.id !== editingAdmin.id;
              });
              setAdminEditSheet();
              toast.success("Ma'lumot muvaffaqiyatli yangilandi!");
              return [...filtredData, data];
            });
          })
          .catch(({ message }) => {
            if (message === "403") {
              refreshToken(admin?.refresh_token)
                .then(({ access_token }) => {
                  setAdmin({ ...admin, access_token });
                })
                .catch(() => {
                  toast.info("Tizimga qayta kiring!");
                  setAdmin(null);
                });
            }
          })
          .finally(() => {
            setLoading(false);
            setEditingAdmin(null);
          });
      }
    }, [editingAdmin, admin]);
  
    return (
      <Sheet open={adminEditSheet} onOpenChange={setAdminEditSheet}>
        <SheetContent className="" side="bottom">
          <SheetHeader>
            <SheetTitle>Admin ma'lumotlarini o'zgartirish.</SheetTitle>
            <SheetDescription>
              Siz ushbu admin ma'lumotlarini yangilashiz mumkin!
            </SheetDescription>
          </SheetHeader>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-2xl flex-col gap-3 px-10 py-5"
          >
            <div>
              <Label htmlFor="username">Ismni Yangilash</Label>
              <Input
                defaultValue={editedAdmin?.username}
                id="username"
                name="username"
                placeholder="Yangi Ismni kiriting"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor="password">Maxfiy so'zni Yangilash</Label>
              <Input
                defaultValue={editedAdmin?.password}
                id="password"
                name="password"
                type="password"
                placeholder="Yangi Maxfiy so'zni kiriting"
                autoComplete="off"
              />
            </div>
            {/* <div>
              <Label htmlFor="avatar">Avatarni Yangilash</Label>
              <Input id="avatar" placeholder="Yangi Avatarni kiriting  " />
            </div> */}
            <div className="flex w-full justify-end gap-3">
              <Button
                onClick={setAdminEditSheet}
                type="reset"
                className="w-40"
                variant="outline"
              >
                Bekor qilish
              </Button>
              <Button type="submit" className="w-40">
                {loading ? <UpdateIcon className="animate-spin" /> : "Yangilash"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    );
  }
  