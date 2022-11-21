import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Form, Header, Input, TextArea, Button, Segment } from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import './Edit.css';


function Edit(props) {
    const [data, setData] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();
   
    const fetchData = async (id) => {
        const res = await axios.get(`${process.env.REACT_APP_BACK_END_DOMAIN}/edit/${id}`);
        setData({ ...res.data[0], deadline: new Date(res.data[0].deadline) });

    }

    useEffect(() => {
        if(state) {
            fetchData(state.id);
        }
    },[]);

    if(!state) return <Navigate to="/" />;

    function handleChange(event, { name, value }) {
        setData({ ...data, [name]: value });
        console.log(data);
    }
    
    async function handleSubmit(event) {
        event.preventDefault();

        const res = await axios.put(`${process.env.REACT_APP_BACK_END_DOMAIN}/update/${state.id}`, data);

        console.log(res.data);
        navigate('/');
    }

    return (
        <Segment>
            <Header size="huge">Edit</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field
                    control={Input}
                    label='Title'
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                />
                <Form.Field
                    control={TextArea}
                    label='Description'
                    name='description'
                    value={data.description}
                    onChange={handleChange}
                />
                <Form.Field>
                    <SemanticDatepicker
                        label='Deadline'
                        name='deadline'
                        value={data.deadline}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Button type='submit'>Save</Button>
            </Form>
        </Segment>
    );
};

export default Edit;