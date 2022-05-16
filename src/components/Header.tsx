import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { logout, signInWithGoogle } from '../services/firebase';
import { useAuthContext } from '../hooks/useAuthContext';

export const Header = () => {
  const { currentUser } = useAuthContext();

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">ReactToDo</Typography>
        {
          // ログイン状況に応じてを表示を切り替え
          currentUser ? (
            <Button onClick={logout} sx={{ color: '#fff' }}>
              ログアウト
            </Button>
          ) : (
            <Button onClick={signInWithGoogle} sx={{ color: '#fff' }}>
              ログイン
            </Button>
          )
        }
      </Toolbar>
    </AppBar>
  );
};
