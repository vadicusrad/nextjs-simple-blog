import Head from 'next/head';
import { FC } from 'react';
import { postType } from '../../types/types';
import { useRouter } from 'next/router';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { ObjectIdLike } from 'bson';

type postInfoProps = {
    post: postType;
};

const Post: FC<postInfoProps> = ({ post }) => {
    const router = useRouter();

    const { title, text, author, updatedAt, _id } = post || {};
    if (!post) {
        return <h1>Empty post</h1>;
    }
    async function handleDeletePost(
        e: React.MouseEvent<HTMLElement>,
        id: number
    ) {
        console.log('handleDeletePost');
        e.preventDefault();
        try {
            const response = await fetch(`/api/deletePost?id=${id}`, {
                method: 'DELETE',
                // body: JSON.stringify(id),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw response;
            }

            const post = await response.json();

            router.push(`/posts`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col justify-start items-start'>
            <Head>
                <title>Пост | {title}</title>
            </Head>
            <h1 className='font-bold text-5xl mb-6'>{title}</h1>
            <h2 className='font-semibold text-2xl mb-6'>Автор: {author}</h2>
            <p className='text-xl mb-6'>{text}</p>
            <div className='flex gap-4'>
                <button
                    className='border p-2 hover:color-orange-500'
                    onClick={() => router.back()}
                >
                    Назад
                </button>
                <button
                    className='border p-2 hover:color-orange-500'
                    onClick={(e) => handleDeletePost(e, _id)}
                >
                    Удалить пост
                </button>
                <Link
                    href={`/updatePost/${_id}`}
                    className='border p-2 hover:color-orange-500'
                >
                    Обновить пост
                </Link>
            </div>
        </div>
    );
};

export default Post;

export const getServerSideProps = async (context: {
    params: { id: string | number | ObjectId | ObjectIdLike | Uint8Array };
}) => {
    let id = new ObjectId(context.params.id);
    try {
        const client = await clientPromise;
        const db = client.db('node-blog');

        const post = await db.collection('posts').findOne({
            _id: id,
        });

        return {
            props: { post: JSON.parse(JSON.stringify(post)) },
        };
    } catch (e) {
        console.error(e);
    }
};

// так тоже работает. Но какая разница?

// export const getStaticPaths = async () => {
//     try {
//         const client = await clientPromise;
//         const db = client.db('node-blog');

//         const posts = await db
//             .collection('posts')
//             .find({})
//             .sort({ createdAt: -1 })
//             .limit(10)
//             .toArray();

//         const newPaths = [];
//         posts.map((post) => {
//             newPaths.push({ params: { id: post._id.toString() } });
//         });
//         return {
//             paths: newPaths,
//             fallback: false,
//         };
//     } catch (e) {
//         console.error('Уупс! ', e);
//     }
// };

// export const getStaticProps = async (context) => {
//     let id = new ObjectId(context.params.id);

//     try {
//         const client = await clientPromise;
//         const db = client.db('node-blog');

//         const post = await db.collection('posts').findOne({
//             _id: id,
//         });

//         return {
//             props: { post: JSON.parse(JSON.stringify(post)) },
//         };
//     } catch (e) {
//         console.error(e);
//     }
// };
