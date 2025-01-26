
<h1 align="center">Bingus</h1>


<p align="center">A Full-stack social media project (frontend repo)</p>

![preview](/public/images/preview_ui.png)

## Demo:  [Live](https://bingus.hiroc.vip)

## Built with
- Vite + React
- Websockets (Socket.io)
- Tanstack query
- React router v6
- SASS


## Key Features
- Live chat with other users.
- Cached queries for smoother experience
- Customisation of profile including profile picture.
- Uploading of post with images or videos.
- Responsive design.
- Follows of other users for customised feed.
- Likes and comments for posts.
- Replies for comments.

## Dependencies 
- **@tabler/icons-react**: comprehensive icon library for React
- **@tanstack/react-query**: efficient data-fetching and server state management library for React
- **date-fns**: formatting dates nicely for posts
- **react**: core library for building user interfaces
- **react-dom**: enables rendering React components in the DOM
- **react-router-dom**: routing library for navigating between pages in React applications
- **react-spinners**: customer spinners for loading UI
- **react-textarea-autosize**: auto-resizing textarea component for React
- **react-toastify**: UI library for toasts
- **socket.io-client**: for bidirectional and event-based commucations between client and the server (NodeJS)


## Development 
Here is how you can start the projecct locally. 

Prerequisites 
1. Clone the backend API repo and run it. You can head over to the [backend api repo](https://www.github.com/LegalUnicorn/bingus-api) and follow the instructions for settig up the API

1. Clone the repo 
```bash
# HTTPS
$ git clone https://github.com/Legalunicorn/bingus.git

#SSH
$ git clone git@github.com:Legalunicorn/bingus.git
```

**2. Download Dependencies**
```
$ cd bingus
$ npm i  
```
or `$ yarn`

**3. Create `.env.local`**
```bash
touch .env.local 
```

**4. Add the following to `.env.local` (not secrets but for global variables)**
```
VITE_API_URL = "http://localhost:3000/api"
VITE_SERVER_URL = "http://localhost:3000"
VITE_DEFAULT_PFP="https://res.cloudinary.com/ds80ayjp7/image/upload/v1725690182/bingus_pfp_bzezbh.png"
```


**5. Start the project**

`$ npm run dev` 

or  

`& yarn run dev`

Have fun!

