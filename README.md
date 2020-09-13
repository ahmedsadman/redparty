# RedParty

> LIVE: https://redparty.netlify.app

**(WORK IN PROGRESS)**

A React based web application that let's you host Youtube watch party with friends. Sync videos and chat with friends in real-time. This application uses Socket.io to handle connections.

## Features

-   Host Youtube videos in a room
-   Sync videos in real-time
-   Instant messaging with friends

## Deployment

As you can see, both client and server is in same repo. The client is deployed in Netlify and
the server is deployed to Heroku

If you want to deploy the server to Heroku, you have to only deploy the `server` folder otherwise Heroku
will throw errors. For this, run the following git command from root folder:

```
git subtree push --prefix server heroku master
```

_More information will be added as the project progresses further_
