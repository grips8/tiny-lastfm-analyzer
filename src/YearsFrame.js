import {Container, Row} from "react-bootstrap";
import {motion} from "framer-motion";
import MonthCard from "./MonthCard";

const yearsVariant = {
    hidden: {opacity: 1},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 9
        }
    }
}

const yearVariant = {
    hidden: {
        opacity: 0,
        x: '-100%',
        scale: 0
    },
    visible: {
        opacity: 1.5,
        x: 0,
        scale: 1,
        transition: {
            type: 'spring',
            duration: 1.5,
            delayChildren: 1,
            staggerChildren: 0.5
        }
    }
}

function YearFrame({year}) {
    return (
        <motion.div variants={yearVariant}>
            <Container className='mt-5 p-3 rounded-4 border border-light' style={{backgroundColor: 'rgba(255,255,255,0.6)'}}>
                {year.year}
                <Row>
                    {year.months.map(function(each){
                        return <MonthCard month={each}/>})
                    }
                </Row>
            </Container>
        </motion.div>
    )
}

function YearsFrame({data}) {
    if (data.length > 0) {
        return (
            <motion.div variants={yearsVariant} initial='hidden' animate='visible'>
                {data.map(function(each) {
                    return(
                        <YearFrame year={each}/>
                    )
                })}
            </motion.div>
        )
    }
}

export default YearsFrame;