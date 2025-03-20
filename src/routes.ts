import { Router } from 'express';

import { CategoriesController, ProductsController } from './controllers';

const router = Router();

/* Categories Routes */
const categoriesController = new CategoriesController();
router.get('/categories', (request, response) =>
  categoriesController.findAll(request, response),
);
router.post('/categories', (request, response) =>
  categoriesController.create(request, response),
);

/* Products Routes */
const productsController = new ProductsController();
router.get('/products', (request, response) =>
  productsController.listAll(request, response),
);
router.post('/products', (request, response) =>
  productsController.create(request, response),
);

export { router };
