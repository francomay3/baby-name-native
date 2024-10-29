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
  // TODO: add this functionality
  // sendPasswordResetEmail,
} from "firebase/auth";
import Loader from "@/components/Loader";
import { getUser, updateProfile, User } from "@/database";
import { faker } from "@faker-js/faker/locale/en_US";

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

type Value =
  | {
      user: User | null;
      signUp: signUp;
      signIn: signIn;
      signOut: signOut;
      hasAccess: boolean;
      loading: boolean;
      googleUser: GoogleUser | null;
    }
  | undefined;

const AuthContext = createContext<Value>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn: signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  };

  const signOut: signOut = async () => {
    await signOutFirebase(auth);
  };

  // TODO: add name to the sign up maybe?
  const signUp: signUp = async (_name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile({
      uid: userCredential.user.uid,
      name: faker.person.fullName(),
      subtitle: faker.person.bio(),
      avatar: faker.image.avatar(),
    });

    await sendEmailVerification(userCredential.user);

    // TODO: here we need to update the user in our database as well. that includes the name

    // Creating a new user account automatically signs them in,
    // but we don't want this behavior as the email is not yet verified.
    // Sign out the user immediately to prevent access before email verification
    await signOut();

    return userCredential;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (googleUsr) => {
      const newUser = await getUser(googleUsr?.uid || "");
      setUser(newUser);
      setGoogleUser(googleUsr);
      if (loading) setLoading(false);
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
        hasAccess: googleUser?.emailVerified ?? false,
        loading,
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
