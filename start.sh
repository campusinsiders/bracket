docker-compose up -d
export DEV_PORT=\"$(docker-compose port web 80 |  sed 's/.*://')\"
webpack --watch
