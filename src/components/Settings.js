import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
export default function Settings() {

    return (
        <>
            <Container maxWidth="md">
                <h1>Settings</h1>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button style={{justifyContent:"start"}} color="inherit" endIcon={<ArrowForwardIosIcon />} href="/settings/change-password">Change password</Button>
                    <Button style={{justifyContent:"start"}} color="inherit" endIcon={<ArrowForwardIosIcon />} >Other settings</Button>
                    <Button style={{justifyContent:"start"}} color="inherit" endIcon={<ArrowForwardIosIcon />} >Other settings</Button>
                    <Button style={{justifyContent:"start"}} color="inherit" endIcon={<ArrowForwardIosIcon />} >Other settings</Button>
                    <Button style={{justifyContent:"start"}} color="inherit" endIcon={<ArrowForwardIosIcon />} >Other settings</Button>

                </div>

            </Container>
        </>
    )
}
