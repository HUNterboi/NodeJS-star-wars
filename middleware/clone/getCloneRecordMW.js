/**
 *  Load a clone commander from the database using the :clone_id parameter.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CloneModel = requireOption(objectrepository, 'CloneModel');

    return function (req, res, next) {
        CloneModel.findOne({ _id: req.params.clone_id }, (err, clone) => {
            if (err || !clone) {
                return next(err);
            }

            res.locals.clone_record = clone;
            return next();
        });
    };
};