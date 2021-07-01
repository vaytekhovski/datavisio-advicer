import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Redirect } from "react-router-dom"

export default function SignOut(props) {

    useEffect(() => {
        localStorage.removeItem("user");
        props.onAuthorize({
            isAuth: false
        })
    })

    return (
        <>
            <Container maxWidth="md">
                <h1>Loading...</h1>
                <LinearProgress />
                <Redirect push to="/Home" />
            </Container>
        </>
    )
}