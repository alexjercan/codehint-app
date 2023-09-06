# CodeHint WebApp

Web application that allows you to check for bugs in your code using LLMs.

### Quickstart

This project requires you to setup a firebase backend service and use firestore
database. You will also need to setup a Stripe account and setup the product to
allow users to add more credits.

```console
npm install
npm run dev
```

### Firebase

You can find some details in the `.firebaserc` related files

- The application uses the `Authentication` service: Google provider
- The application uses the `Firestore Database` service

Probably you will want to run

```console
firebase init
```

here choose only `firestore` and setup your own project. Also don't forget to
change the config from `./src/lib/firebase.ts` to match your own public keys.
