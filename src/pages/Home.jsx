import { useEffect, useState } from "react";
import { useAppStore } from "../lib/zustand";
import { collectItem, findObj, getFormData, limit } from "../lib/my-utils";
import { deleteFlower, getFlowers, refreshToken } from "../request";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusIcon,
  SymbolIcon,
  UpdateIcon,
  GridIcon,
  TrashIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { Button, buttonVariants } from "../components/ui/button";
import AddNewItemModal from "../components/AddNewItemModal";
import { MyPagination } from "../components/MyPagination";
import FiltersByCategory from "../components/FiltersByCategory";
import FiltersByCountry from "../components/FiltersByCountry";
import FiltersByColor from "../components/FiltersByColor";
import EditFlower from "../components/EditFlower";

export default function Home() {
  const [editing, setEditing] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [deletedLoadin, setDeletedLoading] = useState(false);
  const [sendingData, setSendingData] = useState(null);
  const [enableToFilter, setEnableToFilter] = useState(true);
  const [isFiltered, setIsFiltered] = useState(null);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const flowers = useAppStore((state) => state.flowers);
  const setFlowers = useAppStore((state) => state.setFlowers);
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);
  const setEditModal = useAppStore((state) => state.setEditModal);

  const reset = () => {
    setIsFiltered(null);
    setEnableToFilter(true);
  };

  const handleEnableToFilter = () => {
    setEnableToFilter(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    setIsFiltered(result);
  };
  //Get
  useEffect(() => {
    setLoading(true);
    getFlowers(admin?.access_token, { skip, limit }, isFiltered)
      .then(({ data, total }) => {
        setTotal(total);
        setFlowers(data);
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
      .finally(() => setLoading(false));
  }, [admin, skip, isFiltered, sendingData, deletedData, editing]);

  const handleEdit = (id) => {
    setEditModal();
    // console.log(id, flowers);
    const result = findObj(flowers, id);
    setEditedData(result);
    // console.log(result);
  };

  const handleDelete = (id) => {
    console.log(id);
    const checker = confirm("Gulni ro'yhattan o'chirmoqchimisiz?");

    checker && setDeletedData(id);
  };
  //Delete
  useEffect(() => {
    if (deletedData) {
      console.log(deletedData);

      setDeletedLoading(true);
      deleteFlower(admin?.access_token, deletedData)
        .then((res) => {
          toast.dismiss();
          toast.success(res);
          setDeletedData(null);
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
        .finally(() => setDeletedLoading(false));
    }
  }, [deletedData, admin]);

  return (
    <div className="flex h-full w-full">
      <div className="w-full">
        <div className="mb-5">
          <div className="flex w-full items-center justify-between border-b py-5">
            <h2 className="h2">Boshqaruv paneli</h2>
            <Button disabled={!flowers} onClick={setAddItemModal}>
              Qo'shish
              <PlusIcon className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="mb-5">
          {flowers && (
            <form onSubmit={handleFilter}>
              <div className="mb-5 flex w-full items-end gap-5">
                <FiltersByColor
                  colors={collectItem(flowers, "color")}
                  handleEnableToFilter={handleEnableToFilter}
                />
                <FiltersByCategory
                  categories={collectItem(flowers, "category")}
                  handleEnableToFilter={handleEnableToFilter}
                />
                <FiltersByCountry
                  countries={collectItem(flowers, "country")}
                  handleEnableToFilter={handleEnableToFilter}
                />
              </div>

              <div className="mb-10 flex items-center justify-end gap-2">
                <Button
                  variant={"outline"}
                  onClick={reset}
                  type="reset"
                  disabled={enableToFilter}
                >
                  Tozalash <SymbolIcon className="ml-2" />
                </Button>
                <Button type="submit" disabled={enableToFilter}>
                  Saralash <GridIcon className="ml-2" />
                </Button>
              </div>
            </form>
          )}
          <div className="max-h-72 w-full overflow-y-scroll">
            <Table>
              {flowers && (
                <TableCaption className="mb-5">
                  {flowers.length === 0
                    ? "Ma'lumot mavjud emas"
                    : " Gullar haqida ma'lumot."}
                </TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead>Gul Nomi</TableHead>
                  <TableHead>Turkumi</TableHead>
                  <TableHead>Rangi</TableHead>
                  <TableHead className="text-right">Narxi</TableHead>
                  <TableHead className="text-right">Harakatlar</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {flowers?.map(({ name, id, category, color, price }) => {
                  return (
                    <TableRow key={id}>
                      <TableCell className="font-medium">{id}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{category}</TableCell>
                      <TableCell>
                        {" "}
                        <span
                          style={{ backgroundColor: color }}
                          className="block h-5 w-5 rounded-full border"
                        ></span>
                      </TableCell>
                      <TableCell className="text-right">{price} so'm</TableCell>
                      <TableCell className="flex items-center justify-end gap-2 text-right">
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
                            <TooltipTrigger
                              className={
                                deletedData &&
                                deletedData === id &&
                                deletedLoadin
                                  ? "pointer-events-none opacity-50"
                                  : ""
                              }
                              onClick={() => handleDelete(id)}
                            >
                              <span
                                type="button"
                                className={`${buttonVariants({ variant: "destructive", size: "icon" })}`}
                              >
                                {deletedData &&
                                deletedData === id &&
                                deletedData ? (
                                  <UpdateIcon className="animate-spin" />
                                ) : (
                                  <TrashIcon />
                                )}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>O'chirish</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {flowers && (
              <MyPagination
                setSkip={setSkip}
                total={total}
                skip={skip}
                pageCount={Math.ceil(total / limit)}
              />
            )}
          </div>

          {loading && (
            <div className="mt-60 flex w-full items-center justify-center gap-3 font-bold">
              <UpdateIcon className="animate-spin" />
              <h3>Yuklanmoqda...</h3>
            </div>
          )}
        </div>
      </div>

      <AddNewItemModal
        sendingData={sendingData}
        setSendingData={setSendingData}
      />
      {editedData && (
        <EditFlower
          editedData={editedData}
          setEditing={setEditing}
          editing={editing}
        />
      )}
    </div>
  );
}
