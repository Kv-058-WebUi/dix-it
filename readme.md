docker pull postgres:11

docker run -it --name dixit -e POSTGRES_USER=dixit -e POSTGRES_PASSWORD=dixit -e POSTGRES_DB=dixit -p 5432:5432 postgres:11

