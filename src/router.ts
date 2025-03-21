import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import {
  CategoriesController,
  OrdersController,
  ProductsController,
} from './controllers';

const router = Router();

const uploadsDir = path.resolve(__dirname, '..', './uploads');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

/* Categories Routes */
const categoriesController = new CategoriesController();
router.get('/categories', async (request, response) => {
  await categoriesController.findAll(request, response);
});
router.post('/categories', async (request, response) => {
  await categoriesController.create(request, response);
});
router.get('/categories/:id/products', async (request, response) => {
  await categoriesController.findCategoryProducts(request, response);
});

/* Products Routes */
const productsController = new ProductsController();
router.get('/products', async (request, response) => {
  await productsController.listAll(request, response);
});
router.post('/products', upload.single('image'), async (request, response) => {
  await productsController.create(request, response);
});

/* Orders Routes */
const ordersController = new OrdersController();
router.get('/orders', async (request, response) => {
  await ordersController.listAll(request, response);
});

export { router };
