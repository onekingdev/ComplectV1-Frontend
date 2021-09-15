# Complect - Frontend

## Run in Docker Container
1. Start dev server: `docker-compose up`
2. Navigate to `localhost:81`

## or Run locally
1. Install dependencies: `npm i`
2. Start dev server: `npm run dev`
3. Navigate to `localhost:81`

## Environments
1. Edit `src/services/axios/backendUrl.js` to configure backend base URL. TODO: Move to envvar.

## Static build for live deployment
1. Stop `dev`/`up` command, if it is running
2. Run `npm install`
3. Run `npm run build`

## Serving static build (live)

First, set up backend base URL, and prepare a static build with `npm run build` command.
It produces `dist` directory that should be served as document root directory.
Index page `/` and all user-accessible page URLs (eg `/business/dashboard`), should respond the same contents from `index.html`.
This page loads required assets and routing is handled on frontend.

## To-Do
1. Babel
	* transform-class-properties ???
2. Setup ESLint after transfer
3. Fix Router