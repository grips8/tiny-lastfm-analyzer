import {Card, Col} from "react-bootstrap";
import {motion} from "framer-motion";
import {useState} from "react";


let colors = ['#88D498', '#FFA737', '#F7B2AD', '#FF715B',
    '#E01A4F', '#F15946', '#F9C22E', '#53B3CB',
    '#EF8354', '#EE4B6A', '#31D843', '#2AB7CA',
    '#E6E6EA', '#F02D3A']

const monthBackVariant = {
    hidden: {rotateY: 180},
    visible: {
        rotateY: 90,
        transition: {duration: 0.5}
    }
}

const monthFrontVariant = {
    hidden: {rotateY: 90},
    visible: {
        rotateY: 0,
        transition: {duration: 0.5}
    }
}



function MonthCard({month}) {
    const [showFront, setShowFront] = useState(false);
    const [c] = useState([Math.floor(Math.random() * colors.length), Math.floor(Math.random() * colors.length)]);
    const [blurDetails, setBlurDetails] = useState(false);

    return (
        <Col xs={6} sm={4} md={3} xl={2} className='mt-3'>
            <div hidden={showFront}>
                <motion.div variants={monthBackVariant} onAnimationComplete={() => setShowFront(true)}>
                    <Card style={{width: '100%', aspectRatio: '1/1.4', background: 'linear-gradient(140deg, '+ colors[c[0]] +' 0%, '+ colors[c[1]] +' 100%)'}}>
                    </Card>
                </motion.div>
            </div>
            <div hidden={!showFront}
                 style={{position: 'relative'}}
                 onMouseEnter={() => setBlurDetails(true)}
                 onMouseLeave={() => setBlurDetails(false)}
            >
                <motion.div variants={monthFrontVariant}>
                    <Card
                        className='align-items-center'
                        style={{width: '100%',
                            aspectRatio: '1/1.4',
                            background: 'linear-gradient(140deg, '+ colors[c[0]] +' 0%, '+ colors[c[1]] +' 100%)',
                            filter: blurDetails ? 'blur(10px)' : ''
                    }}
                    >
                        <Card.Img variant={"top"} src={month.img}/>
                        <Card.Subtitle className='mt-1'>{month.month}</Card.Subtitle>
                        <Card.Title className='mt-1'>{month.name}</Card.Title>
                    </Card>
                    <Card
                        className='justify-content-center align-items-center'
                        style={{width: '100%',
                            aspectRatio: '1/1.4',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            position: 'absolute',
                            top: '0px'
                        }}
                        hidden={!blurDetails}
                    >
                        <Card.Title>1st: {month.name}</Card.Title>
                        <Card.Subtitle>scrobbles: {month.scrobbles}</Card.Subtitle>
                        <hr/>
                        <Card.Title>2nd: {month.second}</Card.Title>
                        <Card.Subtitle>scrobbles: {month.secondScrobbles}</Card.Subtitle>
                        <hr/>
                        <Card.Title>3rd: {month.third}</Card.Title>
                        <Card.Subtitle>scrobbles: {month.thirdScrobbles}</Card.Subtitle>
                    </Card>
                </motion.div>
            </div>
        </Col>
    )
}

export default MonthCard;