const Users = require('../models/user.model');


exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'user data can not be empty'
        });
    }

    const users = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        profileImg: req.body.profileImg
    });

    users.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong'
            });
        });
};

exports.findAll = (req, res) => {
    Users.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Someting went wrong'
            });
        });
}

exports.findOne = (req, res) => {
    Users.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'user not found'
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'user not found'
                });
            }
            return res.status(500).send({
                message: 'Error while retriving'
            })
        })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'User data not found'
        });
    }

    Users.findByIdAndUpdate(req.params.userId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            profileImg: req.body.profileImg
        }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'user not found' + req.params.userId
                });
            }

            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'error upating the user' + req.params.userId
                })
            }
            return res.status(500).send({
                message: 'error  updating user' + req.params.userId
            });
        });
}

exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: ' user not found' + req.params.userId
                });
            }
            res.send({
                message: 'User deleted successfully!!!!!!!'
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found" + req.params.userId
                });
            }

            return res.status(500).send({
                message: 'Cound not delete the user' + req.params.userId
            });
        });
}