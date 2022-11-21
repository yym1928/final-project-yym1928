import React, {useState} from "react";
import Add from "./components/Add";
import TodoList from "./components/TodoList"
import { Grid } from "semantic-ui-react";
import "./Home.css";

function Home(props) {
    const [change, setChange] = useState(false);

    return (
        <Grid columns={2} divided>
            <Grid.Row stretched>
                <Grid.Column>
                    <Add change={change} setChange={setChange}/>
                </Grid.Column>
                <Grid.Column>
                    <TodoList change={change} setChange={setChange}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Home;