import React from 'react';
import ListItems from './ListItems';
const Content = ({items, item, setItems, handleCheck, handleDelete}) => {

return (
    <div>
        {
             items.length ? ( 
            <ListItems
            items = {items}
            setItems= {setItems}
            handleCheck= {handleCheck}
            handleDelete= {handleDelete}
            />
            ):
            (
                <h1>Your List is empty!</h1>
            )
        }
    </div>
  )
}

export default Content;