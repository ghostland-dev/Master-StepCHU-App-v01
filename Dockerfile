# Stage 1: Build with .env file
FROM node:21.2.0  

WORKDIR /app

COPY package-lock.json ./
COPY package.json ./
COPY . .   

RUN npm install --production

# Stage 2: Production image (no .env file)
FROM node:21.2.0

WORKDIR /app

# Copy all files except .env
COPY --from=0 . --exclude=.env

# Set environment variables
ENV REACT_APP_NAME="CHU Step-CHU Admin"
ENV REACT_APP_LOCALE="fr"
ENV REACT_APP_API_URL="https://test.theotruvelot.fr/"
ENV REACT_APP_API_PATH="https://test.theotruvelot.fr/api/"
ENV REACT_APP_STORAGE_KEY="DASHBOARD_STEPCHU_ADMIN"

EXPOSE 8050

CMD [ "npm", "start" ]
