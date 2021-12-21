const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = ['buy food', 'cook food', 'eat food'];
let workItems = [];

app.get('/', function(req, res) {
    res.render('list', { listTitle: date.getDate(), items: items });
});

app.post('/', function(req, res) {
    console.log(req.body);

    let item = req.body.newToDo;

    if (req.body.submitButton === 'Work') {
        workItems.push(req.body.newToDo);
        res.redirect('/work');
    } else {
        items.push(req.body.newToDo);
        res.redirect('/');
    }
});

app.get('/work', function(req, res) {
    res.render('list', { listTitle: 'Work', items: workItems });
});

app.get('/about', function(req, res) {
    res.render('about');
});


app.listen(3000, function() {
    console.log('Server is running on port 3000');
});