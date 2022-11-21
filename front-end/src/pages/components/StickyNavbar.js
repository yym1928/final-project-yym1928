import React from "react";
import { Link } from "react-router-dom";
import { Menu, Container, Dropdown } from 'semantic-ui-react';

function StickyNavbar(props) {

    return (
        <Menu fixed='top' size='massive' inverted>
            <Container>
                <Menu.Item as='a' header>TaskMan</Menu.Item>
                <Menu.Item position="right" as={Link} to='/'>Home</Menu.Item>
        
                <Dropdown item simple text='User'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Login</Dropdown.Item>
                        <Dropdown.Item>Register</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>
    );
}

export default StickyNavbar;