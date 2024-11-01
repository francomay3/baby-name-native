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
  User as GoogleUser,
  onAuthStateChanged,
  signOut as signOutFirebase,
  UserCredential,
  sendEmailVerification,
  deleteUser as deleteUserFirebase,
  // TODO: add this functionality
  // sendPasswordResetEmail,
} from "firebase/auth";
import Loader from "@/components/Loader";
import { createUser, getUser, deleteUser as deleteUserDB } from "@/api";
import { User } from "@/types";

type signUp = (
  name: string,
  email: string,
  password: string
) => Promise<UserCredential | undefined>;
type signIn = (
  email: string,
  password: string
) => Promise<UserCredential | undefined>;
type signOut = () => Promise<void>;
type deleteUser = () => Promise<void>;

type Value =
  | {
      user: User | null;
      signUp: signUp;
      signIn: signIn;
      signOut: signOut;
      hasAccess: boolean;
      loading: boolean;
      googleUser: GoogleUser | null;
      deleteUser: deleteUser;
      token: string;
      refetch: () => Promise<void>;
    }
  | undefined;

const AuthContext = createContext<Value>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);

  // @ts-ignore
  const token = googleUser?.accessToken;

  const deleteUser: deleteUser = async () => {
    if (!googleUser) {
      throw new Error("User not found");
    }

    await deleteUserDB(token, googleUser.uid);
    await deleteUserFirebase(googleUser);

    setUser(null);
    setGoogleUser(null);
  };

  const refetch = async () => {
    console.log("refetch");
    const newUser = await getUser(googleUser?.uid!);
    console.log("refetch success");
    setUser(newUser.data);
  };

  const signIn: signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("signIn");
    const newUser = await getUser(userCredential.user.uid);
    console.log("signIn success");
    setGoogleUser(userCredential.user);
    setUser(newUser.data);
    return userCredential;
  };

  const signOut: signOut = async () => {
    await signOutFirebase(auth);
  };

  const signUp: signUp = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUser({
      uid: userCredential.user.uid,
      name,
      email: userCredential.user.email!,
    });
    // TODO: after the user clicks on the verification link, we can send a notification to the app to trigger the sign in automatically
    await sendEmailVerification(userCredential.user);

    // Creating a new user account automatically signs them in,
    // but we don't want this behavior as the email is not yet verified.
    // Sign out the user immediately to prevent access before email verification
    // TODO: i think this is not necessary. we have "isVerified" in the user object which we can check. we should protect the route with that. also in the BE we have that so we can protect the DB.
    await signOut();

    return userCredential;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (googleUsr) => {
      if (loading) setLoading(false);

      if (!googleUsr) {
        setUser(null);
        setGoogleUser(null);
        return;
      }
      try {
        const newUser = await getUser(googleUsr.uid);
        setUser(newUser.data);
        setGoogleUser(googleUsr);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        user,
        googleUser,
        hasAccess: (googleUser?.emailVerified && !!user) ?? false,
        loading,
        deleteUser,
        token,
        refetch,
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
