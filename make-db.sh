docker build . -t database -f ./Dockerfile.db \
    && docker run \
        --name database \
        -d -p 5432:5432 \
        -e POSTGRES_PASSWORD=password \
        -e POSTGRES_USER=root \
        -e POSTGRES_DB=discompose \
        database
