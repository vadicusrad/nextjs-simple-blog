import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import clientPromise from '../../lib/mongodb';
import { postType } from '../../types/types';

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
            <h1 className='font-semibold text-3xl mb-6'>Посты</h1>

            <ul className=''>
                {posts &&
                    posts.map(({ _id, title, text, author }) => (
                        <li
                            key={_id}
                            className='w-full h-40 border border-sky-500 mb-6 p-4 rounded-sm'
                        >
                            <Link href={`/posts/${_id}`}>
                                <h2 className='font-semibold text-2xl mb-4 hover:text-amber-500 duration-300'>
                                    {title}
                                </h2>
                                {/* createdAt.toLocaleDateString() */}
                            </Link>
                            <p className=''>{text}</p>
                        </li>
                    ))}
            </ul>
            <button
                className='border p-2 hover:color-orange-500'
                onClick={() => router.push('/')}
            >
                go to main
            </button>
        </div>
    );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const client = await clientPromise;
        const db = client.db('node-blog');

        const posts = await db
            .collection('posts')
            .find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .toArray();

        return {
            props: { posts: JSON.parse(JSON.stringify(posts)) },
        };
    } catch (e) {
        console.error(e);
    }
};
