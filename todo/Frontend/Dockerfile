# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Install xsel
RUN apt-get update && apt-get install -y xsel

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
