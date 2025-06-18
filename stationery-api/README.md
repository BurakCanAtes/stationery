# TAB Stationery API

## Tech Stack
- Express.js
- MongoDB + Mongoose
- JWT Authentication (argon2 password hashing)
- Multer for file uploads
- Cloudinary for avatar image storage

## Setup
```bash
npm install
nodemon app
```

Create a `.env` file with the following:
```
DB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get user profile (auth required)

### Product
- `GET /api/products` - Get all products with filters, sort, pagination
- `GET /api/products/:id` - Get single product

Query params:
- `category`, `minPrice`, `maxPrice`, `inStock`, `sort`, `search`, `page`, `limit`

### User
- `PUT /api/users/me` - Update name, lastname
- `PUT /api/upload` - Upload avatar (Multer + Cloudinary)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Remove item from cart
