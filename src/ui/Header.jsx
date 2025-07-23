import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';
function Header() {
    return (
        <header className='bg-yellow-500 uppercase px-4 py-3 justify-between flex items-center sm:px-6'>
            <Link to="/" className='tracking-widest '>
                Fast React Pizza Co.
            </Link>
            <SearchOrder/>
            <UserName/>
        </header>
    );
}

export default Header;
