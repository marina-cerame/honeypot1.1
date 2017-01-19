# honeypot
Honeypot is a native, cross-platform application that helps users manage personal finance in an easy and fun way by linking game-play to monetary savings. Through in-game microtransactions, users deposit money into their savings account by purchasing supplies for their virtual pet.

The user interface is a pet-care game that triggers ACH transfers between a user’s checking and savings accounts. The happier your pet, the bigger your savings.

## Mockups

![image currently down](https://github.com/TheBearQuarium/honeypot/blob/master/images/honeypot2.png?raw=true 'honeypot mockup')

## Architecture

![image currently down](https://github.com/TheBearQuarium/honeypot/blob/master/images/honeypotarchitecture.png?raw=true 'honeypot architecture')

## Tech Stack

![image currently down](https://github.com/TheBearQuarium/honeypot/blob/master/images/TechStack.png?raw=true 'Angular 2, Ionic 2, Node js, Nodal, PostgreSQL, Plaid, Stripe, Amazon Web Services, Passport, Apache Cordova')

## Technical investigations done / to do

**Animation** -
Ultimately we would like to implement simple but engaging and dynamic animations for pets to react to user interaction. At this time, we need to investigate what library will best fit our needs.

**Bank Connections** -
Before choosing this project idea, we spent a considerable amount of time researching banking API options. Since we want to facilitate ACH transactions between a user’s accounts, we need a service that would both authenticate bank accounts and handle the actual transfer. We found that this was difficult to find as a single service and ultimately chose a combination of Plaid for authentication and Stripe for performing transactions.

**Authentication** -
Users will log into honeypot using Passport authentication to track in-app savings and pet statistics. They will also need to authenticate their bank account ownership through Stripe. We need to investigate whether there is a secure method for storing tokens from Stripe in our database to prevent users from having multiple log-in requirements each time they use our app.


## Ownership

- **Server** - Marina
- **Database** - Brendan
- **Bank API** - Connor
- **Client** - Chris & Grace
