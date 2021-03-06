import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="md">
                    <NavbarBrand href="./">Are We In A Bear Market?</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="./">Main</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="./securitylookup">Security Lookup</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="./methodology">Calculation Methodology</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="./sources">Sources</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="./subscribe">Subscribe</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="./rubric">Requirement Locations</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}