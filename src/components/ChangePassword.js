import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import '../styles/Authorization.css'


export default function ChangePassword(props) {
    const [isLoading, setIsLoading] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    }

    const [oldPassword2, setOldPassword2] = useState("");
    const handleOldPassword2Change = (event) => {
        setOldPassword2(event.target.value);
    }

    const [newPassword, setNewPassword] = useState("");
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    }


    const [error, setError] = useState();
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        if (isLoading) {
            setError(null);
            setSuccessMessage(null);
        }
    }, [isLoading])

    const changePassword = () => {
        if (oldPassword !== "" && oldPassword2 !== "" && newPassword !== "") {
            if (oldPassword === oldPassword2) {
                setIsLoading(true);
                postData('http://134.122.64.43:8895/api/Account/change-password',
                    {
                        userId: localStorage.getItem("userId"),
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    })
                    .then((data) => {
                        console.log(data); // JSON data parsed by `response.json()` call
                        if (data.success) {
                            setSuccessMessage("Password has changed.");
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
                setError("Old passwords are not equals!")
            }
        } else {
            setError("Please enter old passwords and new password!")
        }
    }

    return (
        <>
            <Container maxWidth="md">
                <div style={{ margin: "20px 0px" }}>
                    <Button color="inherit" startIcon={<ArrowBackIosIcon />} href="/settings">Back to settings</Button>
                </div>
                <div className={"changePasswordContainer"}>
                    <Box className={"authBox"}>
                        <h2>Change password</h2>
                    </Box>
                    <Box className={"authBox"}>
                        <InputLabel htmlFor="standard-adornment-amount">Old password</InputLabel>
                        <Input
                            type="password"
                            style={{ minWidth: '99%' }}
                            id="standard-adornment-amount"
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                        />
                    </Box>
                    <Box className={"authBox"}>
                        <InputLabel htmlFor="standard-adornment-amount">Repeat old password</InputLabel>
                        <Input
                            type="password"
                            style={{ minWidth: '99%' }}
                            id="standard-adornment-amount"
                            value={oldPassword2}
                            onChange={handleOldPassword2Change}
                        />
                    </Box>
                    <Box className={"authBox"}>
                        <InputLabel htmlFor="standard-adornment-amount">New password</InputLabel>
                        <Input
                            style={{ minWidth: '99%' }}
                            type="password"
                            id="standard-adornment-amount"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                    </Box>
                    <Box className={"authBox"}>
                        {error && <h5 style={{ color: "red", textAlign: "center" }}>{error}</h5>}
                        {successMessage && <h5 style={{ color: "green", textAlign: "center" }}>{successMessage}</h5>}

                    </Box>
                    <Box style={{ textAlign: "center" }} className={"authBox authBottomButtons"}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={changePassword}>
                            Sign In
                        </Button>
                    </Box>
                    {isLoading && <LinearProgress />}

                </div>
            </Container>
        </>
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