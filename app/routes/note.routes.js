module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    var userHandlers = require('../controllers/auth.controller');


    app.route('/notes')
        .get(userHandlers.loginRequired, notes.findAll)
        .post(userHandlers.loginRequired, notes.create)

    app.route("/notes/:noteId")
        .get(userHandlers.loginRequired, notes.findOne)
        .put(userHandlers.loginRequired, notes.update)
        .delete(userHandlers.loginRequired, notes.delete)

    // Create a new Note
    // app.post('/notes', notes.create);

    // Retrieve all Notes
    // app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    // app.get('/notes/:noteId', notes.findOne);

    // // Update a Note with noteId
    // app.put('/notes/:noteId', notes.update);

    // // Delete a Note with noteId
    // app.delete('/notes/:noteId', notes.delete);

    // app
    //     .route("/auth/register")
    //     .post(userHandlers.register);
    // app
    //     .route("/auth/sign_in")
    //     .post(userHandlers.signIn);
}