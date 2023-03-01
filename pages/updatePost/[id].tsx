import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import clientPromise from '../../lib/mongodb';
import { postType } from '../../types/types';
import Form from '../components/Form';

const AddPost = ({ post }) => {
    const router = useRouter();

    async function handleUpdateData(newPost: postType) {
        const { title, author, text, _id } = newPost;
        console.log('handleUpdateData ', _id, typeof _id);

        try {
            const response = await fetch(`/api/updatePost?id=${_id}`, {
                method: 'POST',
                body: JSON.stringify({ title, author, text }),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw response;
            }

            const post = await response.json();

            router.push(`/posts/${_id}`);
        } catch (err) {
            console.log(err);
        }
    }

    return <Form propsFunction={handleUpdateData} post={post} />;
};

export default AddPost;

export const getServerSideProps = async (context: {
    params: { id: string | number | ObjectId | Uint8Array };
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
