import React, {useState} from "react";
import Add from "./components/Add";
import TodoList from "./components/TodoList"
import { Grid } from "semantic-ui-react";
import "./Home.css";
import { Navigate } from "react-router-dom";

function Home(props) {
    const { loggedIn } = props;
    const [change, setChange] = useState(false);

    return (
        <>
            {loggedIn ? (
                <Grid id="homeGrid" columns={2} divided>
                    <Grid.Row stretched>
                        <Grid.Column textAlign="center">
                            <Add change={change} setChange={setChange}/>
                        </Grid.Column>
                        <Grid.Column>
                            <TodoList change={change} setChange={setChange}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            ) : (
                <Navigate to="/login"/>
            )}
        </>
    );
};

export default Home;