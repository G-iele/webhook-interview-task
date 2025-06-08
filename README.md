# Webhook Interview Task

## Overview

This project is a webhook handler that processes subscription events for customers. It allows for the creation, updating, and deletion of customer subscriptions, and checks access to products based on subscription status.

## Features

- **Event Handling**: Processes subscription events (created, updated, deleted) and updates the subscription data accordingly.
- **Access Control**: Validates customer access to products based on their subscription status and trial periods.
- **Error Handling**: Provides structured error responses.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd webhook-interview-task
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm run dev
   ```
2. The server will run on the specified port (default is 3000).

## API Endpoints

- **POST /events/subscriptions**: Handles subscription events.
- **GET /api/products**: Retrieves product access information for a customer.

### Testing Subscription Events with Postman

- **Endpoint:** `POST /events/subscriptions`
- **Body:** Select `raw` and `JSON`.
- **Paste one of the mocked Stripe webhook sample JSON files** from the `mock/` folder (e.g., `customer-post-data-create.json`, `customer-post-data-update.json`, etc.) as the request body.
- **Send the request** to simulate a subscription event.

### Testing Product Access with Postman

- **Endpoint:** `GET /api/products`
- **Headers:** Add a header named `x-customer-id` and set its value to the desired customer ID (e.g., `cus_1`, `cus_2`, etc.).
- **Send the request** to check if the customer has access to the product.
