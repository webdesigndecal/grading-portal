import StyledButton from '@/components/StyledButton/StyledButton';
import styles from './page.module.css';

export default function StudentIndex() {
    return (
        <div className={styles.container}>
            <h1>Welcome to WDD.</h1>
            <StyledButton
                is_button={false}
                href="/student/submit"
                text="Submit Assignment"
            />
            <StyledButton
                is_button={false}
                href="/student/assignments"
                text="Assignments"
            />
        </div>
    );
}
