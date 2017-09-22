const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');

const ObjectId = require('mongodb').ObjectId;

function apiRouter(database) {

  const router = express.Router();

  router.use(
    // checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate' })
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/api/authenticate', '/api/checkToken'] })
  );

  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message });
    }
  });

  router.get('/contacts', (req, res) => {

    const contactsCollection = database.collection('contacts');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  //New route
  router.get('/contacts/:id', (req, res) => {

    let id = req.params.id;
    const contactsCollection = database.collection('contacts');

    contactsCollection.findOne({ _id: ObjectId(id) }, (err, result) => {
      return res.status(201).json(result);
    });

  });

  router.post('/contacts', (req, res) => {
    const user = req.body;

    const contactsCollection = database.collection('contacts');

    contactsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });

  router.post('/authenticate', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    usersCollection
      .findOne({ username: user.username }, (err, result) => {
        if (!result) {
          return res.status(404).json({ error: 'user not found' })
        }

        let hash = bcrypt.hashSync(result.password, 10);

        if (!bcrypt.compareSync(user.password, result.password)) {
          // if (!bcrypt.compareSync(user.password, hash)) {
          return res.status(401).json({ error: 'incorrect password ' });
        }

        const payload = {
          username: result.username,
          admin: result.admin
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

        return res.json({
          message: 'successfuly authenticated',
          token: token
        });
      });
  });

  router.post('/checkToken', function (req, res) {

    var token = req.body.token;

    if (token) {

      jwt.verify(token, process.env.JWT_SECRET, function (err, validToken) {

        if (err) {

          res.json({
            success: false,
            message: 'Invalid token'
          })

        } else {

          if (validToken.admin) {
            res.json({
              success: true,
              message: 'Authenticated as Admin'
            });
          }

          // if (!validToken.admin) {
          //   res.json({
          //     success: true,
          //     message: 'Authenticated as Super Admin'
          //   });
          // }

        }
      });
    } else {
      res.json({
        success: false,
        message: 'No token provided'
      });
    }
  });

  return router;
}

module.exports = apiRouter;
