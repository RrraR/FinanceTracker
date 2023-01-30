import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import api from "../api";
import Header from "../Components/Header";
import Container from "react-bootstrap/Container";
import {Button, Col, Row, Form} from "react-bootstrap";
import {faTrash, faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

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

function TransactionsPage() {
    
    const [userTransactionsData, setUserTransactionsData] = useState([]);
    const [userCategoriesData, setUserCategoriesData] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('')

    const [modalDataDate, setModalDataDate] = useState(new Date());
    const [modalDataAmount, setModalDataAmount] = useState('0');
    const [modalDataCategory, setModalDataCategory] = useState('');
    const [modalDataName, setModalDataName] = useState('');

    const dateToDisplay = moment.utc(modalDataDate, 'YYYY-MM-DD').toDate().toDateString();

    const [transactionToEdit, setTransactionToEdit] = useState([]);
    const [categoryAddType, setCategoryAddType] = useState('')

    const incomeTransactions = userTransactionsData.filter((item) => {
        return item.categoryType === 'Income'
    });

    const expensesTransactions = userTransactionsData.filter((item) => {
        return item.categoryType === 'Expenses'
    });

    const incomeCategories = userCategoriesData.filter((item) => {
        return item.categoryType === 'Income'
    });

    const expensesCategories = userCategoriesData.filter((item) => {
        return item.categoryType === 'Expenses'
    });

    useEffect(() => {
        api.post('Transactions', {
                username: localStorage.getItem("username")
            }
        ).then(function (r) {
                // console.log(r.data)

                // const myDate = moment.utc(response.data.startDate, 'YYYY-MM-DD').toDate();

                setUserTransactionsData(r.data)
            }
        )

        api.post('Categories', {
                username: localStorage.getItem("username")
            }
        ).then(r =>
            // console.log(r.data)
            setUserCategoriesData(r.data)
        )

    }, [])


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function saveChanges() {
        // console.log(modalType)

        if (modalType === 'Edit') {
            // console.log('edit')
            // console.log(modalDataCategory)
            // console.log(modalDataAmount)
            // console.log(modalDataDate)
            // console.log(transactionToEdit)


            api.put('Transactions', {
                    username: localStorage.getItem("username"),
                    oldName: transactionToEdit[0].name,
                    newName: modalDataName,
                    oldCategory: transactionToEdit[0].categoryName,
                    newCategory: modalDataCategory,
                    oldAmount: transactionToEdit[0].amount,
                    newAmount: modalDataAmount,
                    oldDate: transactionToEdit[0].date,
                    newDate: modalDataDate,
                    isPeriodic: transactionToEdit[0].isPeriodic,
                    periodType: transactionToEdit[0].periodType
                }
            ).then(r =>
                // console.log(r.data)
                setUserTransactionsData(r.data)
            )


        } else if (modalType === 'Delete') {
            // console.log('delete')
            // console.log(modalDataCategory)
            // console.log(modalDataAmount)
            // console.log(modalDataDate)

            api.post('Transactions/delete', {
                    username: localStorage.getItem("username"),
                    categoryName: modalDataCategory,
                    amount: modalDataAmount,
                    date: modalDataDate,
                    name: modalDataName
                }
            ).then(r =>
                // console.log(r.data)
                setUserTransactionsData(r.data)
            )
        } else if (modalType === 'Add') {
            // console.log('add')
            // console.log(modalDataCategory)
            // console.log(modalDataAmount)
            // console.log(modalDataDate)
            
            api.post('Transactions/create', {
                    username: localStorage.getItem("username"),
                    categoryName: modalDataCategory,
                    amount: modalDataAmount,
                    date: modalDataDate,
                    name: modalDataName
                }
            ).then(r =>
                // console.log(r.data)
                setUserTransactionsData(r.data)
            )

        }

        // setModalType('');
        setTransactionToEdit([])
        closeModal();
    }

    function closeModal() {
        setModalDataCategory('')
        setModalDataAmount('')
        setModalDataName('');
        // const myDate = moment.utc(new Date(), 'YYYY-MM-DD').toDate();
        // setModalDataDate(myDate)
        setIsOpen(false);
    }

    function editHandler(category, amount, date, name) {
        const transaction = userTransactionsData.filter((item) => {
            return item.categoryName === category && item.amount === amount && item.date.toString() === date.toString()
        });
        setTransactionToEdit(transaction)

        setModalDataCategory(category)
        setModalDataName(name)
        setModalDataAmount(amount)

        const myDate = moment.utc(date, 'YYYY-MM-DD').toDate();
        setModalDataDate(myDate)

        setModalType('Edit')
        openModal()
    }

    function deleteHandler(category, amount, date, name) {
        // console.log(props)
        setModalDataCategory(category)
        setModalDataName(name)
        setModalDataAmount(amount)
        const myDate = moment.utc(date, 'YYYY-MM-DD').toDate();
        setModalDataDate(myDate)

        setModalType('Delete')
        openModal()
    }

    function addExpenseHandler() {
        setCategoryAddType('Expenses')
        setModalType('Add')
        setModalDataCategory(expensesCategories[0].categoryName)
        openModal()
    }

    function addIncomeHandler() {
        setCategoryAddType('Income')
        setModalType('Add')
        setModalDataCategory(incomeCategories[0].categoryName)
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
                            Add transaction of {categoryAddType} type
                        </div>
                        {
                            categoryAddType === 'Income' ?
                                <div className="d-flex flex-column">
                                    <Form.Select
                                        onChange={(e) => setModalDataCategory(e.target.value)}
                                        // value={filterQuery}
                                        defaultValue={''}
                                        aria-label="Default select example">
                                        {/*<option value=''>Show all</option>*/}
                                        {incomeCategories.map(
                                            c => (
                                                <option key={c.id} value={c.categoryName}>{c.categoryName}</option>))
                                        }
                                    </Form.Select>
                                < /div>
                                :
                                <Form.Select
                                    onChange={(e) => setModalDataCategory(e.target.value)}
                                    // value={filterQuery}
                                    defaultValue={''}
                                    aria-label="Default select example">
                                    {/*<option value=''>Show all</option>*/}
                                    {expensesCategories.map(
                                        c => (
                                            <option key={c.id} value={c.categoryName}>{c.categoryName}</option>))
                                    }
                                </Form.Select>

                        }

                        <input
                            type="text"
                            defaultValue={modalDataName}
                            placeholder="Name"
                            // value={modalInputData}
                            onChange={(e) => setModalDataName(e.target.value)}
                        />

                        <input
                            type="number"
                            defaultValue={modalDataAmount}
                            placeholder="Amount"
                            // value={modalInputData}
                            onChange={(e) => setModalDataAmount(e.target.value)}
                        />

                        <div className="m-auto">
                            <DatePicker

                                selected={modalDataDate}
                                onSelect={(date: Date) => setModalDataDate(date)}/>

                        </div>


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
                        modalType === 'Edit'

                            ?
                            <div className="d-flex flex-column">

                                <Form.Select
                                    onChange={(e) => setModalDataCategory(e.target.value)}
                                    // value={filterQuery}
                                    defaultValue={modalDataCategory}
                                    aria-label="Default select example">
                                    {/*<option value=''>Show all</option>*/}
                                    {userCategoriesData.map(
                                        c => (
                                            <option key={c.id} value={c.categoryName}>{c.categoryName}</option>))
                                    }
                                </Form.Select>

                                <input
                                    type="text"
                                    defaultValue={modalDataName}
                                    // value={modalInputData}
                                    onChange={(e) => setModalDataName(e.target.value)}
                                />

                                <input
                                    type="text"
                                    defaultValue={modalDataAmount}
                                    // value={modalInputData}
                                    onChange={(e) => setModalDataAmount(e.target.value)}
                                />

                                <DatePicker
                                    selected={modalDataDate}
                                    onSelect={(date: Date) => setModalDataDate(date)}/>


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

                                <div>Do you want to delete this transaction?</div>

                                <div className="m-auto">
                                    {modalDataCategory}
                                </div>
                                <div className="m-auto">
                                    {modalDataName}
                                </div>
                                <div className="m-auto">
                                    {dateToDisplay}
                                </div>

                                <div className="m-auto">{modalDataAmount}$</div>
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
            <Container className="mt-5">
                <Row>
                    <Col className="square me-2 rounded-4 border border-2 border-success">
                        <div className="d-flex h-100 flex-row">
                            <div className="d-flex flex-fill align-items-center">
                                <h4 className="m-0 w-100 text-center">Income</h4>
                            </div>

                            <div onClick={addIncomeHandler}
                                 className="d-flex ps-3 w-25 align-items-center border-start border-success">
                                <h4 className="m-0 w-100 text-center">+</h4>
                            </div>
                        </div>
                    </Col>

                    <Col className="square me-2  rounded-4 border border-2 border-warning">
                        <div className="d-flex h-100 flex-row">
                            <div className="d-flex flex-fill align-items-center">
                                <h4 className="m-1 w-100 text-center">Expenses</h4>
                            </div>

                            <div onClick={addExpenseHandler}
                                 className="d-flex ps-3 w-25 align-items-center border-start border-warning">
                                <h4 className="m-1 w-100 text-center">+</h4>
                            </div>
                        </div>
                    </Col>
                </Row>


                <Row style={{height: 15}}  className="mt-2">
                    <Col style={{height: 15}}  className="square me-2 border-0 bg-transparent">
                        {/*1 of 3*/}

                        <div className="d-flex flex-fill w-75 align-items-center">
                            <h6 className="w-25 m-0">
                                Name
                            </h6>
                            <h6 className="w-25 m-0">
                                Category
                            </h6>
                            <h6 className="w-25 m-0">
                                Amount
                            </h6>
                            <h6 className="w-25 m-0">
                                Date
                            </h6>
                        </div>
                    </Col>

                    <Col style={{height: 15}} className="square me-2 border-0 bg-transparent">
                        {/*1 of 3*/}
                        <div className="d-flex flex-fill w-75 align-items-center">
                            <h6 className="w-25 m-0">
                                Name
                            </h6>
                            <h6 className="w-25 m-0">
                                Category
                            </h6>
                            <h6 className="w-25 m-0">
                                Amount
                            </h6>
                            <h6 className="w-25 m-0">
                                Date
                            </h6>
                        </div>
                    </Col>
                </Row>


                <Row style={{height: 45}}  className="mt-2">

                    <Col style={{height: 45}}  className="square me-2 border-0 bg-transparent">
                        {incomeTransactions.map(
                            c => (
                                <div key={c.id} className="d-flex h-100 flex-row">
                                    <div className="d-flex w-75 align-items-center justify-content-between text-center">
                                        <h5 className="m-0">
                                            {c.name}
                                        </h5>
                                        <h5 className="m-0">
                                            {c.categoryName}
                                        </h5>
                                        <h5 className="m-0">
                                            {c.amount}$
                                        </h5>
                                        <h5 className="m-0">
                                            {c.date}
                                        </h5>
                                    </div>

                                    <div className="d-flex w-25 flex-fill align-items-center text-center">
                                        <p className="w-50 m-0">
                                            <FontAwesomeIcon
                                                onClick={() => editHandler(c.categoryName, c.amount, c.date, c.name)
                                                } icon={faPen}/>
                                        </p>
                                        <p className="w-50 m-0">
                                            <FontAwesomeIcon
                                                onClick={() => deleteHandler(c.categoryName, c.amount, c.date, c.name)
                                                } icon={faTrash}/>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </Col>

                    <Col style={{height: 45}}  className="square me-2 border-0 bg-transparent">
                        {expensesTransactions.map(
                            c => (
                                <div key={c.id} className="d-flex h-100 flex-row">
                                    <div className="d-flex w-75 align-items-center justify-content-between text-center">
                                        <h5 className="m-0">
                                            {c.name}
                                        </h5>
                                        <h5 className="m-0">
                                            {c.categoryName}
                                        </h5>
                                        <h5 className="m-0">
                                            {c.amount}$
                                        </h5>
                                        <h5 className="m-0">
                                            {c.date}
                                        </h5>
                                    </div>

                                    <div className="d-flex w-25 flex-fill align-items-center text-center">
                                        <p className="w-50 m-0">
                                            <FontAwesomeIcon
                                                onClick={() => editHandler(c.categoryName, c.amount, c.date, c.name)
                                                } icon={faPen}/>
                                        </p>
                                        <p className="w-50 m-0">
                                            <FontAwesomeIcon
                                                onClick={() => deleteHandler(c.categoryName, c.amount, c.date, c.name)
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

export default TransactionsPage;