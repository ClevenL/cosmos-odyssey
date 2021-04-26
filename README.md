# Cosmos Odyssey

Webapplication for your space tarvelling needs. Browse flight offers from different space agencies and make a reservation.
[Live Demo](https://safe-beyond-56735.herokuapp.com/)

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

## Thank you

Uptime for providing an exciting project