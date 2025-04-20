# URL-mini

URL-mini is a modern URL shortening service that allows users to create shortened links, track their usage statistics, and manage their URLs through a user-friendly dashboard.

## Features

- **URL Shortening**: Create short, easy-to-share URLs from long links
- **User Authentication**: Secure user registration and login system
- **User Dashboard**: Manage and track all your shortened URLs
- **Analytics**: View visit history and usage statistics for your URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, Bootstrap
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based auth with HTTP-only cookies
- **Error Handling**: Custom error handling middleware

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or MongoDB Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/URL-mini.git
   cd URL-mini
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Visit `http://localhost:3000` to use the application

## API Routes

- **GET /** - Home page
- **GET /url/:shortId** - Redirect to the original URL
- **POST /url** - Create a new short URL (authenticated)
- **DELETE /url/:id** - Delete a URL (authenticated)
- **GET /user/signin** - Login page
- **GET /user/signup** - Registration page
- **POST /user/signin** - Login action
- **POST /user/signup** - Registration action
- **GET /user/signout** - Logout (authenticated)
- **GET /home/dashboard** - User dashboard (authenticated)

## Project Structure

```
URL-mini/
├── config/              # Application configuration
├── public/              # Static assets
├── src/
│   ├── controller/      # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── model/           # Database models
│   ├── routes/          # API routes
│   └── views/           # EJS templates
├── utils/               # Utility functions
├── app.js               # Express application
└── server.js            # Server entry point
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [nanoid](https://github.com/ai/nanoid) - URL ID generation
- [Express.js](https://expressjs.com/) - Web framework
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Bootstrap](https://getbootstrap.com/) - Frontend framework 