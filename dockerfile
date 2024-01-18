# Get the image of Playwright
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Install tools
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    curl \
    gnupg

# Add Brave repository to apt sources
RUN curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -
RUN echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main" | tee /etc/apt/sources.list.d/brave-browser-release.list

# Install Brave browser
RUN apt-get update && apt-get install -y \
    brave-browser

# Install Microsoft Edge
RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
RUN install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
RUN sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list'
RUN rm microsoft.gpg
RUN apt-get update && apt-get install -y microsoft-edge-dev

# Create a directory for the app
WORKDIR /app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files to the app directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]