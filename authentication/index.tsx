import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  signOut as signOutFirebase,
  UserCredential,
  sendEmailVerification,
  // TODO: add this functionality
  // sendPasswordResetEmail,
} from "firebase/auth";

type signUp = (
  email: string,
  password: string
) => Promise<UserCredential | undefined>;
type signIn = (
  email: string,
  password: string
) => Promise<UserCredential | undefined>;
type signOut = () => Promise<void>;

type Value =
  | {
      user: User | null;
      signUp: signUp;
      signIn: signIn;
      signOut: signOut;
      hasAccess: boolean;
    }
  | undefined;

const AuthContext = createContext<Value>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn: signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    return userCredential;
  };

  const signOut: signOut = async () => {
    await signOutFirebase(auth);
  };

  const signUp: signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await sendEmailVerification(userCredential.user);

    // Creating a new user account automatically signs them in,
    // but we don't want this behavior as the email is not yet verified.
    // Sign out the user immediately to prevent access before email verification
    await signOut();

    return userCredential;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      console.log("somethong changed");
      setUser(newUser);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        user,
        hasAccess: user?.emailVerified ?? false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
