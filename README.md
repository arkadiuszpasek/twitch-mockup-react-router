# Twitch Application, created during Udemy Course Modern React with Redux by Stephen Grider

# How to use this app
- Clone the repo and run `npm install`
- Navigate to 'json-server' and run `npm install` (this seems weird to double install, the reason is: this server is created just to allow us to make REST requests in this demo, can be installed in completely different place)
- in 'json-server' directory create 'db.json' file, give it a structure of

```
{
  "streams": []
}
```

- you can call it differently, but be sure to change this name in package.json
- run an instance of json server with `npm start`
- go back to main directory and run `npm start`

## What I learned during this project
- React Redux - Useful to manage streams, handle forms and user authentication
- React Router - Navigation in this application
- React portals - displaying modals (delete stream popup)
- Redux-form
- Redux-thunk - Super important middleeware for handling async fetching
- Google OAuth2 authorization in a browser
- REST - managing streams

### What's installed:
- redux-thunk, redux-form, react-router-dom
- axios
- lodash

- json-server

##### This app is a learning project and should have much more error handling ;)

### Possible continuation for streaming media and viewing in the app
### How to work with node-media-server
Install node-media-server somewhere, quick setup:
- run `npm init` in specified directory
- add script to package.json `"start": "node index.js"`
- `npm install --save node-media-server`
- create index.js, look up documentation, basic setup now looks similar to:

```
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
  },
};

const nms = new NodeMediaServer(config);
nms.run();
```

Install flv.js and edit StreamShow component to receive video from node-media-server, like:

```
this.player = flv.createPlayer({
  type: 'flv',
  url: 'http://localhost:8000/${id}.flv',
});
this.player.attachMediaElement(this.videoRef.current);
this.player.load()
```

where this.videoRef is a ReactRef for <video> in StreamShow component

Use componentWillUnmount to destroy player in StreamShow