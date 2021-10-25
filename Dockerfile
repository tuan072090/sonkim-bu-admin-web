FROM nginx:1.19-alpine

COPY build /usr/share/nginx/html

RUN rm /etc/nginx/nginx.conf

COPY nginx/nginx.conf /etc/nginx
COPY nginx/gzip.conf /etc/nginx
COPY nginx/nginx.conf /etc/nginx/default.template

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env.development .
COPY .env.production .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/default.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
