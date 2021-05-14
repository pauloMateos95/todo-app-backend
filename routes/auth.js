/*
    Rutas de Usuarios / Auth
    host + /api/auth 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const { validateUser } = require('../middlewares/validar-campos');
// const { validateJWT } = require('../middlewares/validate-jwt');



router.post(
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must include at least 6 chars').isLength({ min:6 }),
        validateUser
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must include at least 6 chars').isLength({ min:6 }),
        validateUser
    ],
    userLogin
);

// router.get('/renew', validateJWT, revalidateToken);





module.exports = router;