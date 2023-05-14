import './App.css';
import React from 'react';
import {Container, Form, Row, Col, Button} from "react-bootstrap";
import dateFormat from "dateformat";
import TextGradientComponent from "./TextGradientComponent";


function DateToInput({monthlyVersion, currentDate, fromDate, toDate, setToDate, toToday, setToToday}) {
    const dateToFormat = monthlyVersion ? 'yyyy-mm' : 'yyyy';
    const dateToType = monthlyVersion ? 'month' : 'number';

    return (
        <Col sm={5}>
            <Form.Label>To:</Form.Label>
            <Form.Control
                type={dateToType}
                min={fromDate}
                max={dateFormat(currentDate, dateToFormat)}
                disabled={toToday}
                value={toDate}
                onChange={event => setToDate(event.target.value)}
            />
            <Form.Switch
                label='to today'
                onChange={event => {
                    setToToday(event.target.checked);
                    setToDate(dateFormat(currentDate, dateToFormat));
                }}
            />
        </Col>
    )
}

function DateFromInput({monthlyVersion, fromDate, setFromDate, toDate, fromBeg, setFromBeg}) {
    const startDate = monthlyVersion ? '2002-03' : '2002';
    const dateFromType = monthlyVersion ? 'month' : 'number';

    return (
        <Col sm={5}>
            <Form.Label>From:</Form.Label>
            <Form.Control
                type={dateFromType}
                min={startDate}
                max={toDate}
                disabled={fromBeg}
                value={fromDate}
                onChange={event => setFromDate(event.target.value)}
            />
            <Form.Switch
                label='from the start'
                onChange={event => {
                    setFromBeg(event.target.checked);
                    setFromDate(startDate);
                }}
            />
        </Col>
    )
}

function MainForm() {
    const [monthlyVersion, _setMonthlyVersion] = React.useState(true);
    const [username, setUsername] = React.useState('');
    const [fromBeg, setFromBeg] = React.useState(false);
    const [toToday, setToToday] = React.useState(false);
    const currentDate = new Date();
    const [fromDate, setFromDate] = React.useState(monthlyVersion ? '2002-03' : '2002');
    const [toDate, setToDate] = React.useState(dateFormat(currentDate, monthlyVersion ? 'yyyy-mm' : 'yyyy'));

    const setMonthlyVersion = (bool) => {
        _setMonthlyVersion(bool);
        setFromDate(bool ? '2002-03' : '2002');
        setToDate(dateFormat(currentDate, bool ? 'yyyy-mm' : 'yyyy'));
    }   // reevaluate other states on change

    const options = {
        monthlyVersion, fromBeg, setFromBeg, toToday, setToToday, currentDate, fromDate, setFromDate, toDate, setToDate
    }

    return (
        <Container fluid={true} className='vh-100 d-flex align-items-center' style={{background: 'linear-gradient(140deg, rgba(246,161,146,1) 0%, rgba(246,217,146,1) 100%)'}}>

            <Container className='ps-5 pe-5 pb-3 pt-3 rounded-4 border border-light' style={{backgroundColor: 'rgba(255,255,255,0.6)'}}>
                <div onClick={() => setMonthlyVersion(!monthlyVersion)}>
                    {TextGradientComponent(monthlyVersion ? 'monthly' : 'yearly')}
                </div>
                <p className='fs-1 fw-bold font-monospace'> tiny Last.fm analyzer</p>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter your last.fm username</Form.Label>
                            <Form.Control value={username} onChange={event => setUsername(event.target.value)}/>
                            <Form.Text className="text-muted">Make sure it's correct =D</Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-4'>
                            <Form.Label>Date ranges:</Form.Label>
                            <Row className='justify-content-center'>
                                {DateToInput(options)}
                                {DateFromInput(options)}
                            </Row>
                        </Form.Group>
                        <Row className='justify-content-center'>
                            <Col/>
                            <Col className='d-grid'>
                                <Button variant='outline-dark' className='mw-100' disabled={!Boolean(username)}> go! </Button>
                            </Col>
                            <Col/>
                        </Row>
                    </Form>
                <Form.Text className='text-muted'>Tip: click the rainbow text to switch modes!</Form.Text>
            </Container>
            {/*</Row>*/}
        </Container>
    );
}

export default MainForm;