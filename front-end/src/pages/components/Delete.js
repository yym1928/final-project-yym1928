import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";


function Delete(props) {

    function handleClick(event) {
        event.preventDefault();

        console.log(props.id);

        axios.delete(`${process.env.REACT_APP_BACK_END_DOMAIN}/delete/${props.id}`)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }

    return (
        <Button
            content='Delete'
            onClick={handleClick}>
        </Button>
    );
}

export default Delete;