const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carsdb', {useNewUrlParser: true})
    .then(()=> console.log('Conectado correctamente a MongoDB'))
    .catch(()=> console.log('Error al conectarse a MongoDB'))

const carSchema = new mongoose.Schema({
    company: String,
    model: String,
    price: Number,
    year: Number,
    sold: Boolean,
    extras: [String],
    date: {type: Date, default: Date.now}
})

const Car = mongoose.model('car', carSchema)

getFilterPriceCars()

async function getFilterPriceCars(){
    const cars = await Car
        .find({price: {$gte: 1000, $lt: 5000}})

    console.log(cars)
}


//getMoreFilterCar()

async function getMoreFilterCar(){
    const cars = await Car
        .find({company: 'BMW', sold: false})
        .sort({price: 1})
        .limit(2)
        .select({company: 1, model: 1, price: 1})

    console.log(cars)    
}


//getCompanyAndSoldFilterCars()

async function getCompanyAndSoldFilterCars(){
    const cars = await Car.find({company: 'BMW', sold: false})
    console.log(cars)
}

//getCars()
async function getCars(){
    const cars = await Car.find()
    console.log(cars)
}


//createCar()
async function createCar(){
    const car = new Car({
        company: 'BMW',
        model: 'S1',
        price: 6000,
        year: 2020,
        sold: false,
        extras: ['Automatic', '4*4']
    })

    const result = await car.save()
    console.log(result)
}