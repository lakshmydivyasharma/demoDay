module.exports = function(app, passport, db) {
  const ObjectID = require('mongodb').ObjectID
  app.get('/draw', )
  // find one thats rendereing a template and start there

  // create another route for API to retreive a compound
  // put the object here, so itll be a JS object
  // endpoint thats starting the data --> creating a route that the API is sending a request to and thats where it gets the data


  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => { //callback function
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user : req.user, // this is the data object we are passing to the template
        messages: result // array of messages that we are looking in the database
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================

  app.post('/messages', (req, res) => {
    db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/profile')
    })
  })

  app.put('/messages', (req, res) => {
    db.collection('messages')
    .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
      $set: {
        thumbUp:req.body.thumbUp + 1
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })


  app.delete('/messages', (req, res) => {
    db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // routes for each lab
  app.get('/lab/:id', function(req, res) {
    const id = req.params.id //got the id off the request
    db.collection('messages').findOne( // gave us all the data that the ID refers to
      { _id: new ObjectID(id) } // object literals
    ).then((result) => {    //write .then after you do the function call .then is also a function
      console.log(result)
      res.render('lab.ejs', { lab: result}) //return the property from the fineOne function LAB INFO GOT SWITCHED TO RESULT BC OF LINE 135

    }).catch (err => console.log(err))
  });


  app.put('/lab', (req, res) => {
    db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, { //find the one by searching for the ID; req.body.id --> when we call the API, the molecule.js, whatever we pass in as a body is going to be like an object it hsould have the idea and thats where the request comes from
      $set: {
        smiles:req.body.smiles // same as line 131, basically an object like id and smart. search forr rdb entrey and smart to update database entry
      }
    }, (err, result) => {
      console.log(result)
      if (err) return res.send(err)
      res.send(result)
    })
  })
}
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();

  res.redirect('/');
}
