import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';



import '../styles/Authorization.css'

let styleLinearProgress = {
    top: "-4px",
    borderRadius: "3px"
};


export default function Authorization(props) {

    const [isSignIn, setIsSignIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [login, setLogin] = useState("");
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const [password2, setPassword2] = useState("");
    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    }

    const [error, setError] = useState();

    useEffect(() => {
        setError(null)
    }, [isSignIn])

    const signIn = () => {
        if (login !== "" && password !== "") {
            setIsLoading(true);
            postData('http://134.122.64.43:8895/api/Account/auth', { Login: login, Password: password })
                .then((data) => {
                    console.log(data); // JSON data parsed by `response.json()` call
                    if (data.success) {
                        localStorage.setItem("user", data.access_token);
                        props.onAuthorize({
                            jwt: data.access_token,
                            username: data.username
                        })
                    } else {
                        setError(data.errorText)
                    }
                    setIsLoading(false);
                }, (error) => {
                    console.log(error);
                    setError("Something went wrong. Please try again.");
                    setIsLoading(false);
                });
        } else {
            setError("Please enter login and password")
        }
    }

    const signUp = () => {
        if (login !== "" && password !== "") {
            if (password === password2) {
                setIsLoading(true);
                postData('http://134.122.64.43:8895/api/Account/sign-up', { Login: login, Password: password })
                    .then((data) => {
                        console.log(data);
                        if (data.success) {
                            localStorage.setItem("user", data.access_token);
                            props.onAuthorize({
                                jwt: data.access_token,
                                username: data.username
                            })
                        } else {
                            setError(data.errorText)
                        }
                        setIsLoading(false);
                    }, (error) => {
                        console.log(error);
                        setError("Something went wrong. Please try again.");
                        setIsLoading(false);
                    });
            }
            else {
                setError("Passwords are not equals!")
            }
        } else {
            setError("Please enter login and passwords")
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <div className={"authorizationContainer"}>
                    <Box className={"authBox"}>
                        <h2>{isSignIn ? "Sign in" : "Create an account"}</h2>
                    </Box>
                    <Box className={"authBox"}>
                        <InputLabel htmlFor="standard-adornment-amount">Login</InputLabel>
                        <Input
                            style={{ minWidth: '99%' }}

                            id="standard-adornment-amount"
                            value={login}
                            onChange={handleLoginChange}
                        />
                    </Box>
                    <Box className={"authBox"}>
                        <InputLabel htmlFor="standard-adornment-amount">Password</InputLabel>
                        <Input
                            style={{ minWidth: '99%' }}
                            type="password"
                            id="standard-adornment-amount"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Box>
                    {isSignIn || <Box className={"authBox"}>
                        <InputLabel htmlFor="standard-adornment-amount">Repeat password</InputLabel>
                        <Input
                            style={{ minWidth: '99%' }}
                            type="password"
                            id="standard-adornment-amount"
                            value={password2}
                            onChange={handlePassword2Change}
                        />
                    </Box>
                    }
                    <Box className={"authBox"}>
                        {error && <h5 style={{ color: "red", textAlign: "center" }}>{error}</h5>}
                    </Box>
                    {isSignIn ?
                        <Box style={{ textAlign: "center" }} className={"authBox authBottomButtons"}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={signIn}>
                                Sign In
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setIsSignIn(false)}>
                                Create an account
                            </Button>
                        </Box>
                        :
                        <Box style={{ textAlign: "center" }} className={"authBox authBottomButtons"}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={signUp}>
                                Create an account
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setIsSignIn(true)}>
                                Sign In
                            </Button>
                        </Box>
                    }
                    {isLoading && <LinearProgress style={styleLinearProgress} />}
                </div>
            </Container>
        </React.Fragment>
    )
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}