import { body } from 'express-validator'

export const createExperienceValidator = [
  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isLength({ max: 100 })
    .withMessage('Role must not exceed 100 characters'),

  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company is required')
    .isLength({ max: 100 })
    .withMessage('Company must not exceed 100 characters'),

  body('type')
    .trim()
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['work', 'internship', 'education'])
    .withMessage('Type must be work, internship, or education'),

  body('startDate')
    .trim()
    .notEmpty()
    .withMessage('Start date is required')
    .matches(/^\d{4}(-\d{2})?$/)
    .withMessage('Start date must be in YYYY or YYYY-MM format'),

  body('endDate')
    .optional({ values: 'null' })
    .trim()
    .matches(/^\d{4}(-\d{2})?$/)
    .withMessage('End date must be in YYYY or YYYY-MM format'),

  body('current')
    .optional()
    .isBoolean()
    .withMessage('Current must be a boolean'),
]

export const updateExperienceValidator = [
  body('role')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Role cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Role must not exceed 100 characters'),

  body('company')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Company must not exceed 100 characters'),

  body('type')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Type cannot be empty')
    .isIn(['work', 'internship', 'education'])
    .withMessage('Type must be work, internship, or education'),

  body('startDate')
    .optional()
    .trim()
    .matches(/^\d{4}(-\d{2})?$/)
    .withMessage('Start date must be in YYYY or YYYY-MM format'),

  body('endDate')
    .optional({ values: 'null' })
    .trim()
    .matches(/^\d{4}(-\d{2})?$/)
    .withMessage('End date must be in YYYY or YYYY-MM format'),

  body('current')
    .optional()
    .isBoolean()
    .withMessage('Current must be a boolean'),
]
