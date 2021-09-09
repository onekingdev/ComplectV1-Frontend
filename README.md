# Complect - Frontend

## Run in Docker Container
1. Start dev server: `docker-compose up`
2. Navigate to `localhost:81`

## or Run locally
1. Install dependencies: `npm i`
2. Start dev server: `npm run dev`
3. Navigate to `localhost:81`

## tmp solution to run with back
1. Ask about `env.local` file
2. Run: `docker-compose -f docker-compose-full.yml up`
4. SSH to complect-app container and run:
	* `rake db:create`
	* `rake db:migrate`
	* `rake db:seed`
5. Navigate to `localhost:81`


## To-Do
1. Babel
	* transform-class-properties ???
2. Setup ESLint after transfer
3. Fix Router