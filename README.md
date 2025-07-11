In this project, I built a RESTful API using Express.js that fully implements CRUD operations for a product resource. I focused on creating a well-structured server with proper routing, middleware, and comprehensive error handling to ensure robustness and maintainability.

## What I Did

I started by setting up an Express.js server that listens on port 3000. I created a root route that welcomes users and directs them to the products API.

I designed a `products` resource with fields including `id`, `name`, `description`, `price`, `category`, and `inStock`. I implemented all standard RESTful routes:

- `GET /api/products` to list all products, with support for filtering by category, searching by name, and pagination.
- `GET /api/products/:id` to retrieve a specific product by its unique ID.
- `POST /api/products` to create a new product with validation.
- `PUT /api/products/:id` to update an existing product with validation.
- `DELETE /api/products/:id` to remove a product.

## Middleware and Integrations

To enhance the API, I integrated several middleware components:

- **Logger Middleware:** Logs every request's method, URL, and timestamp to the console for easy monitoring.
- **Authentication Middleware:** Secures the API by requiring an API key in the request headers.
- **Validation Middleware:** Ensures that product data sent in create and update requests meets the required format and types.
- **Global Error Handler:** Catches and handles errors gracefully, including custom error classes for not found and validation errors, returning meaningful HTTP status codes and messages.

## Advanced Features

I added advanced capabilities to improve usability and performance:

- **Filtering:** Clients can filter products by category using query parameters.
- **Search:** Products can be searched by name with case-insensitive matching.
- **Pagination:** Large product lists are paginated to limit response size and improve performance.
- **Statistics Endpoint:** Provides counts of products grouped by category.

## What to Expect

When you run the server, you can interact with the API using tools like Postman, Insomnia, or curl. The API requires an API key (`your-secret-key`) sent in the `x-api-key` header for all requests.

The API responds with JSON data and appropriate HTTP status codes. Errors are handled consistently, providing clear messages for invalid requests or missing resources.

## How to Run

1. Clone your repository.
2. Install dependencies with `npm install`.
3. Start the server using `npm start`.
4. Use your preferred API client to send requests to `http://localhost:3000/api/products`.

## Examples

### Get all products

```
GET /api/products
Headers:
  x-api-key: your-secret-key
```

### Create a new product

```
POST /api/products
Headers:
  x-api-key: your-secret-key
Body (JSON):
{
  "name": "New Product",
  "description": "Product description",
  "price": 100,
  "category": "electronics",
  "inStock": true
}
```

### Error response example

```
GET /api/products/invalid-id
Headers:
  x-api-key: your-secret-key

Response:
Status: 404 Not Found
Body:
{
  "error": "Product not found"
}
```

## Final Notes

This project demonstrates my ability to build a robust Express.js API with clean architecture, middleware integration, and error handling. It is ready for deployment and further extension as needed.

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
