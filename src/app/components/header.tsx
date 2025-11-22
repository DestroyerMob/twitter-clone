import Link from "next/link";
import "../favicon.ico";


export default function Header() {
    return (
        <div className="header">
            <div>
                <Link href="/" style={{fontSize:25}}>Hooper</Link>
            </div>
            <div>
                <Link href="/inbox">Inbox</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/signup">Signup</Link>
                <Link href="/login">Login</Link>
            </div>
        </div>
    );
}