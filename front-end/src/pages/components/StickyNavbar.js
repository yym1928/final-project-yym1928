import React from "react";
import { Link } from "react-router-dom";
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import Logout from "./Logout";

function StickyNavbar(props) {
    const { loggedIn, setLoggedIn } = props;

    return (
        <Menu fixed='top' size='massive' inverted>
            <Container>
                <Menu.Item as='a' header>TaskMan</Menu.Item>
                <Menu.Item position="right" as={Link} to='/'>Home</Menu.Item>
        
                {loggedIn ? (
                    <Menu.Item><Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn}/></Menu.Item>
                ) : (
                    <Dropdown item simple text='User'>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/register'>Register</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Container>
        </Menu>
    );
}

export default StickyNavbar;