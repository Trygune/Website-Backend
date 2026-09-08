import { body, query } from 'express-validator'

export const trackVisitValidator = [
  body('visitorId')
    .trim()
    .notEmpty()
    .withMessage('Visitor ID is required')
    .isString()
    .withMessage('Visitor ID must be a string')
    .isLength({ min: 10, max: 100 })
    .withMessage('Visitor ID must be between 10 and 100 characters'),

  body('path')
    .trim()
    .notEmpty()
    .withMessage('Path is required')
    .isString()
    .withMessage('Path must be a string')
    .isLength({ max: 500 })
    .withMessage('Path cannot exceed 500 characters'),
]

export const getAnalyticsValidator = [
  query('range')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Range must be a positive integer'),
]
