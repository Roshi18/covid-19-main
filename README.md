# covid-19-main
# You still need to run the container with something like:
   (OR)
(ii) Containerize an application using Docker.

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


PS C:\Users\roshi> cd my-fashion-ai
PS C:\Users\roshi\my-fashion-ai> docker build -t my-fashion-ai .
PS C:\Users\roshi\my-fashion-ai>  docker run -d -p 127.0.0.1:3000:3000 my-fashion-ai

also: git clone https://github.com/docker/getting-started-app.git

1st:
Task 0: Prerequisites
Clone the Lab’s GitHub Repo:
    git clone https://github.com/dockersamples/linux_tweet_app
Task 1: Run some simple Docker containers:
Run a single task in an Alpine Linux container:
   docker container run alpine hostname
   docker container ls --all
Run an interactive Ubuntu container:
    docker container run --interactive --tty --rm ubuntu bash
    ls /
    ps aux
    cat /etc/issue
    exit
    cat /etc/issue
Run a background MySQL container:
    docker container run --detach --name mydb -e MYSQL_ROOT_PASSWORD=my-secret-pw mysql:latest
    docker container ls
    docker container logs mydb
    docker container top mydb
    docker exec -it mydb mysql --user=root --password=$MYSQL_ROOT_PASSWORD --version
    docker exec -it mydb sh
    mysql --user=root --password=$MYSQL_ROOT_PASSWORD --version
    exit
Task 2: Package and run a custom app using Docker
Build a simple website image:
   cd ~/linux_tweet_app
   cat Dockerfile
   export DOCKERID=<your docker id>
   echo $DOCKERID
   docker image build --tag $DOCKERID/linux_tweet_app:1.0 .
   docker container run --detach --publish 80:80 --name linux_tweet_app $DOCKERID/linux_tweet_app:1.0
   docker container rm --force linux_tweet_app
Task 3: Modify a running website:
Start our web app with a bind mount:
   docker container run --detach --publish 80:80 --name linux_tweet_app --mount type=bind,source="$(pwd)",target=/usr/share/nginx/html $DOCKERID/linux_tweet_app:1.0
Modify the running website:
   cp index-new.html index.html
   docker rm --force linux_tweet_app
   ocker container run \
 --detach \
 --publish 80:80 \
 --name linux_tweet_app \
 $DOCKERID/linux_tweet_app:1.0
 docker rm --force linux_tweet_app
Update the image:
   docker image build --tag $DOCKERID/linux_tweet_app:2.0 .
   docker image ls
Test the new version:
  docker container run \
 --detach \
 --publish 80:80 \
 --name linux_tweet_app \
 $DOCKERID/linux_tweet_app:2.0

  docker container run \
 --detach \
 --publish 8080:80 \
 --name old_linux_tweet_app \
 $DOCKERID/linux_tweet_app:1.0
Push your images to Docker Hub:
   docker image ls -f reference="$DOCKERID/*"
   docker login
   docker image push $DOCKERID/linux_tweet_app:1.0
   docker image push $DOCKERID/linux_tweet_app:2.0


.yml:
name: CI/CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-python:
    if: contains(github.repository, 'python') || contains(github.ref, 'python')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Run Tests
        run: |
          pytest

  build-java:
    if: contains(github.repository, 'java') || contains(github.ref, 'java')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Build with Maven
        run: mvn clean install

  build-node:
    if: contains(github.repository, 'js') || contains(github.ref, 'js') || contains(github.repository, 'node')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test

  build-docker:
    if: contains(github.repository, 'docker') || contains(github.ref, 'docker')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: your-docker-username/your-image-name:latest
