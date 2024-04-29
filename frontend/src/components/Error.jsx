import React from 'react'

const Error = ({message}) => {
    console.log(message);
  return (
    <div className=' mt-[300px] text-center text-2xl'>
        <p>Uzgunuz islem basarisiz</p>
        <p className=' bg-red-800 text-white mt-5'>{message}</p>
    </div>
  )
}

export default Error