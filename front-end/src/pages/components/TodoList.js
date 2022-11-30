import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Header, List, Segment } from "semantic-ui-react";
import Delete from "./Delete";
import Edit from "./Edit";


function TodoList(props) {
    const { change, setChange } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_END_DOMAIN}/get`, { withCredentials: true })
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.error(err));
    },[change]);

    return (
        <Segment>
            <Header size="huge" textAlign="center">Items</Header>
            <List relaxed celled verticalAlign="middle">
                {data.map(item => (
                    <List.Item>
                        <List.Content floated='right' verticalAlign="middle">
                            <Button.Group size="tiny">
                                <Edit id={item._id }/>
                                <Button.Or />
                                <Delete id={item._id} change={change} setChange={setChange}/>
                            </Button.Group>
                        </List.Content>
                        <List.Header as='h2'>{item.title}</List.Header>
                        <List.Description style={{ margin: '10px', 'maxWidth': '75%' }}>{item.description}</List.Description>
                        <List.Description>{item.deadline.toString().substring(0,10)}</List.Description>
                    </List.Item>
                ))}
            </List>
        </Segment>
    );
}

export default TodoList;