import React, {useState} from "react"
import api from "../api";
import {Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import '../Styling/Authentication.css'
import {useNavigate} from "react-router-dom";

export const Authentication = () => {
    // const {cartItems} = props;
    // const history = useHistory()
    const navigate = useNavigate()
    const [authMode, setAuthMode] = useState("login")
    // const [userData, setUserData] = useState([]);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [dataIsValid, setDataIsValid] = useState(true);


    const changeAuthMode = () => {
        setAuthMode(authMode === "login" ? "register" : "login")
    }

    function registrationHandler(event) {
        event.preventDefault();
        api.post(`User/register`,
            {
                username: usernameInput,
                password: passwordInput
            })
            .then(
                response => response.status === 200
                    ? setData(response.data)
                    : console.log(response))
            .catch(
                () => {
                    // console.log(error);
                    errorInData()
                }
            )
    }

    function loginHandler(event) {
        event.preventDefault();
        api.post(`User/login`,
            {
                username: usernameInput,
                password: passwordInput
            })
            .then(
                response => response.status === 200
                    ? setData(response.data)
                    : console.log(response))
            .catch(
                () => {
                    // console.log(error);
                    errorInData()
                }
            )
    }

    function setData(data) {
        localStorage.setItem("username", data.username)
        localStorage.setItem("token", data.accessToken)
        navigate('/tracker')
        
        return true
        // setUsernameInput('');
        // setPasswordInput('');

    }

    function errorInData() {
        setDataIsValid(false);
        setUsernameInput('');
        setPasswordInput('');
        return true;
    }


    if (authMode === "login") {
        return (
            <Form onSubmit={loginHandler} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>Register</span>
                    </div>
                    <div className="form-group mt-3">
                        <label
                            className="alert alert-danger" role="alert"
                            hidden={dataIsValid}
                        >
                            Invalid Username or Password, Please try again
                        </label>
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            onChange={(event) => setUsernameInput(event.target.value)}
                            value={usernameInput}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={(event) => setPasswordInput(event.target.value)}
                            value={passwordInput}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        )
    }

    return (
        <Form onSubmit={registrationHandler} className="Auth-form">
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Register</h3>
                <div className="text-center">
                    Already registered?{" "}
                    <span className="link-primary" onClick={changeAuthMode}>Login</span>
                </div>
                <div className="form-group mt-3">
                    <label
                        className="alert alert-danger" role="alert"
                        hidden={dataIsValid}
                    >
                        Invalid Username or Password, Please try again
                    </label>
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="e.g JaneDoe"
                        onChange={(event) => setUsernameInput(event.target.value)}
                        value={usernameInput}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        onChange={(event) => setPasswordInput(event.target.value)}
                        value={passwordInput}
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <Button type="submit" className="btn btn-primary">
                        Submit
                    </Button>
                </div>
            </div>
        </Form>
    )
}