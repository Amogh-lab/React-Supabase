import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import './App.css';
import DisplayTable from './components/displaytable';

const App = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    Item_name: '',
    Category: '',
    Quantity: '',
    price: '',
    Supplier: '',
    Expiry_date: '',
  });

  const [itemToEdit, setItemToEdit] = useState({
    id: '',
    Item_name: '',
    Category: '',
    Quantity: '',
    price: '',
    Supplier: '',
    Expiry_date: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase.from('grocery').select('*');
    console.log(data); // Log the data to check if it contains all the fields
    setItems(data);
  }

  function handleChange(event) {
    setItem((prevItem) => ({
      ...prevItem,
      [event.target.name]: event.target.value,
    }));
  }

  function handleEditChange(event) {
    setItemToEdit((prevItem) => ({
      ...prevItem,
      [event.target.name]: event.target.value,
    }));
  }

  async function createItem() {
    await supabase.from('grocery').insert({
      item_name: item.Item_name,
      category: item.Category,
      quantity: item.Quantity,
      price: item.price,
      supplier: item.Supplier,
      expiry_date: item.Expiry_date,
    });
    fetchItems();
  }

  async function deleteItem(itemID) {
    await supabase.from('grocery').delete().eq('id', itemID);
    fetchItems();
  }

  function displayItem(itemID) {
    const item = items.find((item) => item.id === itemID);
    if (item) {
      setItemToEdit({ ...item });
      setIsEditing(true);
    }
  }

  async function updateItem(itemID) {
    await supabase
      .from('grocery')
      .update({
        item_name: itemToEdit.Item_name,
        category: itemToEdit.Category,
        quantity: itemToEdit.Quantity,
        price: itemToEdit.price,
        supplier: itemToEdit.Supplier,
        expiry_date: itemToEdit.Expiry_date,
      })
      .eq('id', itemID);
    fetchItems();
    setIsEditing(false);
  }

  function closeEditForm() {
    setIsEditing(false);
  }

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createItem();
          }}
        >
          <input type="text" placeholder="Item Name" name="Item_name" onChange={handleChange} required />
          <input type="text" placeholder="Category" name="Category" onChange={handleChange} required />
          <input type="number" placeholder="Quantity" name="Quantity" onChange={handleChange} min="0" required />
          <input type="number" placeholder="Price" name="price" onChange={handleChange} step="0.01" required />
          <input type="text" placeholder="Supplier" name="Supplier" onChange={handleChange} required />
          <input type="date" placeholder="Expiry Date" name="Expiry_date" onChange={handleChange} required />
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div>
        <DisplayTable items={items} deleteItem={deleteItem} displayItem={displayItem} />
      </div>

      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateItem(itemToEdit.id);
          }}
        >
          <input type="text" defaultValue={itemToEdit.Item_name} name="item_name" onChange={handleEditChange} required />
          <input type="text" defaultValue={itemToEdit.Category} name="category" onChange={handleEditChange} required />
          <input type="number" defaultValue={itemToEdit.Quantity} name="quantity" onChange={handleEditChange} min="0" required />
          <input type="number" defaultValue={itemToEdit.price} name="price" onChange={handleEditChange} step="0.01" required />
          <input type="text" defaultValue={itemToEdit.Supplier} name="supplier" onChange={handleEditChange} required />
          <input type="date" defaultValue={itemToEdit.Expiry_date} name="expiry_date" onChange={handleEditChange} required />
          <button type="submit">Update</button>
          <button type="button" onClick={closeEditForm}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default App;