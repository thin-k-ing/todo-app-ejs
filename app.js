const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = ['buy food', 'cook food', 'eat food'];

app.get('/', function(req, res) {
    // tests whether today is a weekend
    let today = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    res.render('list', { day: today.toLocaleDateString('en-US', options), items: items });
});

app.post('/', function(req, res) {
    console.log(req.body.newToDo);
    items.push(req.body.newToDo);
    res.redirect('/');
});


app.listen(3000, function() {
    console.log('Server is running on port 3000');
});