import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import './Login.css';

function Login(props) {

    function handleSubmit(event) {
        event.preventDefault();
    }
   
    return (
        <Grid id='loginGrid' textAlign="center" verticalAlign="middle">
            <Grid.Column id='loginCol'>
                <Header as="h1">Login</Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment>
                        <Form.Input
                            fluid
                            icon="user"
                            name="username"
                            iconPosition="left"
                            placeholder="Username"
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            name="password"
                            iconPosition="left"
                            placeholder="Password"
                        />
                        <Button fluid size="large" color="blue" type="submit">Login</Button>
                    </Segment>

                    <Segment>
                        <Link to='/register'>Create a New User</Link>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default Login;
