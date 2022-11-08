import React from "react";
import Add from "./components/Add";
import TodoList from "./components/TodoList"
import { Divider } from "semantic-ui-react";
import "./Home.css";

function Home(props) {
    return (
        <div>
            <Add />
            <Divider/>
            <TodoList />
        </div>
    );
};

export default Home;