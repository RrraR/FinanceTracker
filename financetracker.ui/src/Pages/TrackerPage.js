import React, {useEffect, useState} from "react"
import api from "../api";
import {Button, Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import Chart from 'react-apexcharts'
import {Link} from "react-router-dom";
import Header from "../Components/Header";
import moment from "moment/moment";


export default function TrackerPage() {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        api.post('Transactions', {
                username: localStorage.getItem("username")
            }
        ).then(function (r) {
                setUserData(r.data)
            }
        )
    }, [])


    const [expensesFields, setExpensesFields] = useState([])
    const [incomeFields, setIncomeFields] = useState([])
    const [dates, setDates] = useState([])

    useEffect(() => {
        let dateNow = new Date()
        let month = dateNow.getMonth();
        let year = dateNow.getFullYear();

        let date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            let newDate = moment.utc(date, 'YYYY-MM-DD').toDate().toDateString()
            days.push(newDate);
            date.setDate(date.getDate() + 1);
        }
        setDates(days)
        
        
        setIncomeFields(userData.filter((item) => {
            return item.categoryType === 'Income' && 
                dates.includes(moment.utc(item.date, 'YYYY-MM-DD').toDate().toDateString())
        }))
        setExpensesFields(userData.filter((item) => {
            return item.categoryType === 'Expenses' &&
                dates.includes(moment.utc(item.date, 'YYYY-MM-DD').toDate().toDateString())
        }))

    }, [userData])


    const chartIncomeData = []
    incomeFields.map(
        (item) => {
            let findItem = chartIncomeData.find((x) => x.date === item.date);
            if (!findItem)
                chartIncomeData.push(item);
            else {
                findItem.amount += item.amount
            }
        });

    const incomeChart = [];
    chartIncomeData.map((item) => {
        let temp =
            {
                "date": item.date,
                "amount": item.amount
            }
        incomeChart.push(temp)
    })

    dates.map(
        (item) => {

            let findItem = incomeChart.find(
                (x) => moment.utc(x.date, 'YYYY-MM-DD').toDate().toDateString() === item
            );

            if (!findItem) {
                incomeChart.push(
                    {
                        "date": item,
                        "amount": 0
                    }
                );
            } else {
                findItem.date = moment.utc(findItem.date, 'YYYY-MM-DD').toDate().toDateString()
            }
        });

    incomeChart.sort(function (a, b) {
        let keyA = new Date(a.date),
            keyB = new Date(b.date);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    const incomeChartAmount = incomeChart.map((item) => item.amount);


    const chartExpensesData = []
    expensesFields.map(
        (item) => {
            let findItem = chartExpensesData.find((x) => x.date === item.date);
            if (!findItem)
                chartExpensesData.push(item);
            else {
                findItem.amount += item.amount
            }
        });

    const expensesChart = [];
    chartExpensesData.map((item) => {
        let temp =
            {
                "date": item.date,
                "amount": item.amount
            }
        expensesChart.push(temp)
    })

    dates.map(
        (item) => {

            let findItem = expensesChart.find(
                (x) => moment.utc(x.date, 'YYYY-MM-DD').toDate().toDateString() === item
            );

            if (!findItem) {
                expensesChart.push(
                    {
                        "date": item,
                        "amount": 0
                    }
                );
            } else {
                findItem.date = moment.utc(findItem.date, 'YYYY-MM-DD').toDate().toDateString()
            }
        });

    expensesChart.sort(function (a, b) {
        let keyA = new Date(a.date),
            keyB = new Date(b.date);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    const expensesChartAmount = expensesChart.map((item) => item.amount);


    const totalIncome = incomeFields.reduce((a, c) => a + c.amount, 0)
    const totalExpenses = expensesFields.reduce((a, c) => a + c.amount, 0)

    const periodicPayments = userData.filter((item) => {
        return item.isPeriodic === true
    });

    const scheduledPayments = periodicPayments.slice(0, 5);

    const transactions = userData.slice(0, 5);


    const expenseData = [];
    expensesFields.map(
        (item) => {
            let findItem = expenseData.find((x) => x.categoryName === item.categoryName);
            if (!findItem)
                expenseData.push(item);
            else {
                findItem.amount += item.amount
            }
        });

    const pieDataAmount = expenseData.map((item) => item.amount);
    const pieDataLabels = expenseData.map((item) => item.categoryName);


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
            <h6 className="d-flex w-25 flex-fill m-0">
                {returnDate.toString()}
            </h6>
        )
    }


    const lineData = {
        series: [
            {
                name: 'Expenses',
                data: expensesChartAmount
            },
            {
                name: 'Income',
                data: incomeChartAmount
            }

        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            title: {
                text: 'Statistic This Month',
                align: 'left'
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: dates
            },
            yaxis: {
                title: {
                    text: '$'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val
                    }
                }
            }
        },
    };


    const pieData = {

        series: pieDataAmount,
        options: {

            labels: pieDataLabels,

            chart: {
                type: 'donut',
            },
            title: {
                text: 'Expenses By Category',
                align: 'left'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
            ]
        },


    };

    return (
        <>
            <Header></Header>

            <Container className="mt-5 mb-5">
                <Row>
                    <Col xs={6} className="d-flex flex-fill">

                        <Container>
                            <Row>
                                <Col className="square me-2  bg-transparent rounded-4 border border-2 border-success">
                                    {/*1 of 3*/}
                                    <div className="d-flex h-100 flex-row">

                                        <div className="d-flex w-25 align-items-center border-end border-success">
                                            <h1 className="w-75 text-center text-success">$</h1>

                                        </div>

                                        <div className="d-flex flex-fill flex-column align-items-center">
                                            <p>Total Income</p>
                                            <h4>{totalIncome}</h4>
                                        </div>

                                    </div>
                                </Col>

                                <Col className="square me-2  bg-transparent rounded-4 border border-2 border-warning">
                                    {/*2 of 3*/}
                                    <div className="d-flex flex-row">

                                        <div className="d-flex w-25 align-items-center border-end border-warning">
                                            <h1 className="w-75 text-center text-warning">$</h1>

                                        </div>

                                        <div className="d-flex flex-fill flex-column align-items-center">
                                            <p>Total Expense</p>
                                            <h4>{totalExpenses}</h4>
                                        </div>

                                    </div>
                                </Col>

                                <Col className="square  bg-transparent rounded-4 border border-2 border-primary">
                                    {/*3 of 3*/}
                                    <div className="d-flex h-100 flex-row">

                                        <div className="d-flex w-25 align-items-center border-end border-primary">
                                            <h1 className="w-75 text-center text-primary">$</h1>

                                        </div>

                                        <div className="d-flex flex-fill flex-column align-items-center">
                                            <p>Expected Balance</p>
                                            <h4>{totalIncome - totalExpenses}</h4>
                                        </div>

                                    </div>
                                </Col>

                            </Row>
                            <Row className="mt-2">
                                <Col xs={4}
                                     className="square me-2  bg-transparent rounded-4 border border-2 border-info">
                                    {/*1 of 2*/}
                                    <div className="mt-4">
                                        <Chart type="pie" options={pieData.options} series={pieData.series}></Chart>
                                    </div>
                                </Col>

                                <Col className="square me-2  bg-transparent rounded-4 border border-2 border-info">
                                    {/*2 of 2*/}

                                    <Chart type="bar" options={lineData.options} series={lineData.series}
                                           height={340}
                                        // width={}
                                    ></Chart>

                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col className="square me-2 bg-transparent rounded-4 border border-2 border-info">
                                    <h5 className="mb-2">Recent transactions</h5>
                                    <div className="d-flex w-100 mb-2 align-items-center text-center">
                                        <div className="d-flex w-25 flex-fill m-0">
                                            Type
                                        </div>
                                        <div className="d-flex w-25 flex-fill m-0">
                                            Name
                                        </div>
                                        <div className="d-flex w-25 flex-fill m-0">
                                            Amount
                                        </div>
                                        <div className="d-flex w-25 flex-fill m-0">
                                            Date
                                        </div>
                                    </div>

                                    {transactions.map(t => (
                                        <div key={t.id} className="d-flex mt-2 w-100 align-items-center text-center">
                                            <h6 className="d-flex w-25 flex-fill m-0">
                                                {t.categoryType}
                                            </h6>
                                            <h6 className="d-flex w-25 flex-fill m-0">
                                                {t.name}
                                            </h6>
                                            <h6 className="d-flex w-25 flex-fill m-0">
                                                {t.amount}$
                                            </h6>
                                            <h6 className="d-flex w-25 flex-fill m-0">
                                                {t.date}
                                            </h6>
                                        </div>
                                    ))}

                                    <div className="text-center mt-2 mb-2">
                                        <Link to="../transactions" className="btn btn-info">View all</Link>
                                    </div>
                                </Col>

                                <Col className="square me-2 bg-transparent rounded-4 border border-2 border-info">
                                    <h5 className="mb-2">Scheduled Payments And Subscriptions</h5>

                                    <div className="d-flex w-100 mb-2 align-items-center text-center">
                                        <div className="d-flex w-25 flex-fill m-0">
                                            Type
                                        </div>
                                        <div className="d-flex w-25 flex-fill m-0">
                                            Name
                                        </div>
                                        <div className="d-flex w-25 flex-fill m-0">
                                            Amount
                                        </div>
                                        <div className="d-flex w-25 flex-fill m-0">
                                            Next Payment
                                        </div>
                                    </div>

                                    {scheduledPayments.map(t => (
                                        <div key={t.id} className="d-flex mt-2 w-100 align-items-center text-center">
                                            <h6 className="d-flex w-25 flex-fill m-0">
                                                {t.categoryType}
                                            </h6>
                                            <h6 className="d-flex w-25 flex-fill m-0">
                                                {t.name}
                                            </h6>
                                            <h6 className="d-flex w-25 flex-fill m-0">
                                                {t.amount}$
                                            </h6>

                                            {getDate(t.date, t.periodType)}
                                        </div>
                                    ))}

                                    <div className="text-center mt-2 mb-2">
                                        <Link to="../scheduledPayments" className="btn btn-info">View all</Link>
                                    </div>
                                </Col>
                            </Row>

                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}