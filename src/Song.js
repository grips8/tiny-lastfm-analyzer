import {useLocation} from "react-router-dom";
import YearsFrame from "./YearsFrame";

function Song() {
    const {state} = useLocation();
    if (state !== null) {
        const {data, monthlyVersion} = state;
        if (data !== undefined) {
            return <YearsFrame data={data.song} monthlyVersion={monthlyVersion}/>
        }
    }
    return ('404')
}

export default Song;