import Link from 'next/link';

import styles from './StyledButton.module.css';

type StyledButtonProps = {
    is_button: boolean;
    href?: string;
    onClick?: () => void;
    text: string;
};

export default function StyledButton(props: StyledButtonProps) {
    if (!props.is_button && !props.href) {
        throw new Error('StyledButton must have either href or onClick');
    }
    return props.is_button ? (
        <button className={styles.button} onClick={props.onClick}>
            {props.text}
        </button>
    ) : (
        <Link className={styles.button} href={props.href!}>
            {props.text}
        </Link>
    );
}
