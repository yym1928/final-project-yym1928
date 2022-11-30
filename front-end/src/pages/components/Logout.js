import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
    const { setLoggedIn } = props;
    const navigate = useNavigate();

    function handleClick(event) {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_BACK_END_DOMAIN}/logout`, { withCredentials: true })
        .then(() => {
            setLoggedIn(false);
            sessionStorage.removeItem('user');
            navigate('/login');
        })
        .catch(err => console.error(err));
    }

    return (
        <Button
            inverted
            content='Logout'
            onClick={handleClick}>
        </Button>
    );
}

export default Logout;