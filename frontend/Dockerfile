# pull official base image
FROM node:latest

# set working directory
WORKDIR /app/

# add `/node_modules/.bin` to $PATH
ENV PATH ../node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . /app/

# start app
CMD ["npm", "start"]