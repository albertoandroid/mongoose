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

getCompanyAndSoldFilterCars()

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
        company: 'Audi',
        model: 'A3',
        price: 6000,
        year: 2020,
        sold: true,
        extras: ['Automatic', '4*4']
    })

    const result = await car.save()
    console.log(result)
}