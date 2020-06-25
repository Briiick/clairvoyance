# pull official base image
FROM node:latest

# set working directory
WORKDIR /frontend

# add `/node_modules/.bin` to $PATH
ENV PATH ../node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . /frontend

# start app
CMD ["npm", "start"]