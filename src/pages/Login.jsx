import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormData } from "../lib/my-utils";
import { login } from "../request";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    setLoading(true);
    login(result);
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-96 flex-col gap-5"
      >
        <div>
          <Label htmlFor="username">Foydalanuvchining ismi</Label>
          <Input
            name="username"
            id="username"
            type="text"
            placeholder="Ismingizni kiriting"
          />
        </div>
        <div>
          <Label htmlFor="password">Foydalanuvchining maxfiy so'zi</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Maxfiy so'zni kiriting"
          />
        </div>
        <div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <UpdateIcon className="animate-spin" /> : "Kirish"}
          </Button>
        </div>
      </form>
    </div>
  );
}
