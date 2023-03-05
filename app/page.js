
import { Inter } from "next/font/google";
import {HomePage} from "@/src/components/home/home-page";
import path from "path";
import fsPromises from "fs/promises";


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
  const filePath = path.join(process.cwd(),'data', 'data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  const { events_categories } = objectData;
  return {
    data: events_categories,
  };
}
