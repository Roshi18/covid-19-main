# covid-19-main
# You still need to run the container with something like:

bash
Copy
Edit
docker run -p 3000:3000 your-image-name
Think of EXPOSE as documentation for Docker and other devs, not a port forward.

🧪 How to Write EXPOSE in Other Dockerfiles
Here are a few examples for different frameworks/apps:

🌐 For a Python Flask App
dockerfile
Copy
Edit
FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]
⚙️ For a Java Spring Boot App
dockerfile
Copy
Edit
FROM openjdk:17-jdk
WORKDIR /app
COPY target/myapp.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
📦 For a React App (static site)
dockerfile
Copy
Edit
FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

common:
# syntax=docker/dockerfile:1

FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
