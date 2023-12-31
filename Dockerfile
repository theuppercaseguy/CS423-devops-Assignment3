FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update -y 
RUN apt-get install nodejs -y

RUN mkdir ./web

COPY ./App ./web

WORKDIR ./web

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "start"]


