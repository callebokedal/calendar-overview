# Development container for React apps
# Build:   podman build -t myapp .
# Run:     podman run --rm -it -v $(pwd):/app:z -w /app -p 5175:5175 --name myapp-dev myapp

FROM node:22-alpine

WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app
USER appuser

EXPOSE 5175

# Vite dev server – bind to 0.0.0.0 so it is reachable from the host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
