import {RESTDataSource} from "apollo-datasource-rest";

class ZippopotamAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://api.zippopotam.us/'
    }

    async getCountry(country_code='EU'){
        const previos = await this.get(`${country_code}`)
        return previos.map(country =>  ({
            post_code: country['post code'],
            country: country['country'],
            country_abbreviation: country['country abbreviation'],
            places: country.places
             })
        )
    }
}

export default ZippopotamAPI