# -- STAGE-1 - Build the React App --
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .


RUN npm run build

# -- STAGE-2 - Serve with Nginx --

FROM nginx:alpine AS production

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx","-g","daemon off;"]
