
import { Inter } from "next/font/google";
import {HomePage} from "@/src/components/home/home-page";


const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const { data } = await getData();
  return (
    <>
      <HomePage data={data}/>
    </>
  );
}

export async function getData() {
  const { events_categories } = await import("../data/data.json");
  return {
    data: events_categories,
  };
}
