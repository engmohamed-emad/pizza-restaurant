import React from 'react';
import { useSelector } from 'react-redux';
function UserName() {
    const username = useSelector((state) => state.user.username);
    return (
        <div className='hidden md:block text-sm'>
            {username}
        </div>
    );
}

export default UserName;
