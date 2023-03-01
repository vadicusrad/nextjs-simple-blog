import React, { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type layoutProps = {
    children: ReactNode;
};

const Layout: FC<layoutProps> = ({ children }) => {
    return (
        <div className='flex flex-col justify-between items-center min-h-screen h-fit bg-black text-white box-border'>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
