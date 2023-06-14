import YearsFrame from "./YearsFrame";
import {useLocation} from "react-router-dom";

function Artist() {
    const {state} = useLocation();
    if (state !== null) {
        const {data, monthlyVersion} = state;
        if (data !== undefined) {
            return <YearsFrame data={data.artist} monthlyVersion={monthlyVersion}/>
        }
    }
    return ('404')
}

export default Artist;