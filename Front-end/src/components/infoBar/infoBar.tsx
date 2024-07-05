import React, { useEffect, useState } from 'react';
import "./infoBar.scss";
import { PiStarThin } from "react-icons/pi";
import { MdPersonalInjury } from "react-icons/md";
import { RiChatPrivateFill } from "react-icons/ri";
import { IoStar } from "react-icons/io5";
import { Project } from '../interfaces/navbarItem.interface';



const InfoBar = ({ projectDefaultProps, projectSaved, setSavedProject }: { projectDefaultProps: Project, projectSaved: Project, setSavedProject: any}) => {

    const [project, setProject] = useState<Project>(projectDefaultProps);

    useEffect(() => {
        setProject(projectDefaultProps);
        
    }, [projectDefaultProps]);
        
    useEffect(()=>{setSavedProject(project)},[project])

    const setProjectTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        const titleProject = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
        setProject(prevProject => ({
            ...prevProject,
            title: titleProject,
            type: false,
            favourite: false,
        }));
    };

    const setFavourite = (event: any): void => {
        event.preventDefault();
        setProject(prevProject => ({
            ...prevProject,
            favourite: !prevProject.favourite
        }));
    };

    return (
        <section className="board-info-bar">
            <div className="board-controls">
                <button className="board-title btn">
                    <input onChange={setProjectTitle} value={project.title} className='layoutName' />
                </button>
                <button className="star-btn btn" aria-label="Star Board" onClick={setFavourite}>
                    {!project.favourite ? <PiStarThin /> : <IoStar />}
                </button>
                {!project.type ? (
                    <button className="personal-btn btn" onClick={() => setProject(prevProject => ({ ...prevProject, type: !prevProject.type }))}>
                        <MdPersonalInjury /> Personal
                    </button>
                ) : (
                    <button className="private-btn btn" onClick={() => setProject(prevProject => ({ ...prevProject, type: !prevProject.type }))}>
                        <RiChatPrivateFill /> Private
                    </button>
                )}
            </div>
        </section>
    );
};

export default InfoBar;
