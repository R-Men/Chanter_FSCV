const C = require('../../config/appConfig');
const AdminPageDb = require('../controllers/database/admin_page_db');
const AdminUtilsDb = require('../controllers/database/utils/db_utils');
const PageModel = require('../models/page');

/**
 *
 * NEWS PART
 *
 */

exports.news = function(req, res, next) {

    let query = AdminPageDb.getNews();

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);
        res.render('admin/news/news', {news: rows})
    });
};

exports.form_news = function(req, res, next) {
    res.render('admin/news/news_add');
};

exports.add_news = function(req, res, next) {

    let titleFr = AdminUtilsDb.replaceSimpleQuote(req.body.titlefr);
    let titleDe = AdminUtilsDb.replaceSimpleQuote(req.body.titlede);
    let contentFr = AdminUtilsDb.replaceSimpleQuote(req.body.contentfr);
    let contentDe = AdminUtilsDb.replaceSimpleQuote(req.body.contentde);
    let user = req.session.user;
    let date_publish = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let isNews = 1;
    let formularForms = AdminUtilsDb.replaceSimpleQuote(req.body.formulaireForms);
    let formularResult = AdminUtilsDb.replaceSimpleQuote(req.body.formulaireResult);

    let newsFr = new PageModel({
        Title: titleFr,
        Content: contentFr,
        AdminId: user,
        Published_date: date_publish,
        Updated_date: date_publish,
        IsNews: isNews,
        FormularForms: formularForms,
        FormularResult: formularResult
    });

    let newsDe = new PageModel({
        Title: titleDe,
        Content: contentDe,
        AdminId: user,
        Published_date: date_publish,
        Updated_date: date_publish,
        IsNews: isNews,
        FormularForms: formularForms,
        FormularResult: formularResult
    });

    let queryFr = AdminPageDb.addNews(newsFr);
    let queryDe = AdminPageDb.addNews(newsDe);

    // insert fr news
    C.db.query(queryFr, function (err, rows, fields) {
        if (err) throw(err);

        let insertedIdFr = rows.insertId;

        // insert de news
        C.db.query(queryDe, function (err, rows, fields) {
            if (err) throw(err);

            let insertedIdDe = rows.insertId;
            let queryLink = AdminPageDb.linkPage(insertedIdFr, insertedIdDe);

            // link fr to de
            C.db.query(queryLink, function (err, rows, fields) {
                if (err) throw(err);
                res.redirect('/admin/news');
            });
        });
    });
};

exports.form_edit_news = function(req, res, next) {
    let idNews = req.query.id;
    let query = AdminPageDb.getNewsById(idNews);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/news/news_edit', {news: rows});
    });
};

exports.edit_news = function (req, res, next) {
    let idNews = req.body.idNews;
    let title = AdminUtilsDb.replaceSimpleQuote(req.body.title);
    let content = AdminUtilsDb.replaceSimpleQuote(req.body.contentUpdated);
    let updated_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = AdminPageDb.editNews(idNews, title, content, updated_date);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.redirect('/admin/news');
    });
};

exports.delete_news = function (req, res, next) {
    let idNews = req.query.id;
    let query = AdminPageDb.deleteNews(idNews);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.redirect('/admin/news');
    });
};

exports.form_link_news = function (req, res, next) {
    let query = AdminPageDb.getNews();

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/news/news_link', {news: rows});
    });
};

exports.link_news = function (req, res, next) {
    let idPageFr = req.body.idFr;
    let idPageDe = req.body.idDe;
    let query1 = AdminPageDb.linkPage(idPageFr, idPageDe);

    C.db.query(query1, function (err, rows, fields) {
        if (err) throw(err);
        res.redirect('/admin/news/news_link');
    });
};

/**
 *
 * PAGE PART
 *
 */

exports.page = function(req, res, next) {

    let query = AdminPageDb.getPages();

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/page/page', {pages: rows})
    });
};

exports.form_page = function(req, res, next) {
    res.render('admin/page/page_add');
};

exports.add_page = function (req, res, next) {
    let titleFr = AdminUtilsDb.replaceSimpleQuote(req.body.titlefr);
    let titleDe = AdminUtilsDb.replaceSimpleQuote(req.body.titlede);
    let contentFr = AdminUtilsDb.replaceSimpleQuote(req.body.contentfr);
    let contentDe = AdminUtilsDb.replaceSimpleQuote(req.body.contentde);
    let user = req.session.user;
    let date_publish = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let isNews = 0;

    let newsFr = new PageModel({
        Title: titleFr,
        Content: contentFr,
        AdminId: user,
        Published_date: date_publish,
        Updated_date: date_publish,
        IsNews: isNews
    });

    let newsDe = new PageModel({
        Title: titleDe,
        Content: contentDe,
        AdminId: user,
        Published_date: date_publish,
        Updated_date: date_publish,
        IsNews: isNews
    });

    let queryFr = AdminPageDb.addPage(newsFr);
    let queryDe = AdminPageDb.addPage(newsDe);

    // insert fr page
    C.db.query(queryFr, function (err, rows, fields) {
        if (err) throw(err);

        let insertedIdFr = rows.insertId;

        // insert de page
        C.db.query(queryDe, function (err, rows, fields) {
            if (err) throw(err);

            let insertedIdDe = rows.insertId;
            let queryLink = AdminPageDb.linkPage(insertedIdFr, insertedIdDe);

            // link fr to de
            C.db.query(queryLink, function (err, rows, fields) {
                if (err) throw(err);
                res.redirect('/admin/page');
            });
        });
    });
};

exports.delete_page = function (req, res, next) {
    let idPage = req.query.id;
    let query = AdminPageDb.deletePage(idPage);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.redirect('/admin/page');
    });
};

exports.form_edit_page = function(req, res, next) {
    let idPage = req.query.id;
    let query = AdminPageDb.getPageById(idPage);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/page/page_edit', {pages: rows});
    });
};

exports.edit_page = function (req, res, next) {
    let idPage = req.body.idPage;
    let title = AdminUtilsDb.replaceSimpleQuote(req.body.title);
    let content = AdminUtilsDb.replaceSimpleQuote(req.body.contentUpdated);
    let updated_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = AdminPageDb.editPage(idPage, title, content, updated_date);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.redirect('/admin/page');
    });
};

exports.form_link_page = function (req, res, next) {
    let query = AdminPageDb.getPages();

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/page/page_link', {pages: rows});
    });
};

exports.link_page = function (req, res, next) {
    let idPageFr = req.body.idFr;
    let idPageDe = req.body.idDe;
    let query1 = AdminPageDb.linkPage(idPageFr, idPageDe);

    C.db.query(query1, function (err, rows, fields) {
        if (err) throw(err);
        res.redirect('/admin/page/page_link');
    });
};
