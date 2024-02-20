[Live Preview](https://pokemon-phi-swart.vercel.app/)

## Environment variables
```bash
DATABASE_URL="postgres...."
POKEMON_BASE_URL="https://pokeapi.co/api/v2"
```

## Run commands in order.
```
npm install
npm run db:up
npm run build
npm run start
```
## Running Cypress E2E Tests

To run the Cypress end-to-end tests for the project, please follow these steps:

### Step 1: Open Two Terminal Windows

Open two terminal windows side by side for better organization.

### Step 2: Build and Start the Application

In the first terminal window, execute the following commands:
```bash
npm run build
npm run start
```
These commands will build the project and start the application.

### Step 3: Start Cypress

In the second terminal window, run the following command to start Cypress:
```bash
npm run cypress:open
```
This command will launch the Cypress test runner interface for end-to-end testing.

---

#### Load pokemon data into db - [link](http://localhost:3000/api/pokemon)
  It will call the pokemon api and load details into db. It will return you loaded pokemons list. 
  
#### Click here view - [link](http://localhost:3000)
