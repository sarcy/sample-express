require('dotenv').config();
var express = require('express'),
    bp      = require('body-parser'),
    app     = express(),
    router  = express.Router(),
    port    = process.env.PORT || 3000;

// app.get('/sample', function (req, res, next) {
//   res.send('This is a sample!');
// });

// Use the body-parser as a middleware for all the routes and parse it as json.
app.use(bp.json());
app.use(bp.urlencoded({extended : false}));

// Setting up the Router middleware. This is executed every time a request comes to the server. The location of this is important in express because the middleware are run in the order they appear in the file. Too late and the middleware won't run.
router.use(function (req, res, next) {
  console.log('User requested', req.method, req.url);

  // Run the next middleware in the chain.
  next();
});

// Using the param middleware function. This will only run for the name request parameter.
router.param('name', function (req, res, next, name) {
  console.log('Doing some validation on the name parameter.');

  // Setting the name to the req.name variable.
  req.name = name;

  // Run the next middleware in the chain.
  next();
})

// The name for each individual page.
router.get('/', function (req, res) {
  //res.send('This is the homepage.');
  res.sendFile(__dirname + '/app/home.html');
});

router.get('/about', function (req, res) {
  //res.send('The about us page.');
  res.sendFile(__dirname + '/app/about.html');
});

router.get('/hello', function (req, res) {
  res.send('Hello World!');
})

router.get('/hello/:name', function (req, res) {
  res.send('Hello ' + req.name + '.');
});


app.route('/login')
  .get(function (req, res) {
    // res.send('This is the login form.');
    res.sendFile(__dirname + '/app/login.html');
  })
  .post(function (req, res) {
    //console.log('Processing the form.', req);
    //console.log(req.body);
    console.log('Processing the form for ', req.body.username);
    //res.send('Processing the login form.');
    res.redirect('/hello/' + req.body.username);
  });

// This sets the URL Context.
app.use('/', router);

app.listen(port);
console.log('Server running on port', port);
