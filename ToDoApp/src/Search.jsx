import {useState} from 'react';
export default function Search(){
    const [find,setFind]=useState("");
    const name=["Tommy","Oreo","Jeeni","Kitoo"]
    const pet=name.filter()
    return(
        <>
        <h2>Search bar</h2>
        <input type="text" 
        placeholder='Enter key to search' 
        value={find} 
        onChange={(e)=>setFind(e.target.value)}></input>
        <ul>
            {name.map((name, index) => (
            <li key={index}>{name}</li>
            ))}
        </ul>
        </>
    )
}