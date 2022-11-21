import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, List, Segment } from "semantic-ui-react";
import Delete from "./Delete";
import Edit from "./Edit";


function TodoList(props) {
    const { change, setChange } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_END_DOMAIN}/get`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.error(err));
    },[change]);

    return (
        <Segment>
            <Header size='huge' textAlign="center">Items</Header>
            <List relaxed divided verticalAlign='middle' >
                {data.map(item => (
                    <List.Item>
                        <List.Content floated='right'>
                            <Edit id={item._id }/>
                            <Delete id={item._id} change={change} setChange={setChange}/>
                        </List.Content>
                        <List.Header size='huge'>{item.title}</List.Header>
                        <List.Description>{item.description}</List.Description>
                        <List.Description>{item.deadlineMonth}/{item.deadlineDay}/{item.deadlineYear}</List.Description>
                    </List.Item>
                ))}
            </List>
        </Segment>
    );
}

export default TodoList;