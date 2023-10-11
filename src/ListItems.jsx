import React from 'react'
import LineItems from './LineItems'
const ListItems = ({items, setItems, handleCheck, handleDelete}) => {
  return (
<ul>
            { items.map((item)=>(
                <LineItems 
                key={item.id}
                item = {item}
                items = {items}
                setItems = {setItems}
                handleCheck = {handleCheck}
                handleDelete = {handleDelete}
                />
            ))
            }
</ul>

  )
}

export default ListItems