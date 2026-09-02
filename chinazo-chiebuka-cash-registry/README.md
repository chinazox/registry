# Chinazo & Chiebuka — Cash Gift Registry

A simple standalone static registry designed for Netlify.

## Before publishing

Open `script.js` and replace:
- BANK_DETAILS with your real bank details.
- Each fund's `paypal` value with your PayPal payment link.
- Each fund's `gocardless` value only after GoCardless confirms that your intended wedding-gift use is permitted and you have the correct payment links.

You can also change each fund's `goal` and `contributed` values there.

## Deploy

Upload the contents of this folder to a new Netlify site, or connect the folder/repository to Netlify.

The site does not process or store money itself. It simply sends guests to your chosen payment method.
