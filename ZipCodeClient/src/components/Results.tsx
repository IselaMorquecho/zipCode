import Place from "./Place";
import React from "react";
import {Typography} from "@mui/material";

interface Places {
    state: string,
    place_name: string
}

function Results({data, error, country}:{data: Places[], error: boolean, country: string}){
    return(
        <div>
            <Typography variant={'h4'} className={'Title'} id={'resultsTitle'} >Results</Typography>
            {
                data?.length>0 &&
                <ul>
                    {
                        data.map(item => {
                            return (
                                <li data-test-id={'placeContainer'}>
                                    <Place key={item.place_name} place={item}/>
                                </li>
                            )
                        })
                    }
                </ul>
            }
            {
                error && <Typography className={'Error'}>{`Error, try another zip code for ${country} country`} </Typography>
            }

        </div>
    )
}

export default Results;