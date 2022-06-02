import React from 'react'
import {Typography
} from '@mui/material/';
function Place({place}:{place:any}){
    return(
        <div style={{textAlign:'left'}}>
                <Typography display={'inline'} variant={'h6'}>{`State:`}</Typography>
                <Typography display={'inline'}>{`${place.state}`}</Typography>
                <Typography display={'inline'} variant={'h6'}>{`   City:`}</Typography>
                <Typography display={'inline'}>{`${place.place_name}`}</Typography>
        </div>
    )
}

export default Place