import React from 'react';
import { Link } from 'react-router';
function Button({children ,disabled, to, type, onClick}) {
    const base= "bg-yellow-400 font-semibold uppercase text-stone-700 p-3.5 inline-block rounded-full hover:bg-yellow-300 cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200 active:bg-yellow-500 transition-colors duration-200 ease-in-out ";

    const styles={
        primary:base + "px-4 py-3 md:px-6 md:py-4",
        small:base + "px-4 py-2 md:px-5 md:py-2.5",
        round: base + "px-4 py-2 rounded-full text-xl",
        secondary:"bg-stone-100 border border-stone-400 font-semibold uppercase text-stone-700 p-3.5 inline-block rounded-full hover:bg-stone-300 cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200 active:bg-stone-500 transition-colors duration-200 ease-in-out px-4 py-3 md:px-6 md:py-4",
    }
    if(to)
    {
        return(
            <Link className={styles[type]} to={to}>{children}</Link>
        )
    }if(onClick)
    {
        return (
            <button className={styles[type]} disabled={disabled} onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <button className={styles[type]} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;
