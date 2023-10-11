import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
const LineItems = ({items, item, setItems, handleCheck, handleDelete}) => {
  return (
    <li key={item.id}>
    <input type="checkbox" checked= {item.checked} onChange={()=>handleCheck(item.id)}/>
    <label onDoubleClick={()=>handleCheck(item.id)} style={(item.checked) ? {textDecoration:'line-through'} : null} >{item.item}</label>
    <button onClick={()=> handleDelete(item.id)}><FaTrashAlt /></button>
</li>
  )
}

export default LineItems;