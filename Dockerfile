FROM node:8.5

# Set log level less verbose
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /my-project

# Copy source code
COPY . .

# Install dependencies
RUN npm install yarn -g
RUN yarn

# Generate DLL
RUN npm run dll

# Expose app port
# so we can access it from host machine
EXPOSE 5000

# Let's go
CMD ["npm", "start"]
