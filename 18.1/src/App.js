import User from './components/User/User';
import axios from "axios";
import React, {useState,useEffect} from 'react';
import './App.css';

function App() {

  const [users,setUsersArr] = useState([]);
  const [inputName,setInputName] =useState("");
  const [inputImg,setInputImg] =useState("");

  const getData = async()=>{
    try{
      const res = await axios.get(`https://6374a46048dfab73a4e470dd.mockapi.io/users`);
      
      console.log("api",res);
      return res;

    }
    catch{
      console.log("ERROR: Failed to load data!");
    }

  }

  useEffect(() =>{
    getData().then((res) => {
      setUsersArr(res.data);
    });

  },[])

  const createUser = async() => {
    //const id =
    const user = { name : inputName , img : inputImg};
    try {
      const res = await axios.post(`https://6374a46048dfab73a4e470dd.mockapi.io/users`,user);
      console.log("added user",res);
      setUsersArr((prev) => [...prev,res.data]);
    }
    catch {
      console.log("Error");
    }
  }


  const displayUsers = () => {
    console.log(users);
    return users.map((user) => {
      return(
        <User
        key={user.id}
        id ={user.id}
        name = {user.name}
        img ={user.img}
        update ={handleUpdate}
        delete ={handleDelete}

      />)
    })

  }

  const handleUpdate =(text,id) => {
    const user=users.find((user) => user.id===id);
    const editUser = {...user,name:text};
    setUsersArr(users.map((user) => {
      return user.id===id ? editUser:user;
    }))


  }
  const handleDelete = async(userId) => {
    try{
      const res = await axios.delete(`https://6374a46048dfab73a4e470dd.mockapi.io/users/${userId}`);
      const filterUsers = users.filter((user) => {
        return user.id !== userId;
      })
      setUsersArr(filterUsers);
      console.log("user deleted",res);
    }

    catch(e){
      console.log("ERROR!");
    }

  }
  const handleNameChange = (event) => {
    setInputName(event.target.value);

  }
  const handleImgChange = (event)=>{
    setInputImg(event.target.value);
  }

  return (
    <div className='app'>
      
      <div className='input-container'>
        <label>Name</label>
        <input
          type="text"
          onChange={handleNameChange}
          value={inputName}
          name = "input name"
        ></input>
        <label>Image</label>
        <input
          type="text"
          onChange = {handleImgChange}
          value={inputImg}
          name="input img"
        ></input>
        <button onClick={createUser} className="btn">Add User</button>

      </div>
      <div className='users-display'>
        {displayUsers()}
       
      </div>
      

      

    </div>
   
  );
}

export default App;
