# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the React build files to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config to serve React routing (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
