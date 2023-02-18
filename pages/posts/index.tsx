import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { postType } from '../../types';

type postsTypeProps = {
    posts: postType[];
};

const Posts: FC<postsTypeProps> = ({ posts }) => {
    const router = useRouter();
    return (
        <div className='py-10'>
            <Head>
                <title>Posts</title>
            </Head>
            <h1 className='font-bold'>Post list</h1>
            <ul>
                {posts &&
                    posts.map(({ id, title }) => (
                        <li key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                        </li>
                    ))}
            </ul>
            <button onClick={() => router.push('/')}>go to main</button>
        </div>
    );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            posts: data,
        },
    };
};
