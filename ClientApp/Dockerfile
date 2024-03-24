# Use a Node.js base image
FROM node:16

# Set the working directory in the Docker image
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application to the Docker image
COPY . .

# # Build the TypeScript application (assuming you have a build script in your package.json)
# RUN npm run dev

# Specify the port number the container should expose
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
