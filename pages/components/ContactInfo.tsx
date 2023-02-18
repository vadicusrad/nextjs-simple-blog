import { FC } from 'react';
import { contactType } from '../../types';

type contactInfoProps = {
    contact: contactType;
};

const ContactInfo: FC<contactInfoProps> = ({ contact }) => {
    const { name, email, address } = contact || {};
    const { street, suite, city, zipcode } = address || {};

    if (!contact) {
        return <h1>Empty contact</h1>;
    }

    return (
        <div>
            <h1>{name}</h1>
            <div className=''>
                <strong>Email:</strong>
                {email}
            </div>
            <div className=''>
                <strong>Address:</strong>
                {`${street},${suite}, ${city}, ${zipcode}`}
            </div>
        </div>
    );
};

export default ContactInfo;
