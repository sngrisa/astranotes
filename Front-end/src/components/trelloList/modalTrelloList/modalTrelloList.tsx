import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import "./modalTrelloList.scss";

const ModalTrelloList = ({ listToDo, setListToDo }: { listToDo: any, setListToDo: any }) => {

    let [id, setId] = useState<number>(0);

    let addNewList = (input: string) => {
        setId(id + 1);
        setListToDo(() => [...listToDo, { id: id, title: capitalize(input), items: [] }]);
    }

    let capitalize = (str: string): string => {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    let openModal = (): void => {
        Swal.fire({
            title: "Input the name of the new list",
            input: "text",
            inputAttributes: {
                autocapitalize: "true"
            },
            customClass: {
                confirmButton: "btn btn-confirm",
                cancelButton: "btn btn-cancel"
            },
            width: 700,
            showCancelButton: true,
            confirmButtonText: `Create a List`,
            cancelButtonText: `Cancel`,
            showLoaderOnConfirm: true,
            background: "black",
            color: "whitesmoke",
            preConfirm: (titleList) => addNewList(titleList),
        })
    }

    return (
        <>
            <button className="btn btn-addList" onClick={openModal}><span className='icon-add-task'><IoAddCircle /></span>Add new list</button>
        </>
    )
}

export default ModalTrelloList;