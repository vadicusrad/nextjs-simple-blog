import Head from 'next/head';
import { FC } from 'react';
import { postType } from '../../types';
import { useRouter } from 'next/router';

type postInfoProps = {
    post: postType;
};

const Post: FC<postInfoProps> = ({ post }) => {
    const router = useRouter();
    const { title, body } = post || {};

    if (!post) {
        return <h1>Empty post</h1>;
    }
    return (
        <div>
            <Head>
                <title>Post | {title}</title>
            </Head>
            <h1 className='font-bold'>{title}</h1>
            <p>{body}</p>
            <button onClick={() => router.back()}>go back</button>
        </div>
    );
};

export default Post;

export const getStaticPaths = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    const paths = data.map(({ id }) => ({
        params: { id: id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const { id } = context.params;

    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post: data,
        },
    };
};
