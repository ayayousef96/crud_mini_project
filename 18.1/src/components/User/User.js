import React,{useState,useEffect} from 'react';
import "./User.css";
import axios from "axios";


const User = (props) => {
    const [updateName,setUpdateName] =useState("");

    useEffect(()=>{
        setUpdateName(props.name)
    },[updateName]);


    const handleNewInput = (event) => {
        setUpdateName(event.target.value);
      };

    const handleDelete =()=>{
        props.delete(props.id);

    }
    const handleEdit = async() =>{
        
        const user = {id : props.id, name : updateName, img:props.img};
        try{
            const res = await axios.put(`https://6374a46048dfab73a4e470dd.mockapi.io/users${props.id}`,user);
            console.log("api update:", res);
            props.update(setUpdateName(user.name));
        }
        catch(e){
            console.log("ERROR : failed to edit");
        }



    }

    return (
        <div className='userCard'>

            <input value={updateName} onChange={handleNewInput}></input>
            <img src={props.img} alt="userimg" className='userimg'/>
            <button onClick={handleEdit} className='btn'>Edit</button>
            <button onClick={handleDelete} className='btn'>Delete</button>

            
        </div>
    );
}

export default User;
