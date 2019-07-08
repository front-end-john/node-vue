const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/node-vue')

let conn

function hanleError() {
    conn = mongoose.connection
    const Schema = mongoose.Schema
    conn.on('error', function() {
        console.error.bind(console, 'connection error')
    })
    conn.once('open', function() {
        console.log('database open success!')
    })
    conn.on('connected', function() {
        console.log('database connected success!')
    })
    conn.on('disconnected', function() {
            console.log('database disconnected!')
        })
        /* use schema 面向对象编程*/
    var userSchema = new Schema({
            name: String,
            password: String
        })
        /*var User = mongoose.model('User', userSchema);

    var cat = new User({
        name: 'hello cat!',
        password: '1111'
    });
    console.log(cat.name);

    userSchema.methods.speak =  function () {
        var greeting = this.name
        ? 'My name is ' + this.name : 'I has not name!'
        console.log(greeting);
    };
    var User2 = mongoose.model('User2', userSchema);
    var dogUser = new User2({name: 'dog'});
    dogUser.speak();

    /!*保存到数据库*!/
    dogUser.save(function (err, dog) {
        if (err) return console.error(err);
        dog.speak();
    });*/

    /* query 查询*/
    // User2 为数据库的集合
    var User2 = mongoose.model('User2', userSchema)
        /*var cat = new User2({
        name: 'hello cat!',
        password: '1111'
    });
    cat.save();*/
    User2.find({}, function(err, user) {
        if (err) return console.log(err)
    })

    /* var cwSchema = new Schema({
        title: String
    });
    var Cw = mongoose.model('Cw', cwSchema);

    Cw.createCollection().then(function (collection) {
        console.log('Collection is created!');
    });*/
}
hanleError()

exports.conn = conn