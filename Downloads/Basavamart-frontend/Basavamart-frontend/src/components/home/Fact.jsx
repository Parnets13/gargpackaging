import React from 'react'
import { fact } from '../../data/Data'

const Fact = () => {
    return (
        <div className='mt-10 mx-4 p-10 text-center rounded-lg sm:mx-20 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4' style={{backgroundColor: '#f4f6f8 '}}>
            {fact.map((fact) => {
                return (
                    <div className="bg-white rounded-lg p-4 shadow-sm" key={fact.id}>
                    <span className="text-3xl text-orange-500">{fact.icon}</span>
                    <h2 className="text-lg uppercase font-semibold my-2 text-black-800">{fact.name}</h2>
                    <p className="text-xl font-semibold text-gray-700">{fact.num}</p>
                  </div>
                )
            })}
        </div>
    )
}

export default Fact
