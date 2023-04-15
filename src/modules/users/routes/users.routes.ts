import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UsersAvatarController from '../controllers/UsersAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

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

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'), // Atulizar um unico arquivo, se for pra varias é o "array"
  usersAvatarController.update,
);

export default usersRouter;
