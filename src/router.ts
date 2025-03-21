import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { CategoriesController, ProductsController } from './controllers';

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
router.get('/categories', (request, response) =>
  categoriesController.findAll(request, response),
);
router.post('/categories', (request, response) =>
  categoriesController.create(request, response),
);
router.get('/categories/:id/products', (request, response) =>
  categoriesController.findCategoryProducts(request, response),
);

/* Products Routes */
const productsController = new ProductsController();
router.get('/products', (request, response) =>
  productsController.listAll(request, response),
);
router.post('/products', upload.single('image'), (request, response) =>
  productsController.create(request, response),
);

export { router };
