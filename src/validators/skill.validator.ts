import { body, query } from 'express-validator'

export const createSkillValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 50 })
    .withMessage('Name must not exceed 50 characters.'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required.')
    .isLength({ max: 30 })
    .withMessage('Category must not exceed 30 characters.'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required.')
    .isLength({ max: 300 })
    .withMessage('Description must not exceed 300 characters.'),

  body('icon')
    .trim()
    .notEmpty()
    .withMessage('Icon is required.')
    .isLength({ max: 100 })
    .withMessage('Icon must not exceed 100 characters.'),

  body('level')
    .notEmpty()
    .withMessage('Level is required.')
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Level must be Beginner, Intermediate, or Advanced.'),

  body('percent')
    .notEmpty()
    .withMessage('Percent is required.')
    .isInt({ min: 0, max: 100 })
    .withMessage('Percent must be an integer between 0 and 100.'),

  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean.'),

  body('order')
    .notEmpty()
    .withMessage('Order is required.')
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer.'),
]

export const updateSkillValidator = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty.')
    .isLength({ max: 50 })
    .withMessage('Name must not exceed 50 characters.'),

  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty.')
    .isLength({ max: 30 })
    .withMessage('Category must not exceed 30 characters.'),

  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty.')
    .isLength({ max: 300 })
    .withMessage('Description must not exceed 300 characters.'),

  body('icon')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Icon cannot be empty.')
    .isLength({ max: 100 })
    .withMessage('Icon must not exceed 100 characters.'),

  body('level')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Level must be Beginner, Intermediate, or Advanced.'),

  body('percent')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Percent must be an integer between 0 and 100.'),

  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean.'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer.'),
]

export const getSkillsValidator = [
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('featured must be a boolean')
    .toBoolean(),

  query('category').optional().isString().trim(),

  query('level')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Invalid skill level'),
]
