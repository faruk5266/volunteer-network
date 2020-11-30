import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Footer from '../components/Footer/Footer';
import HistoryEvents from '../components/HistoryEvents/HistoryEvents';
import NavbarCompo from '../components/NavbarCompo/NavbarCompo';

const History = () => {
    const [user] = useContext(UserContext);
    const [event, setEvent] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/getAllRegEvents?email=${user.email}`)
        .then(res => res.json())
        .then( data => setEvent(data))
    },[user.email]);

    const handleCancel = (id) => {
        fetch('http://localhost:5000/deleteEventReg'+id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                const newEvents = event.filter(event => event._id !== id);
                setEvent(newEvents);
            }
        })
    };
    return (
        <>
         <NavbarCompo />
         <HistoryEvents handleCancel={handleCancel} event={event}/>
         <Footer />
        </>
    );
};

export default History;