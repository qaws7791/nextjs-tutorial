import AllEvents from "@/src/components/events/all-events";
import path from "path";
import fsPromises from "fs/promises";

const EventsPage = async () => {
  const {data} = await getData();
  return (
<AllEvents data={data}/>
  );
};

export default EventsPage;

export async function getData() {
    const filePath = path.join(process.cwd(),'data', 'data.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const {events_categories} = objectData;
    return {
            data: events_categories,
    }
}
