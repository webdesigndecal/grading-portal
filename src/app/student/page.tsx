'use client';

import Link from 'next/link';

export default function StudentIndex() {
    // TODO: Remove this code.
    // const [content, setContent] = useState<string>('');
    // const url =
    //     'https://wpzuqgaybxkuorqkinwk.supabase.co/storage/v1/object/public/submissions/3036584708/hw1/index.html';
    // useEffect(() => {
    //     fetch(url)
    //         .then((res) => res.text())
    //         .then((res) => setContent(res));
    //     console.log(content);
    // });
    return (
        <div>
            <h1>Student Index</h1>
            <Link href="/student/submit">Submit Assignment</Link>
            <Link href="/student/assignments">Assignments</Link>
            {/* <iframe src={'data:text/html;charset=utf-8,' + content}></iframe> */}
        </div>
    );
}
