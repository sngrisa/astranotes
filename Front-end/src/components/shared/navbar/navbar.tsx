import React, { useEffect, useState } from 'react';
import "./navbar.scss";
import { FaFlipboard } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { FaStickyNote } from "react-icons/fa";
import { Project } from '../../interfaces/navbarItem.interface';
import ItemBoard from './itemBoard/ItemBoard';

const Navbar = () => {

    let titleApp: string = "Astra Notes";

    let menuItem: string = "Boards";

    let getCompilation = (): string =>{
        let getMonth = new Date().toLocaleString('default', {month: 'long'});
        return `${String(getMonth.substring(0,1)).toUpperCase()+ String(getMonth.substring(1))} ${new Date().getFullYear()}`;
    }

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [projects, setProjects] = useState<Project[]>([]);

    const setProjectBuilder = (titleProject: any): void => {
        const newId: number | string = id + 1;
        const newTitle: string = String(titleProject).substring(0,1).toUpperCase()+String(titleProject).substring(1);
        const urlTitle: string = String(titleProject).replace(".", "");
        const newProject: Project = { id: newId, title: newTitle, type: false, favourite: false, url: `/${urlTitle}`, list:[] };
        setId(newId);
        setTitle(newTitle);
        projects.push(newProject);
        saveArrayProjects();
    };

    const aboutPage = (): void => {
        Swal.fire({
            icon: "info",
            title: "Astra Notes",
            text: `Version 1.0 (Compilación ${getCompilation()})`,
            footer: `<b>(c) ${new Date().getFullYear()} Cactus Soft. Todos los derechos reservados </b>`,
            background: "black",
            width: "700px",
            color: "whitesmoke",
            confirmButtonColor: "#006199",
            confirmButtonText: "OK"
        });
    };

    const createBoard = (event: any): void => {
        event.preventDefault();
        Swal.fire({
            title: `Add new board`,
            input: "text",
            background: "black",
            color: "whitesmoke",
            width: 600,
            inputAttributes: {
                autocapitalize: "off",
                autocomplete: "off",
                placeholder: "Input the name of new board"
            },
            cancelButtonColor: "red",
            confirmButtonColor: "green",
            showCancelButton: true,
            confirmButtonText: "Add board",
            cancelButtonText: "Close",
            preConfirm: (event) => setProjectBuilder(event)
        });
    };

    let saveArrayProjects = (): void =>{
        localStorage.setItem('Projects', JSON.stringify(projects));
    }

    let getArrayProjects = (): void =>{
        setProjects(JSON.parse(localStorage.getItem('Projects') || ''));
    }
 
    useEffect(() => {
        getArrayProjects();
    }, []);

    return (
        <>
            <header className="masthead">
                <div className="boards-menu">
                    <details className="dropdown board-search">
                        <summary className="btn m-1"><span className='boards-btn-icon'><FaFlipboard /></span>{menuItem}</summary>
                        <ul className="menu dropdown-content bg-slate-900 rounded-box z-[1] w-52 p-2 shadow">
                            {
                                projects.map((projectItem, idx) => {
                                    return (<ItemBoard key={idx} itemBoard={projectItem} />)
                                })
                            }
                        </ul>
                    </details>
                </div>
                <div className="logo">
                    <h1 onClick={aboutPage}><span className='logo-icon mt-2' aria-hidden="true"><FaStickyNote /></span>{titleApp}</h1>
                </div>
                <div className="user-settings">
                    <button className="user-settings-btn btn" aria-label="Create" onClick={createBoard}>
                        <span aria-hidden="true" id='iconButtonMenu'><IoMdAdd /></span>
                    </button>
                    <button className="user-settings-btn btn" aria-label="About" onClick={aboutPage}>
                        <span aria-hidden="true" id='iconButtonMenu'><FaInfoCircle /></span>
                    </button>
                </div>
            </header>
        </>
    );
};

export default Navbar;

