import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import './Register.css';

function Register(props) {

    function handleSubmit(event) {
        event.preventDefault();
    }
   
    return (
        <Grid id='registerGrid' textAlign="center" verticalAlign="middle">
            <Grid.Column id='registerCol'>
                <Header as="h1">Register</Header>
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
                        <Button fluid size="large" color="blue" type="submit">Register</Button>
                    </Segment>

                    <Segment>
                        <Link to='/login'>Log in to Existing Account</Link>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default Register;
