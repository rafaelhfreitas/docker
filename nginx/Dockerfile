# FROM nginx:latest


# COPY html /usr/share/nginx/html

# ENTRYPOINT [ "/docker-entrypoint.sh" ]
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

