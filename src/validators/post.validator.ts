import { body, query } from 'express-validator'

export const createPostValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title must not exceed 150 characters'),

  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),

  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Excerpt is required')
    .isLength({ max: 300 })
    .withMessage('Excerpt must not exceed 300 characters'),

  body('content').trim().notEmpty().withMessage('Content is required'),

  body('coverImage').optional().trim(),

  body('category').trim().notEmpty().withMessage('Category is required'),

  body('tags').isArray().withMessage('Tags must be an array'),

  body('tags.*').trim().notEmpty().withMessage('Tag cannot be empty'),

  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published'),

  body('publishedAt')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('publishedAt must be a valid date'),
]

export const updatePostValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Title must not exceed 150 characters'),

  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),

  body('excerpt')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Excerpt cannot be empty')
    .isLength({ max: 300 })
    .withMessage('Excerpt must not exceed 300 characters'),

  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content cannot be empty'),

  body('coverImage').optional().trim(),

  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),

  body('tags').optional().isArray().withMessage('Tags must be an array'),

  body('tags.*')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Tag cannot be empty'),

  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published'),

  body('publishedAt')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('publishedAt must be a valid date'),
]

export const getPostsValidator = [
  query('category').optional().isString().trim(),
  query('tags').optional().isString().trim(),

  query('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Invalid post status'),
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
