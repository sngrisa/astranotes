import React from "react";
import { BrowserRouter as RouterList, Route, Routes } from "react-router-dom";
import ListLayout from "../components/trelloList/listLayout/listLayout";
import Desktop from "../components/desktop/Desktop";

let Router = () => {

    return (
        <>
            <RouterList>
                <Routes>
                    <Route path="/" element={<Desktop />} />
                    <Route path="/:listLayoutTitle" element={<Desktop />} />
                </Routes>
            </RouterList>
        </>
    );
}

export default Router;