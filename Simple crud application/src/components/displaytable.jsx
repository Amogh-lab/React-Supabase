import React from 'react';
import './displaytable.css'

const DisplayTable = ({ users, deleteUser, displayUser }) => {
 return (
  <div>
   <table>
     <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Action</th>
      </tr>
     </thead>
    <tbody>
     {users.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>{user.gender}</td>
        <td>
           <button onClick={() => deleteUser(user.id)}>Delete</button>
           <button onClick={() => displayUser(user.id)}>Edit</button>
        </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
  );
};

export default DisplayTable;