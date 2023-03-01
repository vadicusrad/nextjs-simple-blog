import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const navigation = [
    { id: 1, title: 'Главная', path: '/' },
    { id: 2, title: 'Посты', path: '/posts' },
    { id: 3, title: 'Контакты', path: '/contacts' },
    { id: 4, title: 'Добавить пост', path: '/addPost' },
];

const Navbar: FC = () => {
    const { pathname } = useRouter();

    return (
        <>
            <h1 className='text-2xl text-amber-500 '>Архео</h1>
            <div className='flex space-x-8'>
                {navigation.map(({ id, title, path }) => (
                    <Link
                        key={id}
                        href={path}
                        className={pathname === path ? 'text-red-500' : null}
                    >
                        {title}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Navbar;
