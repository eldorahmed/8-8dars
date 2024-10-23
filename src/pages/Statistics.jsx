import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { collectStatsData, myTranslation, neededStatisticsReport } from "../lib/my-utils";
import { MyBarChart } from "../components/MyBarChart";
import { useEffect, useState } from "react";
import { MyPieChart } from "../components/MyPieChart";
import { useAppStore } from "../lib/zustand";
export default function Statistics() {
  const [type, setType] = useState("bar");
  const [value, setValue] = useState("country");
  const flowers =useAppStore((state)=>state.flowers)
  const [stats,setStats]=useState(null)
  console.log(stats)
  useEffect(()=>{
if(flowers){
  setStats(()=>{
    return collectStatsData(flowers,value)
  })
}
  },[flowers,value])
  return (
    <div>
      <h2 className="mb-10 border-b-2 text-4xl font-semibold">Statistics</h2>
      <div className="mb-10 flex gap-5">
        <div>
          <Label htmlFor="type">Turni tanlang</Label>
          <Select
            value={type}
            onValueChange={(value) => setType(value)}
            id="type"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Turni tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar chart</SelectItem>
              <SelectItem value="pie">Pie chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="theme">Mavzuni tanlang</Label>
          <Select value={value} onValueChange={(value)=>setValue(value)} id="theme">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mavzuni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {neededStatisticsReport.map((el) => {
                return (
                  <SelectItem key={el} value={el}>
                    {myTranslation(el)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      {type === "bar" && <MyBarChart chartData={stats} />}
      {type === "pie" && <MyPieChart chartData={stats} />}
    </div>
  );
}
