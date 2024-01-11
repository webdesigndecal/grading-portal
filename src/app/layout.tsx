import './globals.css';
import { Karla } from 'next/font/google';

const karla = Karla({ subsets: ['latin'] });

export const metadata = {
    title: 'Web Design Decal Portal',
    description:
        "The portal for UC Berkeley's Web Design Decal. Made for students and TAs in the class.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={karla.className}>{children}</body>
        </html>
    );
}
