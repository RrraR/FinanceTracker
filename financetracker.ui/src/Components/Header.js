import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

import { faFolderClosed, faArrowRightArrowLeft , faChartSimple, faCalendar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    const username = localStorage.getItem("username");
    
    
    function logOutHandler() {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        window.location = '/'
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => {
                    username === null 
                        ? window.location = "/" 
                        : window.location = "../tracker"
                }}>Finance Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Nav.Link href="#/">All categories</Nav.Link>*/}
                        <NavDropdown hidden={username === null}
                            title="Navigation" 
                            id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => {
                                window.location = "../categories"
                            }}>
                                <FontAwesomeIcon icon={faFolderClosed} />
                                &nbsp; Categories
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {
                                window.location = "../transactions"
                            }}>
                                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                                &nbsp; Transactions
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {
                                window.location = "../scheduledPayments"
                            }}>
                                <FontAwesomeIcon icon={faCalendar} />
                                &nbsp; Scheduled Payments
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => {
                                window.location = "../tracker"
                            }}>
                                <FontAwesomeIcon icon={faChartSimple} />
                                &nbsp;Statistics
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav className="justify-content-end">
                        
                        {/*{username === 'admin' */}
                        {/*    ? <Link to={`/adminPage`} className="btn btn-primary">Admin Panel</Link>*/}
                        {/*    : <></>*/}
                        {/*}*/}
                        
                        {/*<Nav.Link href="#/">*/}
                        {/*    /!*<Link to={'/cart'}>*!/*/}
                        {/*    Cart{' '}*/}
                        {/*    {props.countCartItems ? (*/}
                        {/*        <button className="badge">{props.countCartItems}</button>) : ''}*/}
                        {/*    /!*</Link>*!/*/}
                        {/*</Nav.Link>*/}

                        {username === null
                            ? (<Nav.Link 
                                onClick={() => {window.location = ".."}}
                            >Log in</Nav.Link>)
                            : (
                                <NavDropdown title={localStorage.getItem("username")} >
                                    <NavDropdown.Item onClick={logOutHandler}>
                                        Log Out
                                    </NavDropdown.Item>
                                    {/*<NavDropdown.Item onClick={() => {*/}
                                    {/*    window.location = "../orderHistory"*/}
                                    {/*}}>*/}
                                    {/*    Order History*/}
                                    {/*</NavDropdown.Item>*/}
                                </NavDropdown>)
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}