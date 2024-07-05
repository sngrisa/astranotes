import React, { useEffect, useState } from "react";
import "./listLayout.scss";
import TrelloList from "../trelloList";
import ModalTrelloList from "../modalTrelloList/modalTrelloList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ListProject } from "../../interfaces/trelloList.interface";


const ListLayout = ({listToDo , setListToDo }:{listToDo: ListProject[], setListToDo: any}) => {

    let [idDelete, setIddelete] = useState<number>(0);

    let onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(listToDo);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setListToDo(items);
    }

    let deleteList = () => {
        const updatedListToDo = listToDo.filter(list => list.id != idDelete);
        setListToDo(updatedListToDo);
    }

    useEffect(() => {
        deleteList();
    }, [idDelete])

    return (
        <>
            <section className="mb-14">
                <ModalTrelloList setListToDo={setListToDo} listToDo={listToDo} />
            </section>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided: any, snapshot: any) => (
                        <ul className="lists-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {provided.placeholder}
                            {
                                listToDo.map((listToDoItem: any, index: number) => {
                                    return (
                                        <Draggable key={listToDoItem.id} draggableId={listToDoItem.id.toString()} index={index}>
                                            {(provided) => (<TrelloList key={listToDoItem.id} provided={provided} list={listToDoItem} idDelete={idDelete} setDeleteId={setIddelete} />)}
                                        </Draggable>)
                                    { provided.placeholder }
                                }
                                )
                            }
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default ListLayout;