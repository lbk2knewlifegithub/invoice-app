FROM nginx:stable-alpine
EXPOSE 80
# COPY ./nginx/frontend.default.conf /etc/nginx/conf.d/default.conf
COPY ./dist/apps/frontend /usr/share/nginx/html

# EXPOSE 80
# COPY ./nginx/frontend.default.conf /etc/nginx/conf.d/default.conf
# COPY ./dist/apps/frontend /usr/share/nginx/html
# CMD [ "nginx", "-g", "daemon off;" ]
