/**
 *  Removes a jedi from the database.
 *  Redirects to '/jedi/edit' afterwards.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.jedi_record === 'undefined') {
            return next();
        }

        res.locals.jedi_record.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/jedi/edit');
        });
    };
};