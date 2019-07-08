const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/node-vue')

const handleConnection = () => {
    const { connection } = mongoose
    connection.on('error', () => {
        console.error.bind(console, 'connection error')
    })
    connection.once('open', () => {
        console.log('database open success!')
    })
    connection.on('connected', () => {
        console.log('database connected success!')
    })
    connection.on('disconnected', () => {
        console.log('database disconnected!')
    })
}

exports.connection = handleConnection