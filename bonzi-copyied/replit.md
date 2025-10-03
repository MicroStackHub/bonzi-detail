# Bonzi Frontend - E-commerce Product Detail Application

## Overview
This is a Next.js-based e-commerce frontend application for product details and catalog viewing. The application features product galleries, information displays, related products, and shopping cart functionality.

## Project Status
- **Type**: Next.js Frontend Application
- **Status**: Successfully configured for Replit environment
- **Port**: 5000 (configured for Replit proxy)
- **Import Date**: September 29, 2025

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
- September 29, 2025: Initial Replit environment setup completed
- Dependencies installed successfully
- Frontend workflow configured and running
- Replit proxy configuration verified

## Notes
- Application includes Docker configuration but uses Replit's native environment
- Image domains configured for admin.glst.in
- Cache-Control headers configured to prevent iframe caching issues