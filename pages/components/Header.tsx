import { FC } from 'react';
import Navbar from './Navbar';

const Header: FC = () => {
    return (
        <header className='h-16 bg-slate-800 flex justify-between px-10 items-center'>
            <Navbar />
        </header>
    );
};

export default Header;
