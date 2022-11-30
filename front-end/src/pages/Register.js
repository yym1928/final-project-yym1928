import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Grid, Header, Form, Segment, Button, Message } from "semantic-ui-react";
import './Register.css';

function Register(props) {
    const[error, setError] = useState(false);
    const[errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try{
            const response = await axios.post(`${process.env.REACT_APP_BACK_END_DOMAIN}/register`, {
                username: event.target.username.value,
                password: event.target.password.value
            }, { withCredentials: true });

            console.log(response.data);
            navigate('/login');
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.message);
            setError(true);
        }
    }
   
    return (
        <Grid id='registerGrid' textAlign="center" verticalAlign="middle">
            <Grid.Column id='registerCol'>
                <Header as="h1">Register</Header>
                <Form size="large" error={error} onSubmit={handleSubmit}>
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
                        <Message
                            error
                            header='Registration Error'
                            content={errorMessage}
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
