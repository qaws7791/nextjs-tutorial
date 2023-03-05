
import CatEvent from "@/src/components/events/catEvent";

export const dynamicParams = false;

const Page = async ({params}) => {
    const {post, pageName} = await  getPost(params);
    return <CatEvent post={post} pageName={pageName} />;
};

export default Page;

export async function generateStaticParams() {
    const {events_categories} = await import('/data/data.json');
    const allPaths = events_categories.map(ev => {
        return {
            cat: ev.id.toString(),
        }
    })

    return allPaths
}

export async function getPost(params) {
    const cat = params?.cat;
    const {allEvents} = await import('/data/data.json');
    const data = allEvents.filter(ev => ev.city === cat);
    return {post: data,pageName: cat};
}