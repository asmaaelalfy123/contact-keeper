const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//@routes get /api/contacts/
//@desc  get  contact
//@access private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.send(contacts);
  } catch (error) {
    console.error(error.msg);
    res.status(500).json({ msg: 'server error' });
  }
});

//@routes Post /api/contacts/
//@desc  add  contact
//@access private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'please add contact name')
        .not()
        .isEmpty(),
      check('email', 'please add valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.send(contact);
    } catch (error) {
      console.error(error.msg);
      res.status(500).send('server errors');
    }
  }
);

//@routes put /api/contacts/:id
//@desc  update  contact
//@access private
router.put('/:id', auth, async (req, res) => {
  try {
    const contactfind = await Contact.findById(req.params.id);
    if (!contactfind) {
      return res.status(400).json({ msg: 'contact not found' });
    }
    const contactUpdate = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    const contactSaved = await contactUpdate.save();
    res.json(contactSaved);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('server errors');
  }
});

//@routes delete /api/contacts/:id
//@desc delete contact
//@access private
router.delete('/:id', async (req, res) => {
  try {
    const contactfind = await Contact.findById(req.params.id);
    if (!contactfind) {
      return res.status(400).json({ msg: 'contact not found' });
    }
    const contactUpdate = await Contact.findByIdAndDelete(
      req.params.id
    );

    res.json({});
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('server errors');
  }
});

module.exports = router;
