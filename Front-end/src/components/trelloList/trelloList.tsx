import { render } from "react-dom";
import React, { useEffect, useState } from 'react';
import "./trelloList.scss";
import TrelloListItem from './trelloListItem/trelloListItem';
import AddListItem from './trelloListItem/addListItem/addListItem';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { TrelloListItemElement } from "../interfaces/trelloList.interface";

const TrelloList = ({ list, provided, setDeleteId, idDelete }: { list: any, provided: any, setDeleteId: any, idDelete: any }) => {

    let [listDetails, setListDetails] = useState<TrelloListItemElement[]>([]);

    let [task, setTask] = useState<TrelloListItemElement>({ id: 0, termTask: "Tarea Predeterminada" });

    let [title, setTitle] = useState<string>(list?.title);

    let [idDeleteItem, setIdDeleteItem] = useState<number>(0);

    let setTitleTerm = (event: any): void => {
        event?.preventDefault();
        setTitle(String(event?.target.value).substring(0, 1).toUpperCase() + String(event?.target.value).substring(1));
    }

    let deleteListItem = () => {
        const updatedListDetails = listDetails.filter(list => list.id != idDeleteItem);
        setListDetails(updatedListDetails);
    }

    useEffect(() => {
        deleteListItem();
    }, [idDeleteItem]);

    useEffect(() => {
        if (listDetails.length <= 7) { setListDetails([...listDetails, task]) }
        else { setListDetails(listDetails.slice(1, 7)) }
    }, [task])

    let onDragEnd = (result: any) => {
        if (!result.destination) { return; }

        const items = Array.from(listDetails);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setListDetails(items);
    }

    return (
        <>
            <div className="list cursor-pointer"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <h3 className="list-title">
                    <input type="text" className="textContent contentCard" value={title} onChange={setTitleTerm} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            return setTitleTerm(e)
                        }
                    }} />
                    <button><span className='trelloListDeleteBtn' onClick={() => setDeleteId(list.id.toString())}><MdDelete /></span></button>
                </h3>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="vertical">
                        {(provided: any) => (
                            <ul className="list-items" {...provided.proppableProps} ref={provided.innerRef}>
                                {provided.placeholder}
                                {
                                    listDetails.map((listDetailItem: any, index: any) => {
                                        return (
                                            <Draggable index={index} draggableId={listDetailItem.id.toString()} key={listDetailItem.id}>
                                                {(provided: any) => (<TrelloListItem provided={provided} listItem={listDetailItem} key={listDetailItem.id} idDeleteItem={idDeleteItem} setIdDeleteItem={setIdDeleteItem} />)}
                                            </Draggable>
                                        )
                                    })
                                }
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className='text-center'>
                    <AddListItem setTask={setTask} task={task} />
                </div>
            </div>
        </>
    )
}

export default TrelloList;
