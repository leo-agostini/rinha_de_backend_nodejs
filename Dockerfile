# syntax=docker/dockerfile:1
FROM node:alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app
COPY package.json .
COPY . .
RUN npm install --loglevel verbose
RUN npm install typescript -g
RUN npx tsc
# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 8080

# Run the application.
CMD ["node", "src/main.js"]
