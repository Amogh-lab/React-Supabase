import React from 'react';

const UserForm = ({ handleChange, createUser }) => {
  return (
    <form onSubmit={createUser} className="gap-4 bg-slate-600 p-6 shadow rounded-md flex flex-col sm:flex-row">
      <input 
        type="text" 
        placeholder="Name" 
        name="name" 
        onChange={handleChange} 
        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto" 
      />
      <input 
        type="number" 
        placeholder="Age" 
        name="age" 
        onChange={handleChange} 
        min="0" 
        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto" 
      />
      <input 
        type="text" 
        placeholder="Gender (Male/Female/Other)" 
        name="gender" 
        onChange={handleChange} 
        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto" 
      />
      <button 
        type="submit" 
        className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 transition"
      >
        Create
      </button>
    </form>
  );
};

export default UserForm;
