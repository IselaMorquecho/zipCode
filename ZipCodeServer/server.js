const { ApolloServer, gql } = require('apollo-server');
import {RESTDataSource} from 'apollo-datasource-rest';

class ZippopotamAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://api.zippopotam.us/'
    }

    async getCountry(country_code, zip_code){
        const _data = await this.get(`${country_code}/${zip_code}`)
        let country = {
                post_code: _data['post code'],
                country: _data['country'],
                country_abbreviation: _data['country abbreviation'],
                places: _data.places.map(place => ({
                    place_name: place['place name'],
                    longitude: place.longitude,
                    state: place.state,
                    state_abbreviation: place['state abbreviation'],
                    latitud: place.latitude
                }))
            }
        return country;

    }
}

const typeDefs = gql`
  type Place {
    place_name: String
    longitude: String
    state: String
    state_abbreviation: String
    latitud: String
  }
  
  type Country {
    post_code: String
    country: String
    country_abbreviation: String
    places: [Place]
  }
  
  type Query {
    country(country_code: String, zip_code: String): Country 
    }
`;


const resolvers = {
    Query: {
        country: async (_,{country_code, zip_code},{dataSources}) => {
            return dataSources.zippopotamAPI.getCountry(country_code, zip_code);
        }
    },
};



const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    dataSources: () =>{
        return {
            zippopotamAPI: new ZippopotamAPI()
        }
    }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});