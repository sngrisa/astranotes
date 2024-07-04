import React, { useState } from 'react'
import { Project } from '../../../../interfaces/navbarItem.interface';
import { RiAlignItemHorizontalCenterFill } from "react-icons/ri";
import "./ItemBoard.scss";

const ItemBoard = ({ itemBoard }: { itemBoard: Project }) => {

    return (
        <>
            <li className='itemBoard'><a href={itemBoard.url}><span><RiAlignItemHorizontalCenterFill /></span>{itemBoard.title}</a></li>
        </>
    )
}

export default ItemBoard