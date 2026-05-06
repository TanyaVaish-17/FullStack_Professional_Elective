import Link from "next/link";
export default function About(){
    return(
        <>
        <h1>About page</h1>
        <p>This page is about us page.</p>
        <Link href='/'>Home</Link>
        </>
    );
}