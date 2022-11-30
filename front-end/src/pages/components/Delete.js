import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

function Delete(props) {
    const { change, setChange } = props;

    function handleClick(event) {
        event.preventDefault();

        axios.delete(`${process.env.REACT_APP_BACK_END_DOMAIN}/delete/${props.id}`, { withCredentials: true })
        .then(() => setChange(!change))
        .catch(err => console.error(err));
    }

    return (
        <Button
            negative
            content='Delete'
            onClick={handleClick}>
        </Button>
    );
}

export default Delete;