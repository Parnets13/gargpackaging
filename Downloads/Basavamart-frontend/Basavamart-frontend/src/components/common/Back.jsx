import React from 'react'
import { useLocation } from 'react-router-dom';

const Back = ({title}) => {
    const location = useLocation();
    return (
        <>
            <section className="back">
                <div className="overlay-back"></div>
                <h1  style={{color:'white'}}>{title}</h1>
                <h2 style={{color:'white'}}>Home / Pages / {location.pathname.split('/')[1]}</h2>
            </section>
            <div className="mb-5"></div>
        </>
    )
}

export default Back
