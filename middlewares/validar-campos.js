const { response } = require('express');
const { validationResult } = require('express-validator');


const validateUser = ( req, res = response, next ) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            msg: 'Failed request',
            errors: errors.mapped()
        });
    }

    next();

}


module.exports = {
    validateUser
}