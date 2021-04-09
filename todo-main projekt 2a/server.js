if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const app = express();
const expressEjsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const flash = require('connect-flash') //
const session = require('express-session') //
const passport = require('passport') //

const {adminSetup, done} = require('./config/terminalcomands')

const indexRouter = require('./routes/index')
//const authorRouter = require('./routes/author')
//const bookRouter = require('./routes/books')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const toDoRouter = require('./routes/to-do')
const adminRouter = require('./routes/admin')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')


app.use('/public', express.static('public'));
app.use(expressEjsLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.use(express.urlencoded({extended : false}))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
})


app.use('/', indexRouter)
//app.use('/author', authorRouter)
//app.use('/books', bookRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/to-do', toDoRouter)
app.use('/admin', adminRouter)

require('./config/passport')(passport)



// CMD comands
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  console.log(text);

  switch (text.trim()) {
    case 'quit':
      done();
    break;
    case 'admin-setup':
      adminSetup();
    break;
    default:

  }
});








mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        //console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
})
app.listen(process.env.PORT || 3000)
