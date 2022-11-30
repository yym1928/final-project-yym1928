import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Form, Header, Input, TextArea, Button, Segment, Grid } from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import './Edit.css';

function Edit(props) {
    const [data, setData] = useState({});
    const { loggedIn } = props;
    const { state } = useLocation();
    const navigate = useNavigate();
   
    const fetchData = async (id) => {
        const res = await axios.get(`${process.env.REACT_APP_BACK_END_DOMAIN}/edit/${id}`, { withCredentials: true });
        setData({ ...res.data[0], deadline: new Date(res.data[0].deadline) });
    }

    useEffect(() => {
        if(state) {
            fetchData(state.id);
        }
    },[]);
    
    function handleChange(event, { name, value }) {
        setData({ ...data, [name]: value });
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        axios.put(`${process.env.REACT_APP_BACK_END_DOMAIN}/update/${state.id}`, data,  { withCredentials: true })
        .then(() => navigate('/'));
    }

    if(!state) return (<Navigate to="/"/>);
    else return (
        <>
            {loggedIn ? (
                <Grid id='editGrid' textAlign="center" verticalAlign="middle">
                    <Grid.Column id='editCol'>
                        <Segment>
                            <Header size="huge">Edit</Header>
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
                                <Form.Field>
                                    <SemanticDatepicker
                                        label='Deadline'
                                        name='deadline'
                                        value={data.deadline}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Field>
                                <Button id='editButton' color="blue" type='submit'>Save</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            ) : (
                <Navigate to="/login"/>
            )}
        </>
    );
};

export default Edit;