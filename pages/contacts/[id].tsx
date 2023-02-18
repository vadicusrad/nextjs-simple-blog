import Head from 'next/head';
import React, { FC } from 'react';
import ContactInfo from '../components/ContactInfo';
import { GetServerSideProps } from 'next';
import { contactType } from '../../types';
import { useRouter } from 'next/router';

type contactTypeProps = {
    contact: contactType;
};

const Contact: FC<contactTypeProps> = ({ contact }) => {
    const router = useRouter();
    return (
        <div className=''>
            <Head>
                <title>Contact</title>
            </Head>
            <ContactInfo contact={contact} />
            <button onClick={() => router.back()}>go back</button>
        </div>
    );
};

export default Contact;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params;
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        };
    }
    return {
        props: { contact: data }, // will be passed to the page component as props
    };
};
