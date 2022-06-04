/**
 *  Load all clone commanders from the database.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CloneModel = requireOption(objectrepository, 'CloneModel');

    return function (req, res, next) {
        CloneModel.find({}, (err, clones) => {
            if (err) {
                return next(err);
            }

            res.locals.clones = clones;
            return next();
        });
    };
};