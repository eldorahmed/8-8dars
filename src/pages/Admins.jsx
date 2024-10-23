import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useEffect } from "react";
import { getAdmins, refreshToken } from "../request";
import { useAppStore } from "../lib/zustand";
import { toast } from "sonner";
import {
  LockOpen2Icon,
  Pencil1Icon,
  UpdateIcon,
  TrashIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { buttonVariants } from "../components/ui/button";
import EditAdmin from "../components/EditAdmin";
import { findObj } from "../lib/my-utils";

export default function Admins() {
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const { admin, setAdmin, setAdminEditSheet } = useAppStore();
  const [admins, setAdmins] = useState(null);

  function handleEdit(id) {
    setAdminEditSheet();
    const result = findObj(admins, id);
    setEditedAdmin(result);
  }

  useEffect(() => {
    setLoading(true);
    getAdmins(admin?.access_token)
      .then(({ data }) => {
        setAdmins(data);
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
      });
  }, [admin]);

  return (
    <>
      <div>
        {loading && !admins && (
          <div className="flex items-center justify-center gap-4">
            Yuklanmoqda
            <UpdateIcon className="animate-spin" />
          </div>
        )}
        <ul className="grid grid-cols-4 gap-5">
          {admins?.map(({ id, username, password, isActive, type, avatar }) => {
            return (
              type === "user" && (
                <li key={id}>
                  <Card className="shadow-lg">
                    <CardHeader className="flex-row items-center gap-5">
                      <Avatar>
                        <AvatarImage src={avatar} alt={username} />
                        <AvatarFallback className="text-xl font-semibold uppercase">
                          {username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle>{username}</CardTitle>
                    </CardHeader>
                    <CardContent className='ml-5'>
                      {password.split("").map(() => "*")}
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full justify-end gap-3">
                        <TooltipProvider delayDuration="0">
                          <Tooltip>
                            <TooltipTrigger onClick={() => handleEdit(id)}>
                              <span
                                type="button"
                                className={`${buttonVariants({ variant: "secondary", size: "icon" })}`}
                              >
                                <Pencil1Icon />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Tahrirlash</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration="0">
                          <Tooltip>
                            <TooltipTrigger onClick={() => handleDelete(id)}>
                              <span
                                type="button"
                                className={`${buttonVariants({ variant: "destructive", size: "icon" })}`}
                              >
                                <TrashIcon />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>O'chirish</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration="0">
                          <Tooltip>
                            <TooltipTrigger onClick={() => handleDelete(id)}>
                              <span
                                type="button"
                                className={`${buttonVariants({ variant: "outline", size: "icon" })}`}
                              >
                                {isActive ? (
                                  <LockOpen2Icon />
                                ) : (
                                  <LockClosedIcon />
                                )}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{isActive ? "Block" : "Unblock"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardFooter>
                  </Card>
                </li>
              )
            );
          })}
        </ul>
      </div>
      <EditAdmin editedAdmin={editedAdmin} setAdmins={setAdmins} />
    </>
  );
}
