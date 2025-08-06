# Shoppy - E-commerce Clone

A modern e-commerce website built with React, TypeScript, and Vite. This project is a clone of popular e-commerce platforms featuring product browsing, cart management, user authentication, and multilingual support.

## Features

- **Product Management**: Browse and search products with filtering and pagination
- **User Authentication**: Login and registration system
- **Shopping Cart**: Add, remove, and manage cart items
- **Product Reviews**: Rating and review system for products
- **Internationalization**: Multi-language support (English/Vietnamese)
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive test coverage with Vitest
- **Storybook**: Component documentation and development

## Technologies Used

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Yup** - Schema validation

### State Management & API

- **TanStack React Query** - Server state management and data fetching
- **Axios** - HTTP client for API requests
- **React Context** - Global state management

### Internationalization

- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next

### Testing & Development Tools

- **Vitest** - Unit testing framework
- **Testing Library** - React testing utilities
- **Storybook** - Component development and documentation
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality

### Additional Libraries

- **Framer Motion** - Animations and transitions
- **React Toastify** - Toast notifications
- **DOMPurify** - HTML sanitization
- **MSW (Mock Service Worker)** - API mocking for testing

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Shoppy
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   VITE_API_BASE_URL=your-api-base-url-here
   ```

   **Environment Variables:**
   - `VITE_API_BASE_URL`: The base URL for your API server (required)

## 🚀 Running the Project

### Development Server

Start the development server with hot reload:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Testing

Run unit tests:

```bash
yarn test
```

Run tests with coverage:

```bash
yarn coverage
```

Run Storybook tests:

```bash
yarn test:storybook
```

Run all tests (unit + Storybook):

```bash
yarn test:all
```

### Storybook

Start Storybook for component development and documentation:

```bash
yarn storybook
```

Storybook will be available at `http://localhost:6006`

Build Storybook for deployment:

```bash
yarn build-storybook
```

### Production Build

Build the project for production:

```bash
yarn build
```

Preview the production build:

```bash
yarn preview
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run unit tests
- `yarn test:all` - Run all tests
- `yarn coverage` - Run tests with coverage
- `yarn storybook` - Start Storybook development server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn prettier` - Check code formatting
- `yarn prettier:fix` - Fix code formatting

## Project Structure

```text
src/
├── @types/            # TypeScript type definitions
├── apis/              # API service functions
├── assets/            # Static assets (images, icons)
├── components/        # Reusable UI components
├── constants/         # Application constants
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── i18n/              # Internationalization configuration
├── layouts/           # Layout components
├── locales/           # Translation files
├── msw/               # Mock Service Worker for API mocking
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Contributing

We welcome contributions to improve Shoppy! If you find any bugs or have suggestions for new features, please feel free to contribute by:

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
4. **Run tests to ensure everything works**

   ```bash
   yarn test:all
   yarn lint
   ```

5. **Commit your changes**

   ```bash
   git commit -m "Add: your feature description"
   ```

6. **Push to your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

Please make sure your code follows the project's coding standards and includes appropriate tests.

## License

This project is open source and available under the [MIT License](LICENSE).

## Bug Reports

If you encounter any bugs or issues, please create an issue on GitHub with:

- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment details (OS, browser, Node.js version)

---

**Happy Coding!**
