/**
 *  Removes a clone commander from the database.
 *  Redirects to '/clone/edit' afterwards.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.clone_record === 'undefined') {
            return next();
        }

        res.locals.clone_record.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/clone/edit');
        });
    };
};