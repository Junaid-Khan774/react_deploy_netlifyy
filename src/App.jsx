import Header from './Header';
import SearchItem from './SearchItem';
import AddItems from './AddItems';
import Content from './Content';
import Footer from './Footer';
import ApiRequest from './ApiRequest';
import { useState, useEffect } from 'react';
import { FaInstagram } from 'react-icons/fa';
function App() {
  const API_URL = 'http://localhost:3000/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expeceted data');
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000)

  }, [])

  const SetAndSaveItems = (newItem) => {
    setItems(newItem);
    localStorage.setItem('Shoppinglist', JSON.stringify(newItem));
  }

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    SetAndSaveItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await ApiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    SetAndSaveItems(listItems);

    const myItem = listItems.filter((item)=>item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    SetAndSaveItems(listItems);

    const myItem = listItems.filter((item)=>item.id === id);
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'        
      },
      body: JSON.stringify()
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiRequest(reqUrl, deleteOptions);
    if(result) setFetchError(result);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    //addItem
    addItem(newItem);
    setNewItem('');
    console.log('Submitted');

  }
  return (
    <div className='App'>
      <Header title="Groceries List" />
      <AddItems
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit} />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p>}
        {
          fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>
        }
        
        { !fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete} />
        }
      </main>
      <Footer length={items.length} />
    </div>
  )
}

export default App;
