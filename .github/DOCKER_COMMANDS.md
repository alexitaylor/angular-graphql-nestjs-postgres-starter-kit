# Docker

## Useful Docker Commmands

```bash
# List Docker CLI commands
$ docker
$ docker container --help

# Display Docker version and info
$ docker --version
$ docker version
$ docker info

# Execute Docker image
$ docker run hello-world

# List Docker images
$ docker image ls

# List Docker containers (running, all, all in quiet mode)
$ docker container ls
$ docker container ls --all
$ docker container ls -aq
$ docker ps
$ docker-compose ps

# List all containers, even those not running
$ docker container ls -a

# List Docker service
$ docker service ls

# List the tasks for your service
$ docker service ps <servicename>

# Build services from docker-compose.yml
$ docker-compose build

# Builds, (re)creates, starts, and attaches to containers for a service.
$ docker-compose up

# Reset docker-compose
$ docker-compose kill; docker-compose rm -f;

# Create image using directory's Dockerfile
$ docker build -t myapp .

# Run "myapp" mapping port 4000 to 80
$ docker run -p 4000:80 myapp

# Same thing, but in detached mode
$ docker run -d -p 4000:80 myapp

# Gracefully stop the specified container
$ docker container stop <hash>

# Force shutdown of the specified container
$ docker container kill <hash>

# Remove specified container from this machine
$ docker container rm <hash>

# Remove all containers
$ docker container rm $(docker container ls -a -q)

# Remove specified image from this machine
$ docker image rm <image id>

# Remove all images from this machine
$ docker image rm $(docker image ls -a -q)

# Log in this CLI session using your Docker credentials
$ docker login

# Tag <image> for upload to registry
$ docker tag <image> username/repository:tag

# Upload tagged image to registry
$ docker push username/repository:tag

# Run image from a registry
$ docker run username/repository:tag

#  Go inside your container and connect to postgres
docker exec -it <containerid> bash
```

## Dockerfile

- Dockerfile defines what goes on in the environment inside your container.
- Example of Dockerfile:

```dockerfile
# We label our stage as ‘builder’
FROM node:10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 4200
```

## Docker-compose.yml file

- A docker-compose.yml file is a YAML file that defines how Docker containers should behave in production

## Docker Terms

- **Image** - An instance / template of your application.
- **Container** - The running instance of your app image.
- **Service** - A group of containers.

## Image

- A Docker Image is the template (application plus required binaries and libraries) needed to build a running Docker Container (the running instance of that image). As templates, images are what can be used to share a containerized applications. Collections of images are stored/shared in registries like Docker Hub.

## Service

- A service is a group of containers of the same image:tag.Services make it simple to scale your application.
- A single container running in a service is called a task.
- Services are really just “containers in production.” A service only runs one image, but it codifies the way that image runs—what ports it should use, how many replicas of the container should run so the service has the capacity it needs, and so on.

## Swarm

- Docker Swarm is a clustering and scheduling tool for Dockercontainers. With Swarm, IT administrators and developers can establish and manage a cluster of Docker nodes as a single virtual system.
- A swarm is a group of machines that are running Docker and joined into a cluster.

## Understanding Swarm clusters

A swarm is a group of machines that are running Docker and joined into a cluster. After that has happened, you continue to run the Docker commands you’re used to, but now they are executed on a cluster by a swarm manager. The machines in a swarm can be physical or virtual. After joining a swarm, they are referred to as nodes.
Swarm managers are the only machines in a swarm that can execute your commands, or authorize other machines to join the swarm as workers

## What is difference between Docker container and image?

Using an object-oriented programming analogy, the difference between a Docker image and a Docker container is the same as that of the difference between a class and an object. An object is the runtime instance of a class. Similarly, a container is the runtime instance of an image
