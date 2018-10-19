const C = require('../../config/appConfig');
const AdminLogin = require('../models/admin_login');
const AdminLoginDb = require('../controllers/database/admin_login_db');
const AdminAddNewsDb = require('../controllers/database/admin_page_db');
const UserModel = require('../models/user');
const AdminUserDb = require('../controllers/database/admin_person_db');


// login page
exports.login = function(req, res, next) {

    if (req.session.authenticated === false) {
        res.redirect('admin/dashboard');
    }

    res.render('admin/login', {
        title: 'Connexion to the FSCV administration panel',
        body: 'Please enter your information :'
    });

};

// login attempt
exports.login_do = function(req, res, next) {


    let username = req.body.username;
    let pwd = req.body.pwd;
    let session = req.session;
    let adminLogin = null;

    console.log(username + " is trying to connect");


        // get the query
        let query = AdminLoginDb.getByUsername(username);

        // querying db
        C.db.query(query, function (err, rows, fields) {
            if (err) throw(err);

            // populate with db output
            if (rows[0] !== `undefined`)
                adminLogin = new AdminLogin(rows[0]);

            if(adminLogin === 'undefined'){

                res.render('admin/error', {

                    title: 'Error while connecting',
                    errorMessage:  'User unknown'
                });

                console.log("User unknown");
            }
            else if (adminLogin.Password == pwd){
                req.session.id = adminLogin.userId;
                req.session.authenticated = true;
                req.session.save();

                console.log('Client ' + session.id + ' connected ...');

                res.redirect('admin/dashboard');

            }
            else {
                res.render('admin/error', {
                    title: 'Error while connecting',
                    errorMessage:  'Wrong password'
                });

                console.log("Password wrong for user " + adminLogin.Username);
            }

        });


};

// logout
exports.logout_do = function(req, res, next) {

    req.session.destroy();

    res.redirect('/');
};


//affichage de la page admin
exports.dashboard = function(req, res, next) {

    res.render('admin/dashboard', {
        title: 'Bienvenue sur l\'admin du site Chanter.ch',
    });

};

exports.menu = function (req, res, next) {

    res.render('admin/menu', {
        title: 'Add/Edit/Remove Menu'
    });

};

exports.page = function(req, res, next) {

    res.render('admin/page', {
        title: 'page : page',

    });
};

exports.choir = function(req, res, next) {

    res.render('admin/choir', {
        title: 'Gérer vos choeurs',

    });
};

exports.person = function(req, res, next) {

    res.render('admin/person', {
        title: 'page : personnes',

    });
};


exports.admin_person_insert = function(req, res, next) {

    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let phonePrivate = req.body.phonePrivateP;
    let phoneProf = req.body.phoneProfP;
    let email = req.body.emailP;
    //let startAbo = req.body.startAboP;

    console.log(req.body.startAboP);

    var usermodel = new UserModel({
        Lastname: lastname,
        Firstname: firstname,
        Phone: phonePrivate,
        PhoneProf: phoneProf,
        Email: email,
        //StartAbo: new Date()

    });
    console.log(" trying to create a new person...");

    console.log(usermodel);


    // get the query
    let query = AdminUserDb.insertNewPerson(usermodel);

    // querying db
    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);
        console.log("1 record inserted");

    });
    res.redirect('/admin/person');

};


exports.news = function(req, res, next) {

    res.render('admin/news', {

    });
};

exports.add_news = function(req, res, next) {

    let title = req.body.title;
    let content = 'test'; // req.body.editor
    let user = 1; // req.session.user
    let date_publish = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let lang = 'fr';
    let idPageLang = 1; // id de la meme page mais dans l'autre langue
    let isNews = 1; // req.body.isNews

    let query = AdminAddNewsDb.addNews(title, content, user, date_publish, lang, idPageLang, isNews);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);
        console.log("1 record inserted");

    });
    res.redirect('/admin/news');
}

exports.service = function(req, res, next) {

    res.render('admin/service', {
        title: 'page : services',

    });
};

exports.user = function(req, res, next) {

    res.render('admin/user', {
        title: 'Ajouter un utilisateur',

    });
};

exports.add_user = function(req, res, next) {

    res.render('admin/user', {
        title: 'Utilisateur ajouté avec succès'
    });

};

exports.export = function(req, res, next) {

    res.render('admin/export', {
        title: 'page : export',
    });
};

function isAdmin(req){

};