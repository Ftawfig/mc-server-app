import Link from 'next/link';  

export default function Footer() {
    return (
        <footer>
            <span>Fadi Tawfig</span>
            <span><Link href='/info'>Project Info</Link></span>
            <span><a href='https://porfolio.faditawfig.com'>Portfolio</a></span>
        </footer>
    );
}