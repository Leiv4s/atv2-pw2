import express from 'express'
import { createTechnology,findTechnologiesByUsername,updateTechnology,partialUpdateTechnology,deleteTechnology } from '../controller/TechnologyController';
import { checkExistsUserAccount } from '../middlewares/checkExistsUserAccount';

export const technologyRouter=express.Router();

technologyRouter.post('/',checkExistsUserAccount,createTechnology);
technologyRouter.get('/',checkExistsUserAccount,findTechnologiesByUsername);
technologyRouter.put('/:id',checkExistsUserAccount,updateTechnology);
technologyRouter.patch('/:id/studied',checkExistsUserAccount,partialUpdateTechnology);
technologyRouter.delete('/:id',checkExistsUserAccount,deleteTechnology);