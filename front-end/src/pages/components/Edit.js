import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";


function Edit(props) {

    return (
        <Link 
            to={"/edit"}
            state={{ id: props.id }}
        >
            <Button positive>Edit</Button>
        </Link>
    );
}

export default Edit;