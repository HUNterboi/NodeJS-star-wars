/**
 *  Load all jedi from the database.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const JediModel = requireOption(objectrepository, 'JediModel');

    return function (req, res, next) {
        JediModel.find({}, (err, jedi) => {
            if (err) {
                return next(err);
            }
            
            res.locals.jedi = jedi;
            return next();
        });
    };
};