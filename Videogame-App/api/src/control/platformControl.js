const axios = require('axios')
const { API_KEY } = process.env;

const getPlatforms = async(req, res) => {
    try {
        let platformApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        let apiInfo = platformApi.data.results;
        const platformsArr = apiInfo.map(e => e.name)

        const platforms = platformsArr.sort((a,b) => {
            let first = a.toString().toLowerCase()
            let second = b.toString().toLowerCase() 
            if (first > second) return 1;
            if (first < second) return -1;
            else return 0;            
        })

        return res.send(platforms)

    } catch (error) {
        res.status(404).send('Platform not found')
    }
}

module.exports = {
    getPlatforms
}