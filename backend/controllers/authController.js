const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors= require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

//register a user
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
    const { name, email, password }= req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/kccvibpsuiusmwfepb3m',
            url: 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png'
        }
    })

    sendToken(user, 200, res)
})

//Login user
exports.loginUser = catchAsyncErrors( async (req, res, next) =>{
    const { email, password } =req.body;

    //checks if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & Password', 400))
    }

    //finding user in database
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res)
})

