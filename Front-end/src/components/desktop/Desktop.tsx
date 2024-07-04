import React, { useEffect, useState } from 'react'
import ListLayout from '../trelloList/listLayout/listLayout';
import InfoBar from '../infoBar/infoBar';
import { Project } from '../interfaces/navbarItem.interface';
import { useParams } from 'react-router';

const Desktop = () => {

    const { listLayoutTitle } = useParams();

    let [project, Setproject] = useState<Project>({
        favourite: false,
        type: false,
        url: `/${listLayoutTitle}`,
        title: (listLayoutTitle == undefined) ? "Default List" : `${String(listLayoutTitle).substring(0, 1).toUpperCase()+String(listLayoutTitle).substring(1)}`
    });

    useEffect(() => {}, [])
    return (
        <>
            <InfoBar projectDefaultProps={project} />
            <ListLayout />
        </>
    )
}

export default Desktop;