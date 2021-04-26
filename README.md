# Cosmos Odyssey

Webapplication for your space tarvelling needs. Browse flight offers from different space agencies and make a reservation.
[Live Demo](https://safe-beyond-56735.herokuapp.com/)

Screenshots from app:

![select-destination](https://user-images.githubusercontent.com/22045387/116026074-9ad74a00-a65a-11eb-8832-465a2fed0cf7.png)

![make-reservation](https://user-images.githubusercontent.com/22045387/116026123-b2163780-a65a-11eb-9f0c-2a895170abb6.png)


## Setting up development environment

Clone repo recursively

```
git clone https://github.com/ClevenL/cosmos-odyssey.git --recursive
```

Install server and client

```
cd cosmos-odyssey
npm install
cd client
npm install
```

You will need a MondoDB instance and configure `.env` file with a Mongo URI

Run the server from git root:

```
npm run start
```

Run the client

```
cd client
npm run dev
```

The app should be running on localhost:8080

## Setting up deployment

Use vite build to build the assets into server's public folder.
In client folder

```
npm run build
```

In production the assets will be served by Express

## Built With

* [Node.js](https://nodejs.org/en/) engine
* [Express](https://expressjs.com/) framework
* [MongoDB](https://www.mongodb.com/) database

For [Live Demo](https://safe-beyond-56735.herokuapp.com/) I used

* [mLab](https://mlab.com/) Database-as-a-Service for MongoDB
* [Heroku](https://www.heroku.com/) Cloud Application Platform

For details about frontend see the [client submodule](https://github.com/ClevenL/cosmos-odyssey-client/tree/c821261e7496de273f54f481fecb82e30f70b357)

## Thank you

Uptime for providing an exciting project
