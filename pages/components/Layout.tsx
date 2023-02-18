import React, { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type layoutProps = {
    children: ReactNode;
};

const Layout: FC<layoutProps> = ({ children }) => {
    return (
        <div className='flex flex-col justify-between min-h-screen h-fit bg-black text-white'>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
