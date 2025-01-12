import React from 'react'

const introsection = () => {
  return (
    <div >      
    <h1 className='mt-3 text-6xl font-extrabold font-mono text-green-300 uppercase tracking-widest'>
      C R U D</h1>
      <h1 className="mt-10 text-3xl font-bold align-middle">
        Simple CRUD Application
      </h1>
      <p className="mt-3 text-gray-300 align-middle font-medium text-lg">
      This is a simple, user-friendly application that allows you to efficiently 
      manage user data with CRUD operations—Create, Read, Update, and Delete. 
      It provides an intuitive interface to add new users, view and edit existing 
      information, and delete records, all with real-time updates to ensure seamless 
      data management        
      </p>
      <p className='mt-5 text-gray-300 align-middle text-2xl font-bold'>Features</p>
      <ul className='mt-2 text-gray-300 align-middle text-xl'>
        <li type="disc">Create</li>
        <li type="disc">Read</li>
        <li type="disc">Update</li>
        <li type="disc">Delete</li>
      </ul>
    </div>
  )
}

export default introsection