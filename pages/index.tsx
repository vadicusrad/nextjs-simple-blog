import { GetStaticProps } from 'next';
import Head from 'next/head';
import { socialsType } from '../types/types';
import Socials from './components/Socials';

type homeProps = {
    socials: socialsType[];
};

export default function Home({ socials }: homeProps) {
    return (
        <div className='flex flex-col items-center justify-start'>
            <Head>
                <title>Главная</title>
            </Head>
            <h1 className='text-8xl mb-10'>Археостан</h1>
            {/* <Socials socials={socials} /> */}
        </div>
    );
}

// export const getStaticProps: GetStaticProps = async () => {
//     try {
//         const response = await fetch(`${process.env.API_HOST}/socials/`);
//         const data = await response.json();

//         if (!data) {
//             return {
//                 notFound: true,
//             };
//         }

//         return {
//             props: {
//                 socials: data,
//             },
//         };
//     } catch {
//         return {
//             props: {
//                 socials: null,
//             },
//         };
//     }
// };
