import {Card, Col} from "react-bootstrap";
import {motion, useAnimationControls} from "framer-motion";
import {useState} from "react";


let colors = ['#88D498', '#FFA737', '#F7B2AD', '#FF715B',
    '#E01A4F', '#F15946', '#F9C22E', '#53B3CB',
    '#EF8354', '#EE4B6A', '#31D843', '#2AB7CA',
    '#E6E6EA', '#F02D3A']

const cardBackVariant = {
    hidden: {rotateY: 180},
    visible: {
        rotateY: 90,
        transition: {duration: 0.5}
    }
}

const cardFrontVariant = {
    hidden: {rotateY: 90},
    visible: {
        rotateY: 0,
        transition: {duration: 1}
    }
}

const cardMockVariant = {
    hidden: {},
    hover: {}
}

const cardBlurVariant = {
    hidden: {},
    hover: { filter: 'blur(10px)'}
}

const cardDetailsVariant = {
    hidden: { opacity: 0 },
    hover: { opacity: 1 }
}



function BigCard({thingy}) {
    const [showFront, setShowFront] = useState(false);
    const [c] = useState([Math.floor(Math.random() * colors.length), Math.floor(Math.random() * colors.length)]);

    const controls = useAnimationControls();

    const scrLabel = thingy.secondLabel === "" ? "" : "scrobbles:";

    return (
        <Col xs={12} sm={6} md={6} lg={4} xl={4} className='mt-3'>
            <div hidden={showFront}>
                <motion.div variants={cardBackVariant} animate={controls} onAnimationComplete={() => setShowFront(true)} onClick={() => controls.start('visible')}>
                    <Card style={{width: '100%', aspectRatio: '1/1.4', background: 'linear-gradient(140deg, '+ colors[c[0]] +' 0%, '+ colors[c[1]] +' 100%)'}}>
                    </Card>
                </motion.div>
            </div>
            <div hidden={!showFront}
                 style={{position: 'relative'}}
            >
                <motion.div variants={cardFrontVariant}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true, amount: 'some' }}>
                    <motion.div variants={cardMockVariant} initial='hidden' whileHover='hover'>
                        <motion.div variants={cardBlurVariant}>
                            <Card
                                className='align-items-center'
                                style={{width: '100%',
                                    aspectRatio: '1/1.4',
                                    background: 'linear-gradient(140deg, '+ colors[c[0]] +' 0%, '+ colors[c[1]] +' 100%)'
                                }}
                            >
                                <Card.Img
                                    variant={"top"}
                                    src={thingy.img}
                                    style={{aspectRatio: '1/1',
                                        objectFit: 'contain',
                                        backgroundColor: 'rgba(255,255,255,0.5)'
                                    }}
                                />
                                <Card.Subtitle className='mt-1'>{thingy.month}</Card.Subtitle>
                                <hr/>
                                <Card.Title className='mt-1 text-center fw-bold'>{thingy.name}</Card.Title>
                            </Card>
                        </motion.div>
                        <motion.div variants={cardDetailsVariant}>
                            <Card
                                className='justify-content-center align-items-center'
                                style={{width: '100%',
                                    aspectRatio: '1/1.4',
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    position: 'absolute',
                                    top: '0px'
                                }}
                            >
                                <Card.Title>name:</Card.Title>
                                <Card.Title className='fw-bold text-center'>{thingy.name}</Card.Title>
                                <Card.Subtitle>scrobbles: {thingy.scrobbles}</Card.Subtitle>
                                <hr/>
                                <Card.Title>{thingy.secondLabel}</Card.Title>
                                <Card.Title className='fw-bold text-center'>{thingy.second}</Card.Title>
                                <Card.Subtitle>{scrLabel} {thingy.secondScrobbles}</Card.Subtitle>
                                <hr/>
                                <Card.Title>{thingy.thirdLabel}</Card.Title>
                                <Card.Title className='fw-bold text-center'>{thingy.third}</Card.Title>
                                <Card.Subtitle>{scrLabel} {thingy.thirdScrobbles}</Card.Subtitle>
                            </Card>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </Col>
    )
}

export default BigCard;