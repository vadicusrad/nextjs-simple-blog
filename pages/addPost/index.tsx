import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { postType } from '../../types/types';
import Form from '../components/Form';

const AddPost = () => {
    const router = useRouter();
    // const [newPost, setNewPost] = useState({
    //     title: '',
    //     author: '',
    //     text: '',
    // });

    async function handleSendData(newPost: postType) {
        const { title, author, text } = newPost;
        try {
            const response = await fetch('/api/addPost', {
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

            router.push(`/posts/${post.insertedId}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Form propsFunction={handleSendData} />
        // <form
        //     onSubmit={(e) => handleSendData(e, newPost)}
        //     className='text-black flex flex-col gap-4 my-20'
        // >
        //     <div className='flex space-x-4'>
        //         <input
        //             type='text'
        //             placeholder='Title'
        //             name='Заголовок'
        //             value={newPost.title}
        //             required
        //             onChange={(e) =>
        //                 setNewPost({ ...newPost, title: e.target.value })
        //             }
        //             className='rounded-sm pl-2'
        //         />
        //         <input
        //             type='text'
        //             placeholder='Автор'
        //             name='author'
        //             value={newPost.author}
        //             required
        //             onChange={(e) =>
        //                 setNewPost({ ...newPost, author: e.target.value })
        //             }
        //             className='rounded-sm pl-2'
        //         />
        //     </div>

        //     <textarea
        //         placeholder='Текст поста'
        //         name='text'
        //         value={newPost.text}
        //         required
        //         onChange={(e) =>
        //             setNewPost({ ...newPost, text: e.target.value })
        //         }
        //         className='h-60 rounded-sm pl-2'
        //     />
        //     <input
        //         className='border text-white p-2 rounded-sm hover:bg-amber-500 hover:text-black hover:border-black'
        //         type='submit'
        //     />
        // </form>
    );
};

export default AddPost;
