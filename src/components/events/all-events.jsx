import Link from "next/link";
import Image from "next/image";

const AllEvents = ({data}) => {
    return (
        <div className='events_page'>
            {data.map(ev => (
                <Link key={ev.id} href={`/events/${ev.id}`} passHref>
                    <Image src={ev.image} alt="image" width={300} height={300}/>
                    <h2>{ev.title}</h2>
                </Link>
            ))}
        </div>
    )
}
export default  AllEvents;