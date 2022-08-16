# Contributing ✨

Thank you for your interest in Daily web coding!

# Project setup 👩‍💻

## System required 🖌

-   Node >= 16 https://nodejs.org/en/
-   Git >= 2.34.1 https://git-scm.com/
-   firebase-cli >=9.10.0 https://www.npmjs.com/package/firebase-tools

## Setup steps

First, fork the repo, then do this:

```sh
git clone <your-fork>
cd ./dailywebcoding

git checkout dev
# if you are making *any* code changes, make sure to checkout the dev branch

cp .env.local.sample .env.local
# replace it your config
```

next 👉

change to your projectId at [.firebaserc](.firebaserc)

```sh
yarn install
# install the dependencies

yarn run dev
# run project in development mode

yarn run firebase-import
# start firebase emulator for the development process

# or to start next.js and firebase emulator at the same time
yarn run dev-local
```

If that all worked without trouble, you should be able to start development and see the result at `http://localhost:3000` and firebase emulator at `http://localhost:4000`

Default account at `http://localhost:3000/editor/login`

```sh
email: testing@gmail.co
password: 1234567
```

## Firebase emulator

if you have problem with firebase emulator checkout this video 👇

https://www.youtube.com/watch?v=npNJUpTvO0M&t=124s

## Deployment

if you want to deploy to vercel checkout this video 👇
https://www.youtube.com/watch?v=I7dZsYWsX-A
