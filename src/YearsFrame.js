import {Container, Row} from "react-bootstrap";
import {motion} from "framer-motion";
import MonthCard from "./MonthCard";
import BigCard from "./BigCard";


const yearVariant = {
    hidden: {
        opacity: 0,
        x: '-50%',
        scale: 0
    },
    visible: {
        opacity: 1,
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

function YearFrame({year, monthlyVersion}) {
    return (
        <motion.div   variants={yearVariant}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true, amount: 0.1 }}>
            <Container className='mt-5 p-3 rounded-4 border border-light' style={{backgroundColor: 'rgba(255,255,255,0.6)'}}>
                <h1 style={{fontFamily: 'Monaco, Helvetica'}}>{year.year}</h1>
                <Row>
                    {year.months.map(function(each){
                        if (monthlyVersion)
                            return <MonthCard month={each}/>
                        else
                            return <BigCard thingy={each}/>
                    })
                    }
                </Row>
            </Container>
        </motion.div>
    )
}

function YearsFrame({data, monthlyVersion}) {
    if (data.length > 0) {
        return (
            <>
                {data.map(function(each) {
                    return(
                        <YearFrame year={each} monthlyVersion={monthlyVersion}/>
                    )
                })}
            </>
        )
    }
    return <>no years</>
}

export default YearsFrame;