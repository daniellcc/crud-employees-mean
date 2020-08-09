const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
  if(req.body.email && req.body.password) {
    await user.findOne({ email: req.body.email }, async (err, result) => {
      if(err) {
        res.status('406')
          .send({ error: 'sorry your account doesn\' exist' });
      }
      
      else {
        await bcrypt.compare(req.body.password, result.password, (errComparing, successCompared) => {
          if(errComparing) res.status(500).send({ error: errComparing });

          successCompared
            ? res.status(200).send({ success: 'welcome buddy', user: result })
            : res.status(403).send({ fail: 'sorry the password is invalid' });
        });
      }
        
    });
  }
  else res.status(400).send({ error: 'Sorry, we need every email and password' });
});

module.exports = router;