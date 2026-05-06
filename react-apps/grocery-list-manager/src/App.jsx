import { use, useState } from "react";

export default function App() {
  const [items,setItems]=useState([]);
  const [inputValue,setInputValue]=useState("");
  const [error,setError]=useState("");

  const addItem=()=>{
    const trimmed=inputValue.trim();
    if (!trimmed){
      setError("List cannot be empty");
      return;
    };
    const duplicate=items.find((item)=>item.name.toLowerCase()===trimmed.toLowerCase());
    if (duplicate){
      setError("Duplicate items not allowed");
      return;
    }
    setItems([...items,{id:Date.now,name:trimmed,purchased:false}]);
    setInputValue("");
    setError("");
  };

  const deleteItem=(id)=>{
    setItems(items.filter((item)=>item.id!==id));
  };

  const togglePurchased=(id)=>{
    setItems(items.map((item)=>item.id===id?{...item,purchased:!item.purchased}:item));
  }

  return (
    <div>
      <h1>Grocery List Manager</h1>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter item name"
      />
      <button onClick={addItem}>Add Item</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>{item.purchased ? "Purchased" : "Not Purchased"}</span>
            <button onClick={() => togglePurchased(item.id)}>
              {item.purchased ? "Mark Not Purchased" : "Mark Purchased"}
            </button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}