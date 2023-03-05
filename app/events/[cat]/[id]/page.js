import SingleEvent from "@/src/components/events/single-event";
import path from "path";
import fsPromises from "fs/promises";

export const dynamicParams = false;
const EventPage = async ({params}) => {
    const event = await getEvent(params);
  return (
<SingleEvent event={event} params={params}/>
  );
};

export default EventPage;

export async  function generateStaticParams() {
    const filePath = path.join(process.cwd(),'data', 'data.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const  {allEvents} = objectData;

    const allPaths = allEvents.map(path => {
        return {
                cat: path.city,
                id: path.id
        }
    })

    return allPaths
}

export async  function  getEvent(params) {
    const filePath = path.join(process.cwd(),'data', 'data.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const {cat,id} = params;
    const {allEvents} = objectData;

    const eventData = allEvents.find(ev => ev.id === id);

    return eventData;
}
