module.exports = (app) => {
    const users = require('../controller/user.controller')

    // create new user 

    app.post('/users', users.create)

    // retrive all users 

    app.get('/users', users.findAll)

    // retive by id 

    app.get('/users/:userId', users.findOne);

    // update user 
    app.put('/users/:userId', users.update);

    //delete user

    app.delete('/users/:userId', users.delete)
}