import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, Container, List } from "semantic-ui-react";
import Delete from "./Delete";


function TodoList(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_END_DOMAIN}/get`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.error(err));
    });

    return (
        <Container>
            <Header size='huge' textAlign="center">Items</Header>
            <List relaxed divided verticalAlign='middle' >
                {data.map(item => (
                    <List.Item>
                        <List.Content floated='right'>
                            <Delete id={item._id}/>
                        </List.Content>
                        <List.Header size='huge'>{item.title}</List.Header>
                        <List.Description>{item.description}</List.Description>
                        <List.Description>{item.deadline.month}/{item.deadline.day}/{item.deadline.year}</List.Description>
                    </List.Item>
                ))}
            </List>
        </Container>
    );
}

export default TodoList;