import { body, query } from 'express-validator'

export const createProjectValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must not exceed 100 characters'),

  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),

  body('description').trim().notEmpty().withMessage('Description is required'),

  body('fullDescription').optional().trim(),

  body('technologies').custom((value) => {
    if (typeof value === 'string' || Array.isArray(value)) {
      return true
    }

    throw new Error('Technologies must be a string or an array')
  }),

  body('technologies.*')
    .trim()
    .notEmpty()
    .withMessage('Technology cannot be empty'),

  body('coverImage').optional().trim(),

  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('Github URL must be a valid URL'),

  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be a valid URL'),

  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),

  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published'),
]

export const updateProjectValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title must not exceed 100 characters'),

  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),

  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),

  body('fullDescription').optional().trim(),

  body('technologies')
    .optional()
    .custom((value) => {
      if (typeof value === 'string' || Array.isArray(value)) {
        return true
      }

      throw new Error('Technologies must be a string or an array')
    }),

  body('technologies.*')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Technology cannot be empty'),

  body('coverImage').optional().trim(),

  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('Github URL must be a valid URL'),

  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be a valid URL'),

  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),

  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published'),
]

export const getProjectsValidator = [
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('featured must be a boolean')
    .toBoolean(),

  query('role')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('role cannot be empty'),

  query('year')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('year cannot be empty'),

  query('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Invalid project status'),

  query('technologies').optional().isString().trim(),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a positive integer')
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be between 1 and 100')
    .toInt(),
  query('sort')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('sort cannot be empty'),
]
