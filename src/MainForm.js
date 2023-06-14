import './App.css';
import React from 'react';
import {Container, Form, Row, Col, Button} from "react-bootstrap";
import dateFormat from "dateformat";
import TextGradientComponent from "./TextGradientComponent";
import {useNavigate} from "react-router-dom";
import configData from "./config.json"
import axios from "axios";
import racc from "./raccLoading.gif";


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
    const [fromDate, setFromDate] = React.useState(dateFormat(currentDate, monthlyVersion ? 'yyyy-mm' : 'yyyy'));
    const [toDate, setToDate] = React.useState(dateFormat(currentDate, monthlyVersion ? 'yyyy-mm' : 'yyyy'));
    const [isDataLoading, setIsDataLoading] = React.useState(false)
    let resultData = null;

    const setMonthlyVersion = (bool) => {
        _setMonthlyVersion(bool);
        setFromDate(dateFormat(currentDate, bool ? 'yyyy-mm' : 'yyyy'));
        setToDate(dateFormat(currentDate, bool ? 'yyyy-mm' : 'yyyy'));
    }   // reevaluate other states on change

    const options = {
        monthlyVersion, fromBeg, setFromBeg, toToday, setToToday, currentDate, fromDate, setFromDate, toDate, setToDate
    }

    const navigate = useNavigate()

    function handleRequest() {
        axios.interceptors.request.use(config => {
            setIsDataLoading(true);
            resultData = null;
            return config;
        }, error => {
            setIsDataLoading(false);
            return Promise.reject(error);
        });

        axios({
            method: "GET",
            url: configData.SERVER_URL,
            responseType: 'json',
            params: {
                username: username,
                fromDate: fromDate,
                toDate: toDate,
                timezoneOffset: new Date().getTimezoneOffset(),
                isMonthlyVersion: monthlyVersion
            }

        })
            .then(response => {
                setIsDataLoading(false);
                resultData = response.data;
                console.log(fromDate)
                console.log(toDate)
                const timezoneOffset = (new Date()).getTimezoneOffset();
                console.log(timezoneOffset);
                navigate('/artist', {state: {data: resultData, monthlyVersion: monthlyVersion}});
            }, error => {
                setIsDataLoading(false);
                console.log(error);
            })
    }


    if (isDataLoading) {
        return (
            <Container fluid className='d-flex flex-column vh-100 justify-content-center align-items-center'>
                <img src={racc} alt='loading...'/><br/>
                Loading...
                <p className='text-muted'>be prepared for long loading time!</p>
            </Container>
            );
    }
    else {
        return (
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
                            <Button variant='outline-dark' className='mw-100' disabled={!Boolean(username)} onClick={() => handleRequest()}> go! </Button>
                        </Col>
                        <Col/>
                    </Row>
                </Form>
                <Form.Text className='text-muted'>Tip: click the rainbow text to switch modes!</Form.Text>
            </Container>
        );
    }
}

export default MainForm;
