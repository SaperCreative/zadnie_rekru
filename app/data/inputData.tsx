"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function InputData() {
    const [countValue, setCountValue] = useState('');
    const router = useRouter();

    const setParams = (event: React.FormEvent) => {
        event.preventDefault();
        if(Number(countValue) <= 100){
            const encodedParams = encodeURI(countValue);
            router.push(`?ammount=${encodedParams}`)
        }
    }

    return (
        <form onSubmit={setParams}>
            <input
                className='flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:placeholder:text-stone-400 dark:focus-visible:ring-stone-300'
                value={countValue}
                onChange={(event) => setCountValue(event?.target.value)}
                placeholder='Ilość'
            />
        </form>
    )
}
