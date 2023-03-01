import React, { useEffect, useState } from 'react';
import { postType } from '../../types/types';

interface IForm {
    propsFunction: any;
    post?: postType;
}

const Form = ({ propsFunction, post }: IForm) => {
    const [newPost, setNewPost] = useState({
        title: '',
        author: '',
        text: '',
    });

    useEffect(() => {
        if (post) {
            setNewPost(post);
        }
    }, []);

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        propsFunction(newPost);
    }

    return (
        <form
            onSubmit={(e) => handleFormSubmit(e)}
            className='text-black flex flex-col gap-4 my-20'
        >
            <div className='flex space-x-4'>
                <input
                    type='text'
                    placeholder='Title'
                    name='Заголовок'
                    value={newPost.title}
                    required
                    onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                    }
                    className='rounded-sm pl-2'
                />
                <input
                    type='text'
                    placeholder='Автор'
                    name='author'
                    value={newPost.author}
                    required
                    onChange={(e) =>
                        setNewPost({ ...newPost, author: e.target.value })
                    }
                    className='rounded-sm pl-2'
                />
            </div>

            <textarea
                placeholder='Текст поста'
                name='text'
                value={newPost.text}
                required
                onChange={(e) =>
                    setNewPost({ ...newPost, text: e.target.value })
                }
                className='h-60 rounded-sm pl-2'
            />
            <input
                className='border text-white p-2 rounded-sm hover:bg-amber-500 hover:text-black hover:border-black'
                type='submit'
            />
        </form>
    );
};

export default Form;
