docker-compose up -d
export DEV_PORT=\"$(docker inspect --format='{{(index (index .NetworkSettings.Ports "80/tcp") 0).HostPort}}' $(docker-compose ps -q) )\"
webpack --watch
