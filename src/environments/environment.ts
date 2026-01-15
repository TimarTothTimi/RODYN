// src/environments/environment.ts
export const environment = {
  production: false,
  firebaseConfig: {  // 🔹 a név legyen firebaseConfig, és erre hivatkozz a main.ts-ben
    apiKey: 'AIzaSyBZVxTwpfdKcx4UMRvHbpZ0CqmRHsvKDhI',
    authDomain: 'rodyn-ccd13.firebaseapp.com',
    projectId: 'rodyn-ccd13',
    storageBucket: 'rodyn-ccd13.appspot.com', // javítottam az URL-t
    messagingSenderId: '884933714524',
    appId: '1:884933714524:web:1f962a025094e040ad3c99',
    measurementId: 'G-RZRFVRE4LL',
  },
};
