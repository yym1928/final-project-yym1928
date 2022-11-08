import React, { useState } from "react";
import axios from "axios";
import { Container, Header, Form, Button } from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';

function Add(props) {
    const [currentDate, setNewDate] = useState(null);
    
    function handleSubmit(event) {
        event.preventDefault();

        const requestData = {
            title: event.target.title.value,
            description: event.target.descr.value,
            deadline: currentDate
        }

        axios.post(`${process.env.REACT_APP_BACK_END_DOMAIN}/set`, requestData)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }

    function handleChange(event, data) {
        setNewDate(data.value);
    }

    return (
        <Container>
            <Header size='huge' textAlign="center">Add a new task</Header>

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input type="text" name="title" required/>
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input type="text" name="descr" required/>
                </Form.Field>
                <Form.Field>
                    <label>Deadline</label>
                    <SemanticDatepicker onChange={handleChange} required/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    );
}

export default Add;