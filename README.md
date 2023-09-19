# Interview

Basic TODO App

## Run

**Install dependencies**

  $ yarn

**Start mysql container**

  $ docker compose up

**Copy .env-example into .env**

  $ cp ./apps/api/.env-example ./apps/api/.env

**Start api**

  $ nx serve api

> Nest.js api server will run on port 3000

**Start dashboard**

  $ nx serve dashboard

> React.js app will run on port 4200
