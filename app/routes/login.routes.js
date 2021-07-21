module.exports = (app) => {
    var userHandlers = require('../controllers/auth.controller');
    app
        .route("/auth/register")
        .post(userHandlers.register);
    app
        .route("/auth/sign_in")
        .post(userHandlers.signIn);
}