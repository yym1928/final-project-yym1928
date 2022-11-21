import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Form, Header, Input, TextArea, Button, Segment } from "semantic-ui-react";

function Edit(props) {
    const [data, setData] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();
   
    const fetchData = async (id) => {
        const res = await axios.get(`${process.env.REACT_APP_BACK_END_DOMAIN}/edit/${id}`);
        setData(res.data[0]);
    }

    useEffect(() => {
        if(state) {
            fetchData(state.id);
        }
    },[]);

    if(!state) return <Navigate to="/" />;

    function handleChange(event, { name, value }) {
        setData({ ...data, [name]: value });
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
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label='Year'
                        name='deadlineYear'
                        value={data.deadlineYear}
                        onChange={handleChange}
                    />
                    <Form.Field
                        control={Input}
                        label='Month'
                        name='deadlineMonth'
                        value={data.deadlineMonth}
                        onChange={handleChange}
                    />
                    <Form.Field
                        control={Input}
                        label='Day'
                        name='deadlineDay'
                        value={data.deadlineDay}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type='submit'>Save</Button>
            </Form>
        </Segment>
    );
};

export default Edit;