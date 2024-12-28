# Project Title

## To Start the Backend server:

### 1. Please run npm i command in api directory

### 2. Include .env file provided

### 3. download stripe cli from "https://github.com/stripe/stripe-cli/releases/tag/v1.23.3" for handling webhook after payment is successful.

### 4. login into stripe cli using "stripe login" command

### 5. once the stripe is logged in strat the stripe cli using command :"stripe listen --forward-to localhost:5000/api/payments/webhook"

### 6. once it shows the webhook secret, copy it from the cli, it would be "Ready! You are using Stripe API Version [2024-12-18.acacia]. Your webhook signing secret is whsec\_********\*********" and paste it into .env file in ENDPOINT_SERET variable

### 7. once all of above steps are done, run npm run dev in the api directory

## To Start the FrontEnd server:

### 1. navigate to client directory

### 2. run command "npm install"

### 3. after command is executd run command "npm run dev" to start the server.
