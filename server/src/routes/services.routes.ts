import { Router } from 'express';
import { getService, listServices } from '../controllers/services.controller.js';
import { asyncHandler } from '../lib/asyncHandler.js';

export const servicesRouter = Router();

servicesRouter.get('/', asyncHandler(listServices));
servicesRouter.get('/:slug', asyncHandler(getService));
