# Stage 1 
# Use node as base image
FROM node:latest as build
# Set work directory for image directory
WORKDIR /app
# Run npm install for caching node modules
COPY package.json .
RUN npm install 
# Copy current source code into image folder
COPY . . 
# Build angular app [set env as desired ex. npm run build-[env] look to package.json scripts]
RUN npm run build 


# Stage 2 host into nginx example
# Use nginx as Base Image (ex)
FROM nginx:alpine
# Copy Nginx Configuration
COPY ./mime.types /etc/nginx/conf.d/mime.types
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copy build dist app into Nginx base image [replace angular-template with project name]
COPY --from=build /app/dist/angular-template /usr/share/nginx/html
# Expose port 80
EXPOSE 80 