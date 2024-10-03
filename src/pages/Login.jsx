import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { getFormData } from "../lib/my-utils/index";
import { login } from "../request";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";
import spinFlower from "/flower.png";

export default function Login() {
  const [loadin, setLoading] = useState(false);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const admin = useAppStore((state) => state.admin);
  console.log(admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    setLoading(true);
    console.log("result: ", result);

    login(result)
      .then((res) => {
        console.log(res);

        setAdmin(res);
        toast.success("Siz saytga muvaffaqiyatli kirdingiz!");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-96 flex-col gap-5"
      >
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-2xl font-bold tracking-wider">Flower</h2>
          <img
            src={spinFlower}
            alt="login uchun gul rasmi"
            className="spinFlowerIcon h-8 w-8"
          />
        </div>
        <div>
          <Label htmlFor="username">Foydalanuvchining Ismi</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Ismingizni kiriting"
          />
        </div>
        <div className="mb-5">
          <Label htmlFor="password">Foydalanuvchining maxfiy so'zi</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Maxfiy so'zni kiriting"
          />
        </div>
        <div>
          <Button className="flex w-full items-center gap-3" disabled={loadin}>
            {loadin ? (
              <>
                Tekshirilmoqda <UpdateIcon className="animate-spin" />{" "}
              </>
            ) : (
              "Kirish"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
