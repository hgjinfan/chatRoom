const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const staticServer = require('koa-static')
const db = require('./db/db.js')
const UserController = require('./controller/User/user')

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chat message', (msg) => {
        console.log(msg)
        // socket.broadcast.emit(msg)
        io.emit('chat message', msg)
    })
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('someone leave', 'leave')
    });
});

const nsp = io.of('/my-room')
nsp.on('connection', function (socket) {
    console.log('someone connected')
    nsp.emit('hi', 'everyone!')
})

io.emit('chat message', {
    for: 'everyone'
})

// router
router.get('/getList', UserController.getList)

app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(staticServer(__dirname + "/static"))
// app.listen(3000)
server.listen(3000, () => {
    console.log('listening on http://localhost:3000')
})