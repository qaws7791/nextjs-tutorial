
import CatEvent from "@/src/components/events/catEvent";
import fsPromises from 'fs/promises';
import path from 'path';

export const dynamicParams = false;

const Page = async ({params}) => {
    const {post, pageName} = await  getPost(params);
    return <CatEvent post={post} pageName={pageName} />;
};

export default Page;

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(),'data', 'data.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const { events_categories } = objectData;
    const allPaths = events_categories.map(ev => {
        return {
            cat: ev.id.toString(),
        }
    })

    return allPaths
}

export async function getPost(params) {
    const filePath = path.join(process.cwd(),'data', 'data.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const cat = params?.cat;
    const { allEvents } = objectData;
    const data = allEvents.filter(ev => ev.city === cat);
    return {post: data,pageName: cat};
}