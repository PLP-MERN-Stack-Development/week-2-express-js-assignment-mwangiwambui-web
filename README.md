[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19699157&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This project is a RESTful API built with Express.js. It supports CRUD operations for a product resource, includes middleware for logging, authentication, and validation, and features advanced capabilities like filtering, pagination, and search.

---

##  How to Run the Server

1. **Clone the repository:**
   ```
   git clone <your-repo-url>
   cd week-2-express-js-assignment-mwangiwambui-web
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and set your API key:
     ```
     API_KEY=your_secret_key
     ```

4. **Start the server:**
   ```
   npm start
   ```
   The server will run on [http://localhost:3000](http://localhost:3000).

---

##  API Endpoints

### Authentication

All endpoints require an API key in the request header:
```
x-api-key: your_secret_key
```

---

### Product Endpoints
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

#### Query Parameters for `/api/products`

- `category` – Filter by category (e.g. `?category=electronics`)
- `search` – Search by product name (e.g. `?search=laptop`)
- `page` – Page number for pagination (default: 1)
- `limit` – Items per page (default: 10)

---

## Example Requests & Responses

### 1. Get All Products

**Request:**
```
GET /api/products?category=electronics&search=laptop&page=1&limit=2
x-api-key: your_secret_key
```

**Response:**
```json
{
  "total": 1,
  "page": 1,
  "limit": 2,
  "products": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### 2. Get Product by ID

**Request:**
```
GET /api/products/1
x-api-key: your_secret_key
```

**Response:**
```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

---

### 3. Create a Product

**Request:**
```
POST /api/products
Content-Type: application/json
x-api-key: your_secret_key

{
  "name": "Tablet",
  "description": "A new tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

**Response:**
```json
{
  "id": "4",
  "name": "Tablet",
  "description": "A new tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

---

### 4. Product Statistics

**Request:**
```
GET /api/products/stats
x-api-key: your_secret_key
```

**Response:**
```json
{
  "countByCategory": {
    "electronics": 2,
    "kitchen": 1
  }
}
```

---

## 🧪 Testing

Use [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or `curl` to test the endpoints.  
**Remember to include the `x-api-key` header in every request.**

---

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)