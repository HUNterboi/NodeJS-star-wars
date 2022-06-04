/**
 *  Using POST params update or insert a clone commander to the database
 *  Redirects to '/clone/edit' after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CloneModel = requireOption(objectrepository, 'CloneModel');

    return function (req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.legion === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.clone_record === 'undefined') {
            res.locals.clone_record = new CloneModel();
        }

        res.locals.clone_record.name = req.body.name;
        res.locals.clone_record.legion = req.body.legion;
        
        res.locals.clone_record.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/clone/edit');
        });
    };
};