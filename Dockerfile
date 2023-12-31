FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

# Install Prisma CLI globally
RUN npm install --force -g prisma

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable to indicate that this is a Prisma-only container
ENV PRISMA_GENERATE_ONLY true

# Command to run the Prisma generation
CMD ["prisma", "generate"]
