import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Welcome to the WDD Portal.</h1>
            <Link href="student">For students</Link>
            <Link href="ta">For TAs</Link>
        </div>
    );
}
