const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/node-vue')

function handleConnection() {
    const { connection } = mongoose
    connection.on('error', function() {
        console.error.bind(console, 'connection error')
    })
    connection.once('open', function() {
        console.log('database open success!')
    })
    connection.on('connected', function() {
        console.log('database connected success!')
    })
    connection.on('disconnected', function() {
        console.log('database disconnected!')
    })
}

exports.connection = handleConnection