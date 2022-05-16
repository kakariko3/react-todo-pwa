import { createContext, ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '../services/firebase';

type Props = {
  children: ReactNode;
};

export type AuthContextType = {
  currentUser: User | null;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // ログインユーザーの情報が変わったタイミングで実行 (サインイン、サインアウトを監視) (サインアウトの場合はnull)
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
