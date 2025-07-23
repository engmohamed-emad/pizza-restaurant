import React, { useState } from 'react';
import { useNavigate} from 'react-router';

function SearchOrder () {
    const [query,setQuery]=useState('');
    const navigate= useNavigate();
    function handleSubmit(e)
    {
        e.preventDefault();
        if(!query) return;
        navigate(`order/${query}`);
        setQuery("");
        console.log('Searching for order:', query);

    }
    return (
        <form onSubmit={handleSubmit}>
            <input className='rounded-full px-4 py-2 text-sm bg-yellow-100 w-28 focus:w-72 focus:outline-none focus:ring-yellow-100 sm:w-64 transition-all duration-300' placeholder='Search for order' value={query} onChange={(e)=>setQuery(e.target.value)} />
        </form>
    );
}



export default SearchOrder;
