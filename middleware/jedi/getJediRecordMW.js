/**
 *  Load a jedi from the database using the :jedi_id parameter.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const JediModel = requireOption(objectrepository, 'JediModel');

    return function (req, res, next) {
        JediModel.findOne({ _id: req.params.jedi_id }, (err, jedi) => {
            if (err || !jedi) {
                return next(err);
            }

            res.locals.jedi_record = jedi;
            // console.log(res.locals.jedi_record);
            return next();
        });
    };
};