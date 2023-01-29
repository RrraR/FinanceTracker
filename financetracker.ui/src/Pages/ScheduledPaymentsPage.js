import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import api from "../api";
import Container from "react-bootstrap/Container";
import {Button, Col, Row, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import Modal from "react-modal";
import DatePicker from "react-datepicker";


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

function ScheduledPaymentsPage() {
    const periodTypes = [
        {
            "id": "1",
            "type": "Daily",
        },
        {
            "id": "2",
            "type": "Weekly",
        },
        {
            "id": "3",
            "type": "Monthly",
        },
        {
            "id": "4",
            "type": "Yearly",
        }
    ]

    const [userTransactionsData, setUserTransactionsData] = useState([]);
    const [userCategoriesData, setUserCategoriesData] = useState([]);


    const periodicPayments = userTransactionsData.filter((item) => {
        return item.isPeriodic === true
    });

    const uniquePayments = [];
    periodicPayments.map((item) => {
        let findItem = uniquePayments.find((x) => x.name === item.name);
        if (!findItem) uniquePayments.push(item);
    });


    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('')

    const [modalDataDate, setModalDataDate] = useState(new Date());
    const [modalDataAmount, setModalDataAmount] = useState('0');
    const [modalDataCategory, setModalDataCategory] = useState('');
    const [modalDataName, setModalDataName] = useState('');

    const [modalDataPeriodType, setModalDataPeriodType] = useState('');

    const dateToDisplay = moment.utc(modalDataDate, 'YYYY-MM-DD').toDate().toDateString();

    const [transactionToEdit, setTransactionToEdit] = useState([]);

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
            // console.log(modalDataName)


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
                    isPeriodic: true,
                    periodType: modalDataPeriodType
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
            // console.log(modalDataName)


            api.post('Transactions/deleteScheduled', {
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
            // console.log(modalDataName)
            // console.log(modalDataPeriodType)

            api.post('Transactions/create', {
                    username: localStorage.getItem("username"),
                    categoryName: modalDataCategory,
                    amount: modalDataAmount,
                    date: modalDataDate,
                    name: modalDataName,
                    isPeriodic: true,
                    periodType: modalDataPeriodType
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
        setModalDataPeriodType('')
        // const myDate = moment.utc(new Date(), 'YYYY-MM-DD').toDate();
        // setModalDataDate(myDate)
        setIsOpen(false);
    }

    function editHandler(category, amount, date, name, periodType) {
        // console.log(periodType)
        // console.log(category)
        const transaction = userTransactionsData.filter((item) => {
            return item.categoryName === category && item.amount === amount && item.date.toString() === date.toString()
        });
        setTransactionToEdit(transaction)

        setModalDataCategory(category)
        setModalDataName(name)
        setModalDataAmount(amount)
        setModalDataPeriodType(periodType)

        const myDate = moment.utc(date, 'YYYY-MM-DD').toDate();
        setModalDataDate(myDate)

        setModalType('Edit')
        openModal()
    }

    function deleteHandler(category, amount, date, name, periodType) {
        // console.log(periodType)
        // console.log(category)

        setModalDataCategory(category)
        setModalDataName(name)
        setModalDataAmount(amount)
        const myDate = moment.utc(date, 'YYYY-MM-DD').toDate();
        setModalDataDate(myDate)
        setModalDataPeriodType(periodType)


        setModalType('Delete')
        openModal()
    }


    function addHandler() {
        setModalType('Add')
        setModalDataCategory(userCategoriesData[0].categoryName)
        setModalDataPeriodType(periodTypes[0].type)

        const myDate = moment.utc(new Date, 'YYYY-MM-DD').toDate();
        setModalDataDate(myDate)
        openModal()
    }


    function getDate(date, periodType) {
        let newDate = moment.utc(date, 'YYYY-MM-DD').toDate()
        let returnDate = new Date()
        const format = "YYYY-MM-DD"

        switch (periodType) {
            case 'Daily':
                returnDate = new Date(newDate.setDate(newDate.getDate() + 1))
                break
            case 'Weekly':
                returnDate = new Date(newDate.setDate(newDate.getDate() + 7))
                break
            case 'Monthly':
                returnDate = new Date(newDate.setMonth(newDate.getMonth() + 1));
                break
            case 'Yearly':
                returnDate = new Date(newDate.setFullYear(newDate.getFullYear() + 1));
                break
        }

        returnDate = moment(returnDate).format(format);

        return (
            <h5 className="m-0">
                {returnDate.toString()}

            </h5>
        )
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
                        <div className="d-flex flex-column">
                            <Form.Select
                                onChange={(e) => setModalDataCategory(e.target.value)}
                                // value={filterQuery}
                                defaultValue={''}
                                aria-label="Default select example">
                                {/*<option value=''>Show all</option>*/}
                                {userCategoriesData.map(
                                    c => (
                                        <option key={c.id} value={c.categoryName}>{c.categoryName}</option>))
                                }
                            </Form.Select>

                        < /div>

                        <Form.Select
                            onChange={(e) => setModalDataPeriodType(e.target.value)}
                            // value={filterQuery}
                            defaultValue={''}
                            aria-label="Default select example">
                            {/*<option value=''>Show all</option>*/}
                            {periodTypes.map(
                                c => (
                                    <option key={c.id} value={c.type}>{c.type}</option>))
                            }
                        </Form.Select>

                        <input
                            type="text"
                            defaultValue={modalDataName}
                            placeholder="Name"
                            // value={modalInputData}
                            onChange={(e) => setModalDataName(e.target.value)}
                        />

                        <input
                            type="text"
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

                                <Form.Select
                                    onChange={(e) => setModalDataPeriodType(e.target.value)}
                                    // value={filterQuery}
                                    defaultValue={modalDataPeriodType}
                                    aria-label="Default select example">
                                    {periodTypes.map(
                                        c => (
                                            <option key={c.id} value={c.type}>{c.type}</option>))
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

            <Container style={{height: 45}} className="mt-5">
                
                <Row style={{height: 45}} className="w-100 ">
                    <Col style={{height: 45}} className="w-100 d-flex flex-fill">
                        <div className="d-flex flex-fill justify-content-center">
                            <Button
                                className="square me-2 rounded-4 bg-transparent text-black text-center border border-2 border-info"
                                onClick={addHandler}>
                                Add New Payment
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row style={{height: 25}}>
                    <Col style={{height: 25}} className="square border-0 bg-transparent">
                        {/*1 of 3*/}
                        <div className="d-flex h-100 flex-row">
                            <div className="d-flex w-100 align-items-center justify-content-between text-center">
                                <div className="m-0">
                                    Payment Type
                                </div>
                                <div className="m-0">
                                    Name
                                </div>
                                <div className="m-0">
                                    Category
                                </div>
                                <div className="m-0">
                                    Amount
                                </div>
                                <div className="m-0">
                                    Latest Payment
                                </div>
                                <div className="m-0">
                                    Next Payment
                                </div>
                                <div className="m-0">
                                    Type
                                </div>
                            </div>

                            <div className="w-25">

                            </div>
                        </div>
                    </Col>
                </Row>

                <Row style={{height: 45}}>
                    <Col style={{height: 45}}>
                        {uniquePayments.map(p => (
                            <div key={p.id} className="d-flex h-100 flex-row">
                                <div className="d-flex w-100 align-items-center justify-content-between text-center">
                                    <h5 className="m-0">
                                        {p.categoryType}
                                    </h5>
                                    <h5 className="m-0">
                                        {p.name}
                                    </h5>
                                    <h5 className="m-0">
                                        {p.categoryName}
                                    </h5>
                                    <h5 className="m-0">
                                        {p.amount}$
                                    </h5>
                                    <h5 className="m-0">
                                        {p.date}
                                    </h5>


                                    {getDate(p.date, p.periodType)}

                                    {/*{(() => {*/}
                                    {/*    switch (p.periodType) {*/}
                                    {/*        case 'Daily':*/}
                                    {/*            return <h5 className="m-0">*/}
                                    {/*                {*/}
                                    {/*                    getDate(p.date)*/}
                                    {/*                }*/}
                                    {/*                Daily*/}
                                    {/*            </h5>*/}
                                    {/*        case 'Weekly':*/}
                                    {/*            return <h5 className="m-0">*/}
                                    {/*                Weekly*/}
                                    {/*            </h5>*/}
                                    {/*        case 'Monthly':*/}
                                    {/*            return <h5 className="m-0">*/}
                                    {/*                Monthly*/}
                                    {/*            </h5>*/}
                                    {/*        case 'Yearly':*/}
                                    {/*            return <h5 className="m-0">*/}
                                    {/*                Yearly*/}
                                    {/*            </h5>*/}
                                    {/*        default:*/}
                                    {/*            return null*/}
                                    {/*    }*/}
                                    {/*})()}*/}


                                    <h5 className="m-0">
                                        {p.periodType}
                                    </h5>
                                </div>

                                <div className="d-flex w-25 flex-fill align-items-center text-center">
                                    <p className="w-50 m-0">
                                        <FontAwesomeIcon
                                            onClick={() => editHandler(p.categoryName, p.amount, p.date, p.name, p.periodType)}
                                            icon={faPen}/>
                                    </p>
                                    <p className="w-50 m-0">
                                        <FontAwesomeIcon
                                            onClick={() => deleteHandler(p.categoryName, p.amount, p.date, p.name, p.periodType)}
                                            icon={faTrash}/>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ScheduledPaymentsPage;