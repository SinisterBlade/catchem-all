const request = require('request')
const fs = require('fs')
const http = require('http')

function generateJSON() {
    let pokemonNames = []

    let baseUrl = 'http://pokeapi.co/api/v2/'

    function PokePromise(id) {
        return new Promise((resolve, reject) => {
            request(baseUrl + 'pokemon/' + id, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let data = JSON.parse(body)
                    resolve(data.name)
                } else {
                    console.log('Error:', error)
                    console.log('Status Code:', response.statusCode)
                    reject()
                }
            })
        })
    }

    function getSomePokemon(howMany, fromId) {
        let idRange = Array.from({ length: howMany }, (val, index) => index + fromId)
        let promises = idRange.map((val) => PokePromise(val))
        return promises
    }

    let idRange = Array.from({ length: 10 }, (val, index) => index + 1)
    let promises = idRange.map((val) => PokePromise(val))

    Promise.all(getSomePokemon(10, 1))
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 11))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 21))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 31))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 41))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 51))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 61))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 71))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 81))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 91))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 101))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 111))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 121))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(10, 131))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            return Promise.all(getSomePokemon(11, 141))
        })
        .then((names) => {
            pokemonNames = pokemonNames.concat(names)
            console.log(names)
            fs.writeFile(__dirname + '/pokemon.json', JSON.stringify(pokemonNames, null, 4), (err) => {
                if (err)
                    console.log('Error writing file!')
                else
                    console.log('File written!')
            })
        })
        .catch(() => console.log('Error'))
}

function downloadImages() {
    let pokenames = require(__dirname + '/pokemon.json')

    function imagePromise(name) {
        return new Promise((resolve, reject) => {
            request('http://localhost:3000/scrape?num=100&q=' + name, {proxy: ''}, (err, response, body) => {
                if(!err && response.statusCode == 200) {
                    console.log('Caught', name)
                    resolve()
                } else {
                    console.log('Error: ' + err)
                    console.log('Status Code: ' + response.statusCode)
                    reject()
                }
            })

        })
    }

    function getImagePromises(howMany, fromId) {
        let toBeDownloaded = pokenames.slice(fromId, fromId + howMany)
        let promises = toBeDownloaded.map((name) => imagePromise(name))
        return promises
    }

    Promise.all(getImagePromises(4, 0))
        .then(() => Promise.all(getImagePromises(4, 4)))
        .then(() => Promise.all(getImagePromises(4, 8)))
        .then(() => console.log("Caught 'em all"))
        .catch(() => console.log('Something went wrong somewhere'))
}

downloadImages()