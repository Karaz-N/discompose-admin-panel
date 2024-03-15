docker build . -t discompose -f ./Dockerfile.deploy \
    && docker run -d -p 3000:3000 \
        -e DATABASE_URL="postgresql://root:password@172.17.0.2:5432/discompose?schema=public&connect_timeout=60" \
        -e JWT_SECRET="vOoJnLji0MFm7ito9ICPLLJm5xfeU2axjWEKfhBy0xdr0Q/1gVC9xoFzgcLF6Jita8AXICsx00INot188LRUYg==" \
        discompose