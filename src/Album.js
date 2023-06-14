import {useLocation} from "react-router-dom";
import YearsFrame from "./YearsFrame";

function Album() {
    const {state} = useLocation();
    if (state !== null) {
        const {data, monthlyVersion} = state;
        if (data !== undefined) {
            return <YearsFrame data={data.album} monthlyVersion={monthlyVersion}/>
        }
    }
    return ('404')
}

export default Album;