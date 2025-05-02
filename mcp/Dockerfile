# Use the node image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package.json ./
COPY tsconfig.json ./
COPY tsup.config.ts ./
COPY src ./src/

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

ENV PORT=3000

# Expose the port on which the API will listen
EXPOSE 3000

# Run the server when the container launches
CMD ["node", "dist/server.js"]