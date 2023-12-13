import Link from "next/link";

export default function About() {
    return (
        <div>
            About
            <Link className='text-blue-400 mx-2' href={"/"}>Home</Link>
        </div>
    )
}
