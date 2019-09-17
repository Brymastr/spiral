# ---- Build ----
FROM node:lts-alpine as build-stage
WORKDIR /src
COPY . .
# install node packages
RUN npm config set progress=false && \
  npm config set depth 0 && \
  npm install --only=production --quiet --production && \
  cp -R node_modules prod_node_modules && \
  npm install --quiet
RUN npm run build

# ---- Prod ----
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /src/dist /usr/share/nginx/html
COPY --from=build-stage /src/prod_node_modules /usr/share/nginx/html/node_modules
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]