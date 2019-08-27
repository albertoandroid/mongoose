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

createCar()

async function createCar(){
    const car = new Car({
        company: 'BMW',
        model: 'X3',
        price: 2000,
        year: 2019,
        sold: false,
        extras: ['Automatic', '4*4']
    })

    const result = await car.save()
    console.log(result)
}