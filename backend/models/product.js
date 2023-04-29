const mongoose= require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Price cannot exceed 100 characters'],
        default: 0.0
    },
    description:{
        type: String,
        required: [true, 'Please enter product name'],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }

        }
    ],
    

})

module.exports = mongoose.model('Product', productSchema);