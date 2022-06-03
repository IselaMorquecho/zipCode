import React, {useEffect, useState} from 'react';
import {
    Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Paper,
    Typography
} from '@mui/material/';
import './FormZip.css';
import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import Results from './Results'
import History from "./History";

interface Country {
    code: string,
    name: string
}

interface Places {
    state: string,
    place_name: string
}

interface HistoryElement {
    zipCode:string,
    city:string,
    state:string
}


const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL,
    cache: new InMemoryCache()
});

const GET_DATA = gql`
    query ExampleQuery($countryCode: String, $postalCode: String) {
      country(country_code: $countryCode, zip_code: $postalCode) {
        places {
          state
          place_name
        }
      }
}  
`;


function FormZip() {
    const [country, setCountry] = useState('us');
    const [zipCode, setZipCode] = useState('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [data, setData] = useState<Places[]>([]);
    const [error, setError] = useState(false);
    const [history, setHistory] = useState<HistoryElement[]>([]);

    useEffect(() => {
        setCountries([
            {
                code: 'ca',
                name: 'Canada'
            },
            {
                code: 'br',
                name: 'Brazil'
            },
            {
                code: 'us',
                name: 'United States'
            },
            {
                code: 'mx',
                name: 'Mexico'
            },


        ]);
        const ls = localStorage.getItem('zipCodeHistory')
        if(!ls){
            setHistory([])
            localStorage.setItem('zipCodeHistory', JSON.stringify([]))
        }
        else{
            setHistory(JSON.parse(ls))
        }
    }, []);

    useEffect(() => {
        if(history.length>0){
            localStorage.setItem('zipCodeHistory', JSON.stringify(history))
        }

    },[history])

    const handleClick = () => {
        client.query(
            {
                query: GET_DATA,
                variables: {
                    countryCode: country,
                    postalCode: zipCode
                }
            }
        ).then(result => {
            setError(false)
            setData(result.data.country.places)
            let historyElement = {
                zipCode: zipCode,
                city: result.data.country.places[0].place_name,
                state: result.data.country.places[0].state
            }

            setHistory(oldHistory => {
                if(oldHistory.length === 5){
                    oldHistory.shift()
                }
                return [...oldHistory, historyElement]
            })
        })
            .catch(error => {
                console.error(error)
                setData([])
                setError(true);
            })
    }

    const handleCleanHistory = () => {
        localStorage.removeItem('zipCodeHistory')
        setHistory([])
    }
    return (
        <React.Fragment>
            <Paper className={'Container'} elevation={24}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={"h2"} className={'Title'}>
                            {'Zip Code Finder'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value as string)}
                            >
                                {
                                    countries.map((country: Country) =>
                                        <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                                    )

                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="zip-code" fullWidth
                                   label="Zip code" variant="outlined"
                                   required
                                   value={zipCode}
                                   onChange={(e) => setZipCode(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={'ContainerButton'}>
                        <Button variant={'contained'} className={'Button'}
                                onClick={handleCleanHistory}
                        >
                            Clear history
                        </Button>
                        <Button variant={'contained'} className={'Button'}
                                disabled={zipCode.trim() === ''}
                                onClick={handleClick}
                        >
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Results data={data} error={error} country={country}/>
                    </Grid>
                    <Grid item xs={12}>
                       <History history={history}/>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}

export default FormZip;