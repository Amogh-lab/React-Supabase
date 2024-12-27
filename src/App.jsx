import React, {useState, useEffect} from 'react'
import { supabase } from './createClient'
import './App.css'
import DisplayTable from './components/displaytable';

const App = () => {

  const [users, setusers] = useState([]);
  const [user, setuser] = useState({name: '', age:'' , gender:'' })
  const [user2,setUser2]=useState({id:'',name:'',age:'',gender:''})
  const [isEditing, setIsEditing] = useState(false)

    useEffect(()=> { fetchUsers() }, [])

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

  function handleChange2(event){
    
    setUser2(prevFormData=>{
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

    fetchUsers()
  }

  async function deleteUser(userID) {
    const { data, error } = await supabase
     .from('users')
     .delete()
     .eq('id', userID)

     fetchUsers()

    if(error)
       console.log(error)
    if(data)
      console.log(data)
  }

  function displayUser(userID){

    users.map((user)=>{

        if(user.id==userID){
          setUser2({ id:user.id,name:user.name,age:user.age,gender:user.gender})
          console.log(user)
          setIsEditing(true);
        }
    })
   }

   async function updateUser(userID){

    const { data, error } = await supabase
      .from('users')
      .update({ id:user2.id,name:user2.name,age:user2.age,gender:user2.gender})
      .eq('id', userID)

      fetchUsers()

      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }
      setIsEditing(false);
   }

function closeEditForm() {
    setIsEditing(false);
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
           <DisplayTable users={users} deleteUser={deleteUser} displayUser={displayUser}/>
      </div>
      { isEditing && (
      <form onSubmit={()=>updateUser(user2.id)}>
        <input type="text" defaultValue={user2.name}  name='name' onChange={handleChange2}/><br/>
        <input type="number" defaultValue={user2.age} name='age' onChange={handleChange2} min="0"/>
        <input type="text" defaultValue={user2.gender}  name='gender' onChange={handleChange2}/>
        <button type='submit'>Update</button>
        <button type="button" onClick={closeEditForm}>Cancel</button>
      </form>
       )}      

    </div>
  )
}

export default App