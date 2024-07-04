import React, { useState } from 'react';
import "./trelloListItem.scss";
import { MdDeleteSweep } from "react-icons/md";

const TrelloListItem = ({ listItem, provided, idDeleteItem, setIdDeleteItem }: { listItem: any, provided: any, idDeleteItem: any, setIdDeleteItem: any }) => {

    let [termTask, setTermTask] = useState<string>(listItem.termTask);

    let setTerm = (event: any) => {
        event?.preventDefault();
        setTermTask(String(event?.target.value).substring(0, 1).toUpperCase() + String(event?.target.value).substring(1));
    }

    return (
        <>
            <li ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <section>
                    <input type='text' className='textContent contentCard' value={termTask} onChange={setTerm} />
                    <span className='deleteItem' onClick={() => setIdDeleteItem(listItem.id.toString())}><MdDeleteSweep /></span>
                </section>

            </li>
        </>
    )
}

export default TrelloListItem;
