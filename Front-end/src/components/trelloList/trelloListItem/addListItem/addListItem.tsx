import React, { useState } from 'react';
import "./addListItem.scss";
import { MdAssignmentAdd } from "react-icons/md";
import { RiSlideshowFill } from "react-icons/ri";

const AddListItem = ({ setTask, task }: { setTask: any, task: any }) => {

    let [id, setId] = useState(0);

    const setTaskTerm = (event: any) => {
        event.preventDefault();
        const inputText = event.target[0].value;

        if (inputText.length >= 3) {
            const newId = id + 1;
            setId(newId);
            setTask((prevTask: any) => ({
                ...prevTask,
                id: newId,
                termTask: String(inputText).substring(0, 1).toUpperCase() + String(inputText).substring(1)
            }));
            event.target[0].value = "";
            setShowInput(!showInput);
        }
    }

    let [showInput, setShowInput] = useState(false);

    return (
        <>
            <button onClick={() => setShowInput(!showInput)} className='add-menu-btn btn'><span className='iconMenuBtnAdd'><RiSlideshowFill /></span>Add task</button>
            {
                showInput &&
                <form autoComplete='off' onSubmit={setTaskTerm} >
                    <input className='inputTask' placeholder='Input the task' minLength={3} required />
                    <button className="add-task-btn btn" type='submit'><span className='icon-add-task'><MdAssignmentAdd /></span>Add a task to List</button>
                </form>
            }
        </>
    )
}

export default AddListItem;