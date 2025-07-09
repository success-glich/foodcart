# Docker Setup for FoodCart Recipe App

This project includes Docker and Docker Compose configurations for both development and production environments.

## Prerequisites

- Docker
- Docker Compose

## Development Environment

### Quick Start
```bash
# Build and start the development container
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f foodcart-dev
```

The development server will be available at `http://localhost:3000`

### Development Features
- Hot reload enabled
- Source code mounted as volume for live editing
- Node modules cached in anonymous volume
- Environment variables for development

### Useful Development Commands
```bash
# Stop the development container
docker-compose down

# Rebuild the container (after package.json changes)
docker-compose up --build

# Access the container shell
docker-compose exec foodcart-dev sh

# Install new packages
docker-compose exec foodcart-dev npm install <package-name>

# Run tests
docker-compose exec foodcart-dev npm test

# View container logs
docker-compose logs foodcart-dev
```

## Production Environment

### Build and Run Production
```bash
# Build and start production container
docker-compose --profile production up --build foodcart-prod

# Run in detached mode
docker-compose --profile production up -d foodcart-prod
```

The production app will be available at `http://localhost:80`

### Production Features
- Multi-stage build for optimized image size
- Nginx web server for serving static files
- Gzip compression enabled
- Security headers configured
- Optimized caching for static assets

### Production Commands
```bash
# Stop production container
docker-compose --profile production down

# View production logs
docker-compose logs foodcart-prod

# Clean up unused images
docker image prune
```

## Environment Variables

You can customize the application by setting environment variables:

- `REACT_APP_API_URL`: API endpoint for recipe data (default: https://forkify-api.herokuapp.com/api/v2)
- `NODE_ENV`: Environment mode (development/production)
- `CHOKIDAR_USEPOLLING`: Enable polling for file changes in containers

## Docker Compose Services

### foodcart-dev
- **Purpose**: Development environment
- **Port**: 3000
- **Features**: Hot reload, volume mounting, development optimizations

### foodcart-prod
- **Purpose**: Production environment
- **Port**: 80
- **Features**: Nginx server, optimized build, security headers

## File Structure

```
.
├── Dockerfile              # Development Dockerfile
├── Dockerfile.prod         # Production Dockerfile
├── docker-compose.yml      # Main Docker Compose configuration
├── docker-compose.override.yml  # Development overrides
├── nginx.conf              # Nginx configuration for production
├── .dockerignore           # Files to ignore during Docker build
└── DOCKER.md              # This file
```

## Troubleshooting

### Port Already in Use
If port 3000 or 80 is already in use, modify the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Use port 3001 instead of 3000
```

### File Changes Not Reflecting
If hot reload isn't working in development:
```bash
# Restart the container
docker-compose restart foodcart-dev

# Or rebuild if needed
docker-compose up --build
```

### Permission Issues
On Linux/macOS, if you encounter permission issues:
```bash
# Fix ownership of node_modules
docker-compose exec foodcart-dev chown -R node:node /app/node_modules
```

## Performance Tips

1. **Use .dockerignore**: Ensure `.dockerignore` excludes unnecessary files
2. **Layer Caching**: Order Dockerfile commands to maximize cache usage
3. **Multi-stage Builds**: Production Dockerfile uses multi-stage builds for smaller images
4. **Volume Optimization**: Anonymous volumes for node_modules improve performance
