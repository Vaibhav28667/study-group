const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Model = require('../models/groupmodel');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/add', (req, res) => {
    // res.send(req.body);
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })

});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);

            res.status(500).json(err);
        });
})

router.get('/getbyname/:name', (req, res) => {
    Model.find({ name: req.params.name })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);

        });


})

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
})

router.put('/addmember/:id', auth, (req, res) => {
    console.log(req.body);

    Model.findById(req.params.id)
        .then((result) => {
            if (result.membersArray.includes(req.user._id)) {
                return res.status(400).json({ message: 'Member Already exists' });
            }
            Model.findByIdAndUpdate(req.params.id, { $push: { membersArray: req.user._id } }, { new: true })
                .then((result) => {
                    res.status(200).json(result);
                }).catch((err) => {
                    res.status(500).json(err);
                    console.log(err);
                });
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
})

router.get('/getjoinedgroups', auth, (req, res) => {
    Model.find({ membersArray: req.user._id })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

router.get('/getownedgroups', auth, (req, res) => {
    Model.find({ owner: req.user.name })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                // Authentication successful
                // Generate JWT Token

                const { _id, name, } = result; //Destructuring
                const payload = { _id, name, };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: 'Error generating token' });
                    } else {
                        res.status(200).json({ token });
                    }
                })

            } else {
                // Authentication Failed
                res.status(401).json({ error: ' Invalid credentials' });

            }
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);

        });
})

module.exports = router;