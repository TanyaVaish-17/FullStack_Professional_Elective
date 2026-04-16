import {useState} from 'react';
export default function Search(){
    const [find,setFind]=useState("");
    const name=["Tommy","Oreo","Jeeni","Kitoo"]
    const pet=name.filter((names)=>names.toLowerCase().includes(find.toLowerCase()))
    return(
        <>
        <h2>Search bar</h2>
        <input type="text" 
        placeholder='Enter key to search' 
        value={find} 
        onChange={(e)=>setFind(e.target.value)}></input>
        <ul>
            {pet.map((item,index)=>(<li key={index}>{item}</li>))}
        </ul>
        </>
    )
}