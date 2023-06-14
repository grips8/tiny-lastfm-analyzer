import React from 'react';
import {Col, Container, Navbar} from "react-bootstrap";
import {NavLink, Outlet, useLocation} from "react-router-dom";

function navLinkIsActive({isActive}) {
    return {
        backgroundColor: isActive ? 'rgba(0,0,0,0.8)' : 'transparent'
    };
}

function MainFrame() {
    const {state} = useLocation();
    const {data, monthlyVersion} = state !== null ? state : {data: undefined, monthlyVersion: true};

    return (
        <>
            <Container fluid={true} className='vh-100 d-flex flex-column align-items-center'>
                <Navbar className='navbar-light fixed-top nav-pills nav-fill' style={{backgroundColor: 'rgba(255,255,255,0.6)'}}>
                    <NavLink className='nav-link col-1' to='/'>go back</NavLink>
                    <Col sm={2}/>
                    <NavLink
                        className='nav-link col-3'
                        style={navLinkIsActive}
                        to='/artist'
                        state={{data: data, monthlyVersion: monthlyVersion}}
                        replace={true}
                    >Artist</NavLink>
                    <NavLink
                        className='nav-link col-3'
                        style={navLinkIsActive}
                        to='/album'
                        state={{data: data, monthlyVersion: monthlyVersion}}
                        replace={true}
                    >Album</NavLink>
                    <NavLink
                        className='nav-link col-3'
                        style={navLinkIsActive}
                        to='/song'
                        state={{data: data, monthlyVersion: monthlyVersion}}
                        replace={true}
                    >Song</NavLink>
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