import React, { useState } from "react";
import axios from "axios";
import { Header, Form, Button, Segment } from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';

function Add(props) {
    const [ Date, setDate] = useState(null);
    const { change, setChange } = props;
    
    function handleSubmit(event) {
        event.preventDefault();

        const requestData = {
            title: event.target.title.value,
            description: event.target.descr.value,
            deadline: Date
        }

        axios.post(`${process.env.REACT_APP_BACK_END_DOMAIN}/set`, requestData)
        .then(() => setChange(!change))
        .catch(err => console.error(err));
    }

    function handleChange(event, data) {
        setDate(data.value);
    }

    return (
        <Segment>
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
        </Segment>
    );
}

export default Add;