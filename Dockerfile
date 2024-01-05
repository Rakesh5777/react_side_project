## Stage 1: Build the application.................
#FROM node:18 as build
#WORKDIR /app
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . ./
#RUN npm run build
#
## Stage 2: Serve the application
#FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Install node modules and build ReactJS app code
FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Copy ReactJS app code to a new image without node modules
FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
