# Bonzi Frontend - E-commerce Product Detail Application

## Overview
This is a Next.js-based e-commerce frontend application for product details and catalog viewing. The application features product galleries, information displays, related products, and shopping cart functionality.

## Project Status
- **Type**: Next.js Frontend Application
- **Status**: Successfully configured for Replit environment
- **Port**: 5000 (configured for Replit proxy)
- **Import Date**: October 3, 2025
- **Deployment**: Configured for autoscale deployment

## Architecture
- **Framework**: Next.js 14.2.32
- **Styling**: Tailwind CSS
- **UI Components**: React with custom components
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## Key Features
- Product gallery and information display
- Shopping cart context and functionality
- Contact seller modal
- FAQ and user support
- Google Translate integration
- Responsive design with mobile support

## Project Structure
```
├── components/          # React components
│   ├── product/        # Product-specific components
│   ├── ContactSellerModal.js
│   ├── Header.js
│   ├── Footer.js
│   └── Layout.js
├── contexts/           # React contexts (Cart, etc.)
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   ├── product/       # Product detail pages
│   └── index.js       # Homepage
├── public/            # Static assets
└── styles/            # CSS and styling
```

## Configuration
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **Port**: 5000
- **Cache Control**: Disabled for development (no-cache headers)
- **Allowed Origins**: Configured for Replit domains (*.replit.dev, *.repl.co)

## Development
- Run with: `npm run dev`
- Build with: `npm run build`
- Production: `npm start`

## Recent Changes
- October 3, 2025: Fixed infinite rendering and hydration errors
  - **Removed all Google Translate functionality** to fix hydration issues
    - Removed translation script loading from _app.js
    - Removed language dropdown and all isClient logic from Header.js
    - Removed isClient state from Layout.js
    - Deleted GoogleTranslate.js, LanguageDropdown.js, GoogleTranslateWrapper.js components
    - Deleted translation CSS files (google-translate.css, translate.css)
  - **Hydration errors completely resolved** - no more server/client mismatch
  - Product detail page verified to be fetching data correctly
  - Application now runs without rendering errors
  - Module count reduced from 423 to 364 (cleaner codebase)
  
- October 3, 2025: Fresh GitHub import completed
  - Updated port from 3000 to 5000 for Replit environment
  - Installed all npm dependencies successfully
  - Disabled experimental optimizeCss feature (was causing module errors)
  - Configured deployment for autoscale with build and start commands
  - Frontend workflow verified and running successfully

## Notes
- Application includes Docker configuration but uses Replit's native environment
- Image domains configured for admin.glst.in
- Cache-Control headers configured to prevent iframe caching issues