import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {Authentication} from "../Components/Authentication";
import Header from "../Components/Header";


function StartPage() {
    return (
        <>
            <Header></Header>
          <Authentication></Authentication> 
        </>
    )
}

export default StartPage;