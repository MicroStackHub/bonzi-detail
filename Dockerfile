# Use Node.js image
FROM node:20-alpine

# Install required tools for Alpine
RUN apk add --no-cache bash git libc6-compat

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy all source files
COPY . .

# Expose port for Next.js dev server
EXPOSE 5000

# Run Next.js in dev mode on all network interfaces
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "5000"]
