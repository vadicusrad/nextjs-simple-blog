import clientPromise from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('API UPDATE POST');
    try {
        const client = await clientPromise;
        const db = client.db('node-blog');
        const { title, text, author } = req.body;
        const { id } = req.query as unknown as ObjectId;
        const post = await db.collection('posts').updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    title,
                    text,
                    author,
                },
            }
        );

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
