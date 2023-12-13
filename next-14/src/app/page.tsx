import Link from 'next/link'
import {appStore} from "@/stores";

export default function Home() {
    return (
        <div>Home
            <Link className='text-blue-400 mx-2' href={"/about"}>About</Link>
            <div>
                Rooms: {appStore.room.items?.map((room: any) => room.id).join(', ')}
            </div>
        </div>
    )
}
