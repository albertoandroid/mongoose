const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carsdb2', {useNewUrlParser: true})
    .then(()=> console.log('Conectado correctamente a MongoDB'))
    .catch(()=> console.log('Error al conectarse a MongoDB'))

const carSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true,
        //lowercase: true,
        uppercase: true,
        trim: true,
        minlength: 2,
        maxlength: 99,
        enum: ['BMW', 'AUDI']
    },
    model: String,
    sold: Boolean,
    price: {
        type: Number,
        required: function(){
            return this.sold
        }
    },
    year: {
        type: Number,
        min: 2000,
        max: 2030,
        get: y => Math.round(y)
    },
    extras: [String],
    date: {type: Date, default: Date.now},
})

const Car = mongoose.model('car', carSchema)

createCar()

async function createCar(){
    const car = new Car({
        //company: 'AUDI',
        model: 'X7',
        price: 6000,
        year: 2029,
        sold: true,
        extras:['4*4']
    })

    try{
        const result = await car.save()
        console.log(result)
    }catch(e){
        console.group(e.message)
    }
    
}
