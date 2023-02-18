import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ErrorPage = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 3000);
    }, [router]);

    return (
        <div className='text-white'>
            <Head>
                <title>Error</title>
            </Head>
            <h1>Error!</h1>
            <h1>
                Через 3 секунды вы будете перенаправлены на главную страницу
            </h1>
        </div>
    );
};

export default ErrorPage;
