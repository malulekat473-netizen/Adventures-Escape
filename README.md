# SME Adventures Booking

An Expo React Native app built with TypeScript and Expo Router. It includes seven adventure offerings, course detail routes, a booking request form, and an explicitly non-formal quote estimate with configurable discount and 15% VAT.

## Requirements

- Node.js LTS
- Expo Go installed on an iOS or Android device
- The computer and phone on the same network for the default LAN connection

## Install and run

```powershell
npm install
npm start
```

Scan the QR code in the Expo terminal with Expo Go. If the devices cannot reach each other on the LAN, use `npx expo start --tunnel`.

For the web preview, run `npm run web`. TypeScript can be checked with `npm run typecheck`.

## Screens

Home, About, Course Overview, seven course detail pages, Booking Request, Non-formal Quote Review, Venue & Directions, FAQ, Gallery, and Contact.

## Quote behavior

Course selections are stored in an array in app state. The quote calculates the selected course subtotal, subtracts the chosen discount percentage, then calculates VAT at 15% on the discounted amount. It is an estimate for planning only, not an invoice, offer, or confirmed booking. No payment is processed.

## Contact

- Phone: 0680982119
- Email: ST10526345@rcconnect.edu.za
- Directions: https://maps.app.goo.gl/QhLLXGd2u14aw6LY6

Course photography loads from Unsplash, so image content requires an internet connection.