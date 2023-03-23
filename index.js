const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 3000;
const host = '127.0.0.1';

const adminRoutes = require('./routes/admin');
const sequelize = require('./util/database');

const app = new express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin',adminRoutes);

(async function() {
    try{
        await sequelize.sync()
        app.listen(port,host,()=>{
            console.log(`Server is running at ${host} on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
})();