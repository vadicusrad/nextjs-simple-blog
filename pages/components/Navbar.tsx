import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const navigation = [
    { id: 1, title: 'home', path: '/' },
    { id: 2, title: 'posts', path: '/posts' },
    { id: 3, title: 'contacts', path: '/contacts' },
];

const Navbar: FC = () => {
    const { pathname } = useRouter();

    return (
        <>
            <Image src='/logo.png' width={60} height={60} alt='logo' />
            <div className='flex space-x-4'>
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
