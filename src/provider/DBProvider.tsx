// Environmental variables
// @ts-ignore
import {API_KEY, APP_ID, AUTH_DOMAIN, DATABASE_URL, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET} from "@env";
import {initializeApp} from "firebase/app";
import {initializeFirestore} from "firebase/firestore";
import React, {createContext} from "react";

// Better put your these secret keys in .env file
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};

const DBContext = createContext(null);
const DBProvider = (props) => {
    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {experimentalForceLongPolling: true});  // long polling required

    return (
        <DBContext.Provider value={{db}}>
            {props.children}
        </DBContext.Provider>
    );
};

export {DBContext, DBProvider};
