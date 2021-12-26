# TP-Link Web Panel

A web panel to manage TP-Link/Kasa smart home devices.

![Web Panel Preview](https://i.milanm.org/r/tplink-web-panel-main.png)

## Prerequisites

- [Node.js](https://nodejs.org) `v16.13.1` or higher

- [Yarn](https://yarnpkg.com/)

## Installation

1. Run `git clone https://github.com/milanmdev/tplink-web-panel.git`

2. Install dependencies via the `yarn install` command
3. Rename the `.env.example` file to `.env` and fill out the information requested (TP-Link account email & password).

## Running the panel

### Production:

1. Build the app using `yarn build`.

2. Start the application using `yarn start`.

3. Visit the website at [localhost:4461](http://localhost:4461).

### Development:

Run `yarn dev` and visit the website at [localhost:3000](http://localhost:3000).
