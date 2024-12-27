import React, {useState, useEffect} from 'react'
import { supabase } from './createClient'
import './App.css'

const App = () => {

  const [users, setusers] = useState([]);

  const [user, setuser] = useState({ 
      name: '', age:'' , gender:'' 
    })
    console.log(user);

    useEffect(()=> {
      fetchUsers()
    }, [])

  async function fetchUsers() {
    const {data} = await supabase
    .from('users')
    .select('*')
     setusers(data)
  }

  function handleChange(event){
    setuser(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function createUser() {
    await supabase
    .from('users')
    .insert({ name: user.name, age: user.age, gender: user.gender})
  }

  return (
    <div>
  <div>
      <form onSubmit={createUser}>
        <input type="text" placeholder='Name' name='name' onChange={handleChange}/>
        <input type="number" placeholder='Age' name='age' onChange={handleChange} min="0"/>
        <input type="text" placeholder='Gender(Male/Female/other)' name='gender' onChange={handleChange}/>
        <button type='submit'>Create</button>
      </form>
      </div>

      <div>
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
        </thead>
        <tbody>
      {
        users.map((user)=>
          <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.gender}</td>
        </tr>
      )} 
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default App