# Use the official Node.js 18 image as the base image
FROM 18.19-alpine

# Create a directory for the app
WORKDIR /app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Install playwright browsers
RUN npx playwright install --with-deps

# Copy the rest of the app files to the app directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]