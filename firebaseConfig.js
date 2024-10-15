import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { Platform } from "react-native";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUZi1DPoj412FM9Q4wZ9ICJNiSsWP_PMY",
  authDomain: "baby-name-native.firebaseapp.com",
  projectId: "baby-name-native",
  storageBucket: "baby-name-native.appspot.com",
  messagingSenderId: "65750711093",
  appId: "1:65750711093:web:4d58b0aed35429f0992a7c",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service

const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

export { auth };
