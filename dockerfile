
FROM node:latest


# Copy package.json and package-lock.json for npm install
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code and .env file
COPY . .  

# Expose the port you want to use
EXPOSE 8080

# Start the app
CMD [ "node", "index.js" ]
