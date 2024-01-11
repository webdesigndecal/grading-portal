import StyledButton from '@/components/StyledButton/StyledButton';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Welcome to the WDD Portal.</h1>
            <div className={styles.buttonContainer}>
                <StyledButton
                    is_button={false}
                    href="student"
                    text="For students"
                />
                <StyledButton is_button={false} href="ta" text="For TAs" />
            </div>
        </div>
    );
}
