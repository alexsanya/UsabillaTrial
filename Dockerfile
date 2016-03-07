FROM node:4-onbuild
WORKDIR ./
ADD * ./
RUN npm install -g bower
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN npm install -g gulp
RUN npm install --dev
CMD gulp
