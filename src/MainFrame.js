import React from 'react';
import {Col, Container, Navbar} from "react-bootstrap";
import {NavLink, Outlet} from "react-router-dom";

function navLinkIsActive({isActive}) {
    return {
        backgroundColor: isActive ? 'rgba(0,0,0,0.8)' : 'transparent'
    };
}

function MainFrame() {

    return (
        <>
            <Container fluid={true} className='vh-100 d-flex flex-column align-items-center'>
                <Navbar className='navbar-light fixed-top nav-pills nav-fill' style={{backgroundColor: 'rgba(255,255,255,0.6)'}}>
                    <NavLink className='nav-link col-1' to='/'>go back</NavLink>
                    <Col sm={2}/>
                    <NavLink className='nav-link col-3' style={navLinkIsActive} to='/artist'>Artist</NavLink>
                    <NavLink className='nav-link col-3' style={navLinkIsActive} to='/album'>Album</NavLink>
                    <NavLink className='nav-link col-3' style={navLinkIsActive} to='/song'>Song</NavLink>
                    <Col sm={3}/>
                </Navbar>
                <Container fluid className='mt-5'>
                    <Outlet/>
                </Container>
            </Container>

        </>
    )
}

export default MainFrame;