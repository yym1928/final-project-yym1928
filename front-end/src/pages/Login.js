import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Grid, Header, Form, Segment, Button, Message } from "semantic-ui-react";
import './Login.css';

function Login(props) {
    const { loggedIn, setLoggedIn } = props;
    const[error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_END_DOMAIN}/login`, {
                username: event.target.username.value,
                password: event.target.password.value,
            }, { withCredentials: true });

            console.log(response.data);
            sessionStorage.setItem('user', response.data);
            setLoggedIn(true);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }
   
    return (
        <Grid id='loginGrid' textAlign="center" verticalAlign="middle">
            <Grid.Column id='loginCol'>
                <Header as="h1">Login</Header>
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
                            header='Cannot Login'
                            content='Incorrect username or password'
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
