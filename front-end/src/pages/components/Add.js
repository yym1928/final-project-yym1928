import React, { useState } from "react";
import axios from "axios";
import { Header, Form, Button, Segment, Input, TextArea } from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';

function Add(props) {
    const [ data, setData] = useState({ title: '', description: '', deadline: '' });
    const { change, setChange } = props;
    
    function handleSubmit(event) {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_BACK_END_DOMAIN}/add`, data)
        .then(() => {
            setData({ title: '', description: '', deadline: '' });
            setChange(!change);
        })
        .catch(err => console.error(err));
    }

    function handleChange(event, { name, value }) {
        setData({ ...data, [name]: value })
    }

    return (
        <Segment>
            <Header size='huge' textAlign="center">Add a new task</Header>

            <Form onSubmit={handleSubmit}>
                <Form.Field
                    control={Input}
                    label='Title'
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                    required
                />
                <Form.Field
                    control={TextArea}
                    label='Description'
                    name='description'
                    value={data.description}
                    onChange={handleChange}
                    required
                />
                <Form.Field
                    control={SemanticDatepicker} 
                    label='Deadline' 
                    name='deadline'
                    value={data.deadline} 
                    onChange={handleChange}
                    required
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Segment>
    );
}

export default Add;