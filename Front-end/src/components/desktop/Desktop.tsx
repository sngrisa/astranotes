import React, { useEffect, useState } from 'react';
import ListLayout from '../trelloList/listLayout/listLayout';
import InfoBar from '../infoBar/infoBar';
import { Project } from '../interfaces/navbarItem.interface';
import { useParams } from 'react-router';
import { ListProject } from '../interfaces/trelloList.interface';

const Desktop = () => {

    const { listLayoutTitle } = useParams<any>();

    const listProjects = Array.from(JSON.parse(localStorage.getItem('Projects') || ''));

    const [list, setList] = useState<ListProject[]>([]);

    const [project, setProject] = useState<Project>({
        favourite: false,
        type: false,
        url: `/${listLayoutTitle}`,
        title: (listLayoutTitle == undefined) ? "Default List" : `${String(listLayoutTitle).substring(0, 1).toUpperCase() + String(listLayoutTitle).substring(1)}`,
        list: [] as ListProject[]
    });

    useEffect(() => {
        project.list = list;
    }, [list]);

    let saveProject = () =>{
        let getProjectPosition = listProjects.findIndex((resp: any)=> resp.title === listLayoutTitle);
        console.log(getProjectPosition);
    }

    useEffect(()=> {saveProject()},[project])

    return (
        <>
            <InfoBar projectDefaultProps={project} projectSaved={project} setSavedProject={setProject} />
            <ListLayout listToDo={list} setListToDo={setList} />
        </>
    );
}

export default Desktop;