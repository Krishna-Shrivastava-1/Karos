# Karos

**Opinionated, minimal API response & error standardization for Express.**

Karos enforces a single, predictable JSON response contract across your entire Node.js API — without adding business logic, configuration, or framework lock-in.
---

### 📖 Learn More
For a deep dive into the methods, functions, and the philosophy behind this library, check out the [Karos Implementation Guide]([https://your-blog-link-here.com](https://kodesword.vercel.app/blog/i-published-my-first-npm-package-karos)).

---

## 🚫 The Problem

In most Express backends:
- ❌ Every route formats responses differently
- ❌ Errors are sometimes strings, sometimes objects
- ❌ Status codes are inconsistent
- ❌ Frontend logic becomes fragile and conditional-heavy
- ❌ Teams rewrite the same response boilerplate in every project

**There is no enforced backend–frontend contract.**

## ✅ The Solution

Karos fixes exactly this problem — nothing more, nothing less. It enforces **one response contract** for your entire API.

### Success Response
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Alice"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
}
```

No exceptions. No special cases.

---

## 📦 Installation

```bash
npm install karos
```

---

## 🚀 Quick Start (60 seconds)

Karos replaces manual `try/catch` blocks and inconsistent response formatting.

### 1. Basic Setup

```js
const express = require('express');
const { ok, notFoundError, errorHandler } = require('karos');

const app = express();
app.use(express.json());

// --- Your Routes ---

app.get('/users/:id', async (req, res) => {
  const user = await db.findUser(req.params.id);

  if (!user) {
    // Throws automatically -> Middleware catches it
    notFoundError('User not found');
  }

  // Returns standardized 200 OK
  ok(res, user);
});

// --- ONE middleware catches everything ---
// Must be placed after all routes
app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
```

**Zero try/catch needed.** If your DB crashes, Karos catches it and returns a clean 500 `INTERNAL_ERROR`.

---

## 📚 Core API

### `ok(res, data, message?, meta?)`

Formats a successful response.

| Param | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `res` | `Response` | **Yes** | Express Response object |
| `data` | `any` | **Yes** | The payload (object, array, string) |
| `message` | `string` | No | Optional success message |
| `meta` | `object` | No | Optional metadata (e.g., pagination info) |

**Example:**
```js
ok(res, user);
ok(res, user, 'User fetched successfully');
```

---

### Error Helpers

Prebuilt helpers that throw standardized errors. These stop execution immediately, so you don't need `return`.

| Helper Function | HTTP Status | Error Code |
| :--- | :--- | :--- |
| `notFoundError(msg)` | **404** | `NOT_FOUND` |
| `validationError(msg)` | **400** | `VALIDATION_FAILED` |
| `unauthorizedError(msg)` | **401** | `UNAUTHORIZED` |
| `forbiddenError(msg)` | **403** | `FORBIDDEN` |
| `conflictError(msg)` | **409** | `CONFLICT` |
| `internalError(msg)` | **500** | `INTERNAL_ERROR` |

**Example:**
```js
if (emailInvalid) validationError('Invalid email format');
if (!isAdmin) forbiddenError('Admin access required');
```

---

### `errorHandler`

Express middleware that:
1. Catches all thrown Karos errors.
2. Catches unexpected crashes (DB down, undefined variables).
3. Formats unknown errors as `INTERNAL_ERROR` (500).

```js
// Add this as the very last middleware in your app
app.use(errorHandler);
```

---

## TypeScript Support

Karos is written in TypeScript and includes full type definitions out of the box.

- ✅ Full type safety
- ✅ Autocomplete-safe error codes

```ts
import { ok, ErrorCode } from 'karos';
```

---

## License

MIT
