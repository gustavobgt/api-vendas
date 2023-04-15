import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import SessionsController from '../controllers/SessionsController';
import { Segments, celebrate, Joi } from 'celebrate';

const usersRouter = Router();
const usersController = new UsersController();
const sessionsController = new SessionsController();

usersRouter.get('/', usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default usersRouter;
