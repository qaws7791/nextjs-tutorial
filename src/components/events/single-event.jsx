'use client';
import React, { useState,useRef } from 'react';
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

const SingleEvent = ({event, params }) => {
    const inputEmail = useRef();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        const emailValue = inputEmail.current.value;
        const eventId = params.id;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if(!emailValue.match(validRegex)) {
            setMessage('Please iwntroduce a correct email address');
        }


        try {
            const response = await fetch('/api/email-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: emailValue, eventId: eventId})
            })

            if(!response.ok) throw new Error(`ERROR: ${response.status}`);
            const data = await response.json();
            console.log('POST',data);
            setMessage(data.response)

        } catch (e) {
            console.log('ERROR',e)
        }

    }
    return (
        <div className='event_single_page'>
            <Image src={event.image} width={1000} height={500} alt={event.title}/>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <form onSubmit={onSubmit} className='email_registration'>
                <label>Get Registered for this event!</label>
                <input ref={inputEmail} type='email' id='email' placeholder='Please insert your email here'/>
                <button type='submit'>Submit</button>
            </form>
            <p>{message}</p>

        </div>
    );
};

export default SingleEvent;