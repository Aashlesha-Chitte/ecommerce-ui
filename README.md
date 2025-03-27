# E-Commerce App Frontend Deployment on GitHub Pages

## Project Overview
This is a simple e-commerce application frontend deployed on GitHub Pages, showcasing basic CRUD operations and frontend development skills.

## Prerequisites
- Node.js (recommended version 16.x or later)
- npm or yarn
- GitHub account
- React project (or your chosen frontend framework)

## Deployment Steps

### 1. Prepare Your React Project

#### 1.1 Install gh-pages package
```bash
npm install gh-pages --save-dev
```

#### 1.2 Update package.json
Add these properties to your `package.json`:
```json
{
  "homepage": "https://[your-github-username].github.io/[your-repo-name]",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts --openssl-legacy-provider build",
  }
}
```

### 2. Configure GitHub Repository
1. Create a new GitHub repository
2. Push your project to the repository
3. Enable GitHub Pages in repository settings
   - Go to Settings > Pages
   - Choose `gh-pages` branch as source

### 3. Deploy to GitHub Pages
```bash
npm run deploy
```
- This command builds your project and pushes to gh-pages branch

### 4. Environment Configuration
- Use `.env` files for environment-specific configurations
- For GitHub Pages, prefix environment variables with `REACT_APP_`
  ```
  REACT_APP_API_URL=https://your-backend-url.vercel.app
  ```

### 5. Routing Considerations
- For single-page applications, add `basename` to React Router
  ```jsx
  <Router basename={process.env.PUBLIC_URL}>
    {/* Your routes */}
  </Router>
  ```

## Continuous Deployment
- Automatic deployment on push to main branch
- Manual deployment using `npm run deploy`

## Troubleshooting
- Verify homepage URL in `package.json`
- Check GitHub Pages settings
- Ensure build process completes successfully
- Verify environment variables

### Common Issues
- 404 on deployment
  - Check homepage URL
  - Verify build output
- Assets not loading
  - Confirm public path in webpack config
  - Use `process.env.PUBLIC_URL` for asset paths

## Project Structure Recommendations
```
ecommerce-app/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
│
├── .env
├── package.json
└── README.md
```

## Resources
- [GitHub Pages Docs](https://pages.github.com/)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
