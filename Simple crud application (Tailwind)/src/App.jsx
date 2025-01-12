import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import DisplayTable from './components/displaytable';
import UserForm from './components/UseForm';
import Introsection from'./components/introsection'
import Footer from './components/footer'

const App = () => {
  const [users, setusers] = useState([]);
  const [user, setuser] = useState({ name: '', age: '', gender: '' });
  const [user2, setUser2] = useState({ id: '', name: '', age: '', gender: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from('users').select('*');
    setusers(data);
  }

  function handleChange(event) {
    setuser((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleChange2(event) {
    setUser2((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  async function createUser(event) {
    event.preventDefault();
    await supabase.from('users').insert({
      name: user.name,
      age: user.age,
      gender: user.gender,
    });
    fetchUsers();
  }

  async function deleteUser(userID) {
    const { error } = await supabase.from('users').delete().eq('id', userID);
    fetchUsers();
    if (error) console.error(error);
  }

  function displayUser(userID) {
  users.forEach((user) => {
    if (user.id === userID) {
      setUser2({
        id: user.id,
        name: user.name,
        age: user.age,
        gender: user.gender,
      });
      setIsEditing(true);
    }
   });
  }

  async function updateUser(event, userID) {
    event.preventDefault();
    const { error } = await supabase
      .from('users')
      .update({
        name: user2.name,
        age: user2.age,
        gender: user2.gender,
      })
      .eq('id', userID);
    fetchUsers();
    if (error) console.error(error);
    setIsEditing(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-800 p-4">

    <div className="bg-slate-700 text-white p-6 rounded-md shadow flex flex-col items-center md:items-start">
      <Introsection/>
    </div>

    <div className="mt-3 flex flex-col gap-4 overflow-hidden flex-grow">
      <UserForm handleChange={handleChange} createUser={createUser} />

    <div className="mt-2">
       <DisplayTable 
        users={users} 
        deleteUser={deleteUser} 
        displayUser={displayUser} />
    </div>

    <div className='sm:flex-row'>
        {isEditing && (
        <form 
          onSubmit={(event) => updateUser(event, user2.id)} 
          className=" gap-4 bg-slate-600 p-6 shadow rounded-md flex flex-col sm:flex-row">
            <input 
              type="text" 
              defaultValue={user2.name} 
              name="name" 
              onChange={handleChange2} 
              className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input 
              type="number" 
              defaultValue={user2.age} 
              name="age" 
              onChange={handleChange2} 
              min="0" 
              className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input 
              type="text" 
              defaultValue={user2.gender} 
              name="gender" 
              onChange={handleChange2} 
              className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="flex gap-4">
                <button 
                  type="submit" 
                  className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 transition">
                  Update
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="bg-gray-600 text-white px-8 py-2 rounded hover:bg-gray-700 transition">
                  Cancel
                </button>
            </div>
       </form>
  )}
    </div>
  </div>

  <Footer />

 </div>
  );
};

export default App;
