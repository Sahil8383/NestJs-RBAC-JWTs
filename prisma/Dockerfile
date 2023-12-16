# Use the official Node.js image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable to indicate that this is a Prisma-only container
ENV PRISMA_GENERATE_ONLY true

# Command to run the Prisma generation
CMD ["prisma", "generate"]
