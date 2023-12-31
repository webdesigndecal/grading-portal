import { getSubmissionFileFromPath } from '@/api/submissions';
import { Metadata } from 'next';
import { parse } from 'node-html-parser';

export async function generateMetadata({
    params,
}: {
    params: { path: string[] };
}) {
    const fullPath = params.path.join('/');
    const contentText = await getSubmissionFileFromPath(fullPath);
    const root = parse(contentText);
    const head = root.querySelector('head');

    let metadata: Metadata = {};

    // for (const child of head!.childNodes) {
    //     if (child instanceof HTMLElement) {
    //         switch (child.tagName) {
    //             case 'TITLE':
    //                 metadata.title = child.innerText;
    //                 break;
    //             case 'LINK':
    //                 if (child.getAttribute('rel') === 'stylesheet') {
    //                     const something = await import(
    //                         child.getAttribute('href')!
    //                     );
    //                 }
    //         }
    //     }
    // }
}

export default async function ContentPage({
    params,
}: {
    params: { path: string[] };
}) {
    console.log(
        'SLKAJFALKSJFDLAKSJDLAJSDLASJDLAKSDJLAKSDJKLASDJALSKDJKLASDJLAKSJDLKAJ'
    );
    const fullPath = params.path.join('/');
    const contentText = await getSubmissionFileFromPath(fullPath);

    const root = parse(contentText);
    // console.log(root.toString());
    const head = root.querySelector('head');
    const body = root.querySelector('body');

    // console.log(head?.childNodes);
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: body!.toString() }}></div>
        </>
    );
}
