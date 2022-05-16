import { useContext } from 'react';

import { AuthContext, AuthContextType } from '../providers/AuthProvider';

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
