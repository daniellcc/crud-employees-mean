const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
  if(req.body.company && req.body.email && req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await user.create({
      company: req.body.company,
      email: req.body.email,
      password: hashedPassword
    })
    .then(() => res.status(200).send({ success: 'created' }))
    .catch(err => console.log(err));
  }
  else res.status(406).send({ error:'sorry buddy, we need everything' });
});

module.exports = router;