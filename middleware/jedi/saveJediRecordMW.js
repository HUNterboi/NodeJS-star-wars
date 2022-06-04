/**
 *  Using POST params update or insert a jedi to the database
 *  Redirects to '/jedi/edit' after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const JediModel = requireOption(objectrepository, 'JediModel');

    return function (req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.rang === 'undefined' ||
            typeof req.body.midi === 'undefined' ||
            typeof req.body.clone === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.jedi_record === 'undefined') {
            res.locals.jedi_record = new JediModel();
        }
        
        res.locals.jedi_record.name = req.body.name;
        res.locals.jedi_record.rang = req.body.rang;
        res.locals.jedi_record.midi = req.body.midi;
        res.locals.jedi_record.clone = req.body.clone;

        res.locals.jedi_record.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/jedi/edit');
        });
    };
};