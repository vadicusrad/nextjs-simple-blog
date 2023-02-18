import Head from 'next/head';
import Link from 'next/link';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { contactType } from '../../types';
import { useRouter } from 'next/router';

type contactsTypeProps = {
    contacts: [contactType];
};

const Contacts: FC<contactsTypeProps> = ({ contacts }) => {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>Contacts</title>
            </Head>
            <h1>Contacts list</h1>
            <ul>
                {contacts.map(({ id, name, email }) => (
                    <li key={id}>
                        <Link href={`/contacts/${id}`}>
                            <strong>{name}</strong> ({email})
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={() => router.push('/')}>go to main</button>
        </div>
    );
};

export default Contacts;

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            contacts: data,
        },
    };
};
