const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/node-vue')

let conn

const hanleError = () => {
    conn = mongoose.connection
    const Schema = mongoose.Schema
    conn.on('error', () => {
        console.error.bind(console, 'connection error')
    })
    conn.once('open', () => {
        console.log('database open success!')
    })
    conn.on('connected', () => {
        console.log('database connected success!')
    })
    conn.on('disconnected', () => {
            console.log('database disconnected!')
        })
        /* use schema 面向对象编程*/
    const userSchema = new Schema({
            name: String,
            password: String
        })
        /*const User = mongoose.model('User', userSchema);

    const cat = new User({
        name: 'hello cat!',
        password: '1111'
    });
    console.log(cat.name);

    userSchema.methods.speak =  function () {
        var greeting = this.name
        ? 'My name is ' + this.name : 'I has not name!'
        console.log(greeting);
    };
    const User2 = mongoose.model('User2', userSchema);
    const dogUser = new User2({name: 'dog'});
    dogUser.speak();

    /!*保存到数据库*!/
    dogUser.save(function (err, dog) {
        if (err) return console.error(err);
        dog.speak();
    });*/

    /* query 查询*/
    // User2 为数据库的集合
    const User2 = mongoose.model('User2', userSchema)
        /*var cat = new User2({
        name: 'hello cat!',
        password: '1111'
    });
    cat.save();*/
    User2.find({}, function(err, user) {
        if (err) return console.log(err)
    })

    /* const cwSchema = new Schema({
        title: String
    });
    const Cw = mongoose.model('Cw', cwSchema);

    Cw.createCollection().then(function (collection) {
        console.log('Collection is created!');
    });*/
}
hanleError()

exports.conn = conn