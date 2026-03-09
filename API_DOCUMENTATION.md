# 📚 Complete API Documentation - Tarzen Mobile Accessories

## 🔐 Authentication Required

- **Public** - No authentication required
- **Protected (User)** - Requires valid JWT token (any authenticated user)
- **Admin Only** - Requires valid JWT token with admin role

---

# 👤 USER ENDPOINTS

## 1️⃣ Authentication APIs

### Register New User
**Endpoint:** `POST /api/auth/register`  
**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "address": "123 Main Street, City Center"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

### Login User
**Endpoint:** `POST /api/auth/login`  
**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get User Profile
**Endpoint:** `GET /api/auth/profile`  
**Access:** Protected (User)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street, City Center",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### Update User Profile
**Endpoint:** `PUT /api/auth/update-profile`  
**Access:** Protected (User)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "9999999999",
  "address": "456 New Address, New City",
  "password": "newpassword123" // Optional, min 6 characters
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "9999999999",
    "address": "456 New Address, New City",
    "role": "user"
  }
}
```

---

## 2️⃣ Category APIs (Public)

### Get All Categories
**Endpoint:** `GET /api/categories`  
**Access:** Public

**Success Response (200):**
```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Mobile Glass",
      "image": "https://images.unsplash.com/photo-1592899677712-a5a2545034ab?w=500&h=500&fit=crop",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Phone Covers",
      "image": "https://images.unsplash.com/photo-1603351154351-5cf99bc7f037?w=500&h=500&fit=crop",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more categories
  ]
}
```

---

## 3️⃣ Product APIs (Public)

### Get All Products
**Endpoint:** `GET /api/products`  
**Access:** Public

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `category` - Filter by category ID
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `brand` - Filter by brand name
- `lowStock` (true/false) - Show low stock items (< 10)

**Example Request:**
```
GET /api/products?page=1&limit=10&minPrice=100&maxPrice=1000&brand=ShieldPro
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 14,
  "page": 1,
  "pages": 2,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Tempered Glass for iPhone 14 Pro",
      "description": "9H hardness tempered glass with oleophobic coating",
      "price": 299,
      "category": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "name": "Mobile Glass"
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1592899677712-a5a2545034ab?w=800&h=800&fit=crop",
          "publicId": "tarzen-mobile-accessories/abc123"
        }
      ],
      "stock": 50,
      "brand": "ShieldPro",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more products
  ]
}
```

---

### Get Single Product
**Endpoint:** `GET /api/products/:id`  
**Access:** Public

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Tempered Glass for iPhone 14 Pro",
    "description": "9H hardness tempered glass with oleophobic coating. Ultra-clear and bubble-free installation.",
    "price": 299,
    "category": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Mobile Glass"
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1592899677712-a5a2545034ab?w=800&h=800&fit=crop",
        "publicId": "tarzen-mobile-accessories/abc123"
      }
    ],
    "stock": 50,
    "brand": "ShieldPro",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### Get Products by Category
**Endpoint:** `GET /api/products/category/:categoryId`  
**Access:** Public

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Tempered Glass for iPhone 14 Pro",
      "price": 299,
      "stock": 50,
      "brand": "ShieldPro",
      "images": [...],
      "category": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "name": "Mobile Glass"
      }
    }
    // ... more products in same category
  ]
}
```

---

### Search Products
**Endpoint:** `GET /api/products/search?q=`  
**Access:** Public

**Example Request:**
```
GET /api/products/search?q=iphone charger
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "20W USB-C Fast Charger",
      "description": "Compact fast charger compatible with iPhone and Android devices",
      "price": 899,
      "stock": 40,
      "brand": "PowerPlus",
      "category": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
        "name": "Chargers"
      },
      "images": [...]
    }
    // ... matching products
  ]
}
```

---

## 4️⃣ Order APIs (User)

### Place New Order
**Endpoint:** `POST /api/orders`  
**Access:** Protected (User)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "products": [
    {
      "productId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "quantity": 2
    },
    {
      "productId": "64a1b2c3d4e5f6g7h8i9j0k2",
      "quantity": 1
    }
  ],
  "customerDetails": {
    "name": "John Doe",
    "phone": "9876543210",
    "address": "123 Main Street, Apartment 4B",
    "city": "Mumbai",
    "pincode": "400001",
    "landmark": "Near City Hospital"
  },
  "deliveryType": "homeDelivery", // or "storePickup"
  "paymentMethod": "cashOnDelivery" // or "payAtShop"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "user": "64a1b2c3d4e5f6g7h8i9j0k1",
    "products": [
      {
        "productId": "64a1b2c3d4e5f6g7h8i9j0k1",
        "name": "Tempered Glass for iPhone 14 Pro",
        "price": 299,
        "quantity": 2
      },
      {
        "productId": "64a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Silicone Case for iPhone 14 Pro Max",
        "price": 599,
        "quantity": 1
      }
    ],
    "totalPrice": 1197,
    "customerDetails": {
      "name": "John Doe",
      "phone": "9876543210",
      "address": "123 Main Street, Apartment 4B",
      "city": "Mumbai",
      "pincode": "400001",
      "landmark": "Near City Hospital"
    },
    "deliveryType": "homeDelivery",
    "paymentMethod": "cashOnDelivery",
    "orderStatus": "Pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Insufficient stock for Tempered Glass for iPhone 14 Pro"
}
```

---

### Get My Orders
**Endpoint:** `GET /api/orders/my-orders`  
**Access:** Protected (User)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "user": "64a1b2c3d4e5f6g7h8i9j0k1",
      "products": [
        {
          "productId": {
            "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
            "name": "Tempered Glass for iPhone 14 Pro",
            "images": [...]
          },
          "name": "Tempered Glass for iPhone 14 Pro",
          "price": 299,
          "quantity": 2
        }
      ],
      "totalPrice": 1197,
      "customerDetails": {
        "name": "John Doe",
        "phone": "9876543210",
        "address": "123 Main Street, Apartment 4B",
        "city": "Mumbai",
        "pincode": "400001",
        "landmark": "Near City Hospital"
      },
      "deliveryType": "homeDelivery",
      "paymentMethod": "cashOnDelivery",
      "orderStatus": "Pending",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more orders
  ]
}
```

---

### Cancel Order
**Endpoint:** `DELETE /api/orders/:id`  
**Access:** Protected (User)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "user": "64a1b2c3d4e5f6g7h8i9j0k1",
    "products": [...],
    "totalPrice": 1197,
    "customerDetails": {...},
    "deliveryType": "homeDelivery",
    "paymentMethod": "cashOnDelivery",
    "orderStatus": "Cancelled",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Cannot cancel order with status: Shipped"
}
```

---

# 👨‍💼 ADMIN ENDPOINTS

## 1️⃣ Admin Authentication

### Admin Login
**Endpoint:** `POST /api/auth/login`  
**Access:** Public

**Request Body:**
```json
{
  "email": "admin@tarzen.com",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Tarzen Admin",
    "email": "admin@tarzen.com",
    "phone": "9876543210",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 2️⃣ Category Management (Admin Only)

### Create Category
**Endpoint:** `POST /api/categories`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data
```

**FormData:**
```
name: "New Category Name"
image: <file> (optional, if not provided use image URL in body)
```

**OR JSON Body (if using image URL):**
```json
{
  "name": "Screen Guards",
  "image": "https://example.com/image.jpg"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Screen Guards",
    "image": "https://cloudinary.com/.../image.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Category already exists"
}
```

---

### Update Category
**Endpoint:** `PUT /api/categories/:id`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data
```

**FormData:**
```
name: "Updated Category Name"
image: <file> (optional, new image to upload)
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Updated Category Name",
    "image": "https://cloudinary.com/.../new-image.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

---

### Delete Category
**Endpoint:** `DELETE /api/categories/:id`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Category not found"
}
```

---

## 3️⃣ Product Management (Admin Only)

### Create Product
**Endpoint:** `POST /api/products`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data
```

**FormData:**
```
name: "Premium Tempered Glass"
description: "High quality 9H tempered glass with anti-fingerprint coating"
price: 499
category: "64a1b2c3d4e5f6g7h8i9j0k1"
stock: 100
brand: "Premium Brand"
images: <file1>, <file2>, <file3> (up to 5 images)
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Premium Tempered Glass",
    "description": "High quality 9H tempered glass with anti-fingerprint coating",
    "price": 499,
    "category": "64a1b2c3d4e5f6g7h8i9j0k1",
    "images": [
      {
        "url": "https://cloudinary.com/.../image1.jpg",
        "publicId": "tarzen-mobile-accessories/xyz123"
      },
      {
        "url": "https://cloudinary.com/.../image2.jpg",
        "publicId": "tarzen-mobile-accessories/xyz124"
      }
    ],
    "stock": 100,
    "brand": "Premium Brand",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Update Product
**Endpoint:** `PUT /api/products/:id`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data
```

**FormData (all fields optional):**
```
name: "Updated Product Name"
description: "Updated description"
price: 599
category: "64a1b2c3d4e5f6g7h8i9j0k2"
stock: 150
brand: "Updated Brand"
images: <file1>, <file2> (new images, replaces old ones)
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Updated Product Name",
    "description": "Updated description",
    "price": 599,
    "category": "64a1b2c3d4e5f6g7h8i9j0k2",
    "images": [
      {
        "url": "https://cloudinary.com/.../new-image1.jpg",
        "publicId": "tarzen-mobile-accessories/new123"
      }
    ],
    "stock": 150,
    "brand": "Updated Brand",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

---

### Delete Product
**Endpoint:** `DELETE /api/products/:id`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## 4️⃣ Order Management (Admin Only)

### Get All Orders
**Endpoint:** `GET /api/orders`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page

**Example Request:**
```
GET /api/orders?page=1&limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 20,
  "total": 150,
  "page": 1,
  "pages": 8,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "user": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210"
      },
      "products": [
        {
          "productId": {
            "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
            "name": "Tempered Glass for iPhone 14 Pro"
          },
          "name": "Tempered Glass for iPhone 14 Pro",
          "price": 299,
          "quantity": 2
        }
      ],
      "totalPrice": 1197,
      "customerDetails": {
        "name": "John Doe",
        "phone": "9876543210",
        "address": "123 Main Street",
        "city": "Mumbai",
        "pincode": "400001",
        "landmark": "Near Hospital"
      },
      "deliveryType": "homeDelivery",
      "paymentMethod": "cashOnDelivery",
      "orderStatus": "Pending",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more orders
  ]
}
```

---

### Update Order Status
**Endpoint:** `PUT /api/orders/:id/status`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "Confirmed" // Options: Pending, Confirmed, Shipped, Delivered, Cancelled
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "user": "64a1b2c3d4e5f6g7h8i9j0k1",
    "products": [...],
    "totalPrice": 1197,
    "customerDetails": {...},
    "deliveryType": "homeDelivery",
    "paymentMethod": "cashOnDelivery",
    "orderStatus": "Confirmed",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid order status"
}
```

---

## 5️⃣ User Management (Admin Only)

### Get All Users
**Endpoint:** `GET /api/users`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": "123 Main Street",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more users
  ]
}
```

---

### Get User by ID
**Endpoint:** `GET /api/users/:id`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Update User Role
**Endpoint:** `PUT /api/users/:id/role`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "role": "admin" // or "user"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid role"
}
```

---

### Delete User
**Endpoint:** `DELETE /api/users/:id`  
**Access:** Admin Only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Cannot delete admin user"
}
```

---

# 📊 Common Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | GET, PUT operations |
| 201 | Created | POST operations |
| 400 | Bad Request | Validation errors, duplicate entries |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

# 🔑 Authentication Token Usage

All protected endpoints require the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Get the token from login/register response and include it in subsequent requests.

---

# 📝 Notes

1. **Pagination**: All list endpoints support pagination with `page` and `limit` parameters
2. **Image Upload**: Use multipart/form-data for file uploads
3. **Date Format**: All dates are in ISO 8601 format
4. **Response Format**: All responses follow `{ success, message?, data? }` structure
5. **Order Status Flow**: Pending → Confirmed → Shipped → Delivered
6. **Stock Management**: Stock is automatically reduced when order is placed and restored when cancelled

---

**Complete API Reference for Tarzen Mobile Accessories Backend** 🚀
