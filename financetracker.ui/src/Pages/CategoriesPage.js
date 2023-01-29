import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import api from "../api";
import Header from "../Components/Header";
import Container from "react-bootstrap/Container";
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {faTrash, faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function CategoriesPage() {
    const [userData, setUserData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

    const [modalType, setModalType] = useState('')
    const [modalData, setModalData] = useState('');
    const [modalDataCategory, setModalDataCategory] = useState('')
    const [categoryAddType, setCategoryAddType] = useState('')

    const incomeFields = userData.filter((item) => {
        return item.categoryType === 'Income'
    });

    const expensesFields = userData.filter((item) => {
        return item.categoryType === 'Expenses'
    });

    useEffect(() => {
        api.post('Categories', {
                username: localStorage.getItem("username")
            }
        ).then(r =>
            // console.log(r.data)
            setUserData(r.data)
        )
    }, [])


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function saveChanges() {
        // console.log(modalType)

        if (modalType === 'Edit') {
            // console.log(modalDataCategory)
            // console.log('edit')

            api.put('Categories', {
                    username: localStorage.getItem("username"),
                    oldValue: modalData,
                    newValue: modalDataCategory
                }
            ).then(r =>
                // console.log(r.data)
                setUserData(r.data)
            )

        } else if (modalType === 'Delete') {
            // console.log('delete')
            api.post('Categories/delete', {
                    username: localStorage.getItem("username"),
                    categoryName: modalData,
                }
            ).then(r =>
                // console.log(r.data)
                setUserData(r.data)
            )
        } else if (modalType === 'Add') {

            api.post('Categories/create', {
                    username: localStorage.getItem("username"),
                    categoryName: modalDataCategory,
                    categoryType: categoryAddType
                }
            ).then(r =>
                // console.log(r.data)
                setUserData(r.data)
            )

        }

        setModalDataCategory('');
        // setModalType('');
        setIsOpen(false);
    }


    function closeModal() {
        setIsOpen(false);
    }

    function editHandler(props) {
        // console.log(props)

        setModalData(props)
        setModalType('Edit')
        openModal()
    }

    function deleteHandler(props) {
        // console.log(props)

        setModalData(props)
        setModalDataCategory(props)
        setModalType('Delete')
        openModal()
    }

    function addExpenseHandler() {
        setCategoryAddType('Expenses')
        setModalType('Add')
        openModal()
    }

    function addIncomeHandler() {
        setCategoryAddType('Income')
        setModalType('Add')
        openModal()
    }

    return (
        <>
            {modalType === 'Add' ?

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >

                    <div className="d-flex flex-column">

                        <div className="text-center m-auto">
                            Add category of {categoryAddType} type
                        </div>
                        <input
                            type="text"
                            placeholder="Name"
                            // defaultValue={modalData}
                            // value={modalDataCategory}
                            onChange={(e) => {
                                setModalDataCategory(e.target.value)
                            }}
                        />

                        <Button
                            className="mt-2"
                            onClick={saveChanges}
                        >
                            Save changes
                        </Button>
                        <Button
                            className="mt-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>

                </Modal>
                :
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >
                    {
                        modalType !== 'Delete'

                            ?
                            <div className="d-flex flex-column">
                                <input
                                    type="text"
                                    defaultValue={modalData}
                                    // value={modalDataCategory}
                                    onChange={(e) => {
                                        setModalDataCategory(e.target.value)
                                    }}

                                />

                                <Button
                                    className="mt-2"
                                    onClick={saveChanges}
                                >
                                    Save changes
                                </Button>
                                <Button
                                    className="mt-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>

                            : <div className="d-flex flex-column">

                                <div>Do you want to delete this category?</div>
                                <div className="m-auto">{modalData}</div>
                                <Button
                                    className="mt-2"
                                    onClick={saveChanges}
                                >
                                    Yes
                                </Button>
                                <Button
                                    className="mt-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>

                    }
                </Modal>
            }


            <Header></Header>
            <Container className="mt-5 w-75">
                <Row>
                    <Col className="square me-2 rounded-4 border border-2 border-success">

                        <div className="d-flex h-100 flex-row">
                            <div className="d-flex flex-fill align-items-center">
                                <h4 className="m-0 w-100 text-center">Income</h4>
                            </div>

                            <div onClick={addIncomeHandler}
                                 className="d-flex ps-3 w-25 align-items-center border-start border-success">
                                <h4 className="m-1 w-100 text-center">+</h4>
                            </div>
                        </div>
                    </Col>

                    <Col className="square me-2  rounded-4 border border-2 border-warning">

                        <div className="d-flex h-100 flex-row">
                            <div className="d-flex flex-fill align-items-center">
                                <h4 className="m-0 w-100 text-center">Expenses</h4>
                            </div>

                            <div onClick={addExpenseHandler}
                                 className="d-flex ps-3 w-25 align-items-center border-start border-warning">
                                <h4 className="m-1 w-100 text-center">+</h4>
                            </div>
                        </div>
                    </Col>
                </Row>


                <Row style={{height: 45}} className="mt-2">

                    <Col style={{height: 45}} className="square me-2 border-0 bg-transparent">
                        {incomeFields.map(
                            c => (
                                <div key={c.id} className="d-flex h-100 flex-row">
                                    <div className="d-flex w-75 align-items-center text-center">
                                        <h5 className="w-100 m-0">
                                            {c.categoryName}
                                        </h5>
                                    </div>

                                    <div className="d-flex flex-fill align-items-center text-center">
                                        <p className="w-50 m-0">
                                            <FontAwesomeIcon onClick={() => editHandler(c.categoryName)
                                            } icon={faPen}/>
                                        </p>
                                        <p className="w-50 m-0">
                                            <FontAwesomeIcon onClick={() => deleteHandler(c.categoryName)
                                            } icon={faTrash}/>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </Col>

                    <Col style={{height: 45}} className="square me-2 border-0 bg-transparent">
                        {expensesFields.map(
                            c => (
                                <div key={c.id} className="d-flex h-100 flex-row">
                                    <div className="d-flex w-75 align-items-center text-center">
                                        <h5 className="w-100 m-0">
                                            {c.categoryName}
                                        </h5>
                                    </div>

                                    <div className="d-flex flex-fill align-items-center text-center">
                                        <p className="w-50 m-0">
                                            <FontAwesomeIcon onClick={() => editHandler(c.categoryName)
                                            } icon={faPen}/>
                                        </p>
                                        <p className="w-50 m-0">
                                            <FontAwesomeIcon onClick={() => deleteHandler(c.categoryName)
                                            } icon={faTrash}/>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CategoriesPage;

{/*<div className="d-flex h-100 flex-row">*/
}
{/*    <div className="d-flex w-75 align-items-center text-center">*/
}
{/*        <h6 className="w-100 m-0">*/
}
{/*            category*/
}
{/*        </h6>*/
}
{/*    </div>*/
}

{/*    <div className="d-flex flex-fill align-items-center text-center">*/
}
{/*        <p className="w-50 m-0">*/
}
{/*            <FontAwesomeIcon icon={faPen} />*/
}
{/*        </p>*/
}
{/*        <p className="w-50 m-0">*/
}
{/*            <FontAwesomeIcon icon={faTrash} />*/
}
{/*        </p>*/
}
{/*    </div>*/
}
{/*</div>*/
}