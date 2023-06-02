# from base image node
FROM node:16

WORKDIR /app

# copying all the files from your file system to container file system
COPY package.json /app

# install all dependencies
RUN npm install

# copy oter files as well
COPY . /app


#expose the port
EXPOSE 3001

# command to run when intantiate an image
CMD ["npm","start"]