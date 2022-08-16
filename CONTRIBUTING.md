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

cp .env.local.sample .env
# replace it your config
```

next 👉

```sh
yarn install
# install the dependencies

yarn run dev
# run project in development mode

yarn run firebase-import
# start firebase emulator for the development process
```

If that all worked without trouble, you should be able to start development and see the result at `http://localhost:3000` and firebase emulator at `http://localhost:4000`
