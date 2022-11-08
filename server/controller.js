const houses = require('./db.json')
let houseId = 4
module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req,res) => {
        let index = houses.findIndex(el => el.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)

    },
    createHouse: (req,res) => {
        let {address, price, imageURL} = req.body
        let newHouse = {
            id: houseId,
            address,
            price,
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        houseId++
    },
    updateHouse: (req,res) => {
        let {type} = req.body
        let {id} = req.params
        let index = houses.findIndex(house => +house.id === +id)

        if(houses[index].price <= 10000 && type === 'minus'){
            houses[index].price = 0
        }else if(type === 'plus'){
            houses[index].price += 10000
        }else if(type === 'minus'){
            houses[index].price -= 10000
        }else {
            res.status(400)
        }
        res.status(200).send(houses)
    }
}