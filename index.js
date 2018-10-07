const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const staticServer = require('koa-static')

const userScheam = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String
})

userScheam.method.saveSuccess = () => {
    console.log('save success')
}

var User = mongoose.model('User', userScheam)

var xu = new User({
    name: 'xu',
    age: 24,
    sex: 'male'
})

xu.save((err,xu) => {
    if(err) {
        return console.error(err)
    }
    xu.saveSuccess()
})

app.use(staticServer(__dirname + "/static"))

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chat message', (msg) => {
        console.log(msg)
        // socket.broadcast.emit(msg)
        io.emit('chat message', msg)
    })
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('someone leave','leave')
    });
});

var nsp = io.of('/my-room')
nsp.on('connection', function (socket) {
    console.log('someone connected')
    nsp.emit('hi', 'everyone!')
})



io.emit('chat message', {
    for: 'everyone'
})

// app.listen(3000)
server.listen(3000, () => {
    console.log('listening on http://192.168.0.105:3000')
})