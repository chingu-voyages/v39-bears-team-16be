# Local Setup

clone the repository

```cli
git clone git@github.com:chingu-voyages/v39-bears-team-16be.git
```

go to the app folder

```cli
cd v39-bears-team-16be
```

Before running the app we need to configure a few things. Create a .env file in the root directory of the app.

```.env
# the default port is 5000
PORT=5000
#
BASE_URL=http://localhost:5000
# this is your React app
FRONTEND_URL=http://localhost:3000
#
NODE_ENV=development
# information for these keys are available on our Trello board
MONGODB_URI=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
# any random string
SECRET=
# I cannot share my AWS keys since it requires CC, its free so feel free to create ones
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

the next step is to run the app

```cli
npm install
```

```cli
node index.js
```
