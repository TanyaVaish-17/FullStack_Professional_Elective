const { body } = require('express-validator');

const requestValidate=[
    body('email')
        .isString().withMessage('Email must be a string').trim().notEmpty()
        .withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password')
        .isString().withMessage('Password must be a string')
        .notEmpty().withMessage('Password is required')
];

const loginValidator = [
    ...requestValidate
];

const registerValidator = [
    body('name')
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),

    ...requestValidate,

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    body('confirmPassword')
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];

module.exports = {
    requestValidate,
    loginValidator,
    registerValidator
};