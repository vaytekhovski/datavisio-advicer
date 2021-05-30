import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';


import '../styles/Authorization.css'

export default function Authorization(props) {

    const [login, setLogin] = useState("");
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const [error, setError] = useState();

    const signIn = () => {
        postData('https://localhost:5000/api/Account/auth', { Login: login, Password: password })
            .then((data) => {
                console.log(data); // JSON data parsed by `response.json()` call
                if (data.success) {
                    localStorage.setItem("user2", data.access_token);
                   props.onAuthorize({
                       jwt: data.access_token,
                       username: data.username
                   })
                } else {
                    setError(data.errorText)
                }
            });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Typography component="div" style={{ height: '100vh' }} >
                    <div className={"authorizationContainer"}>
                        <Box>
                            <InputLabel htmlFor="standard-adornment-amount">Login</InputLabel>
                            <Input
                                style={{ minWidth: '99%' }}

                                id="standard-adornment-amount"
                                value={login}
                                onChange={handleLoginChange}
                            />
                        </Box>
                        <Box >
                            <InputLabel htmlFor="standard-adornment-amount">Password</InputLabel>
                            <Input
                                style={{ minWidth: '99%' }}
                                type="password"
                                id="standard-adornment-amount"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </Box>
                        <Box>
                            {error && <h5>{error}</h5>}
                        </Box>
                        <Box style={{ textAlign: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={signIn}>
                                Sign In
                            </Button>
                        </Box>
                    </div>
                </Typography>
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