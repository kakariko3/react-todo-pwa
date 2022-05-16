import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Box, Button, styled, TextField } from '@mui/material';

import { signInWithGoogle } from '../services/firebase';
import { useAuthContext } from '../hooks/useAuthContext';
import { addTodo, getTodos } from '../services/api/todo';
import { Todo } from '../types/collections';
import { TodoList } from './TodoList';

export const Dashboard = () => {
  const { currentUser } = useAuthContext();
  const [inputName, setInputName] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // Firestoreから非同期でToDoを取得し、stateに値をセット
  const asyncGetTodos = useCallback(async () => {
    if (currentUser) {
      const data = await getTodos(currentUser.uid);
      setTodos(data);
    } else {
      setTodos([]);
    }
  }, [currentUser]);

  // 追加ボタンを押下したときの処理
  const handleAddBtn = () => {
    addTodo(inputName, currentUser!.uid);
    setInputName('');
    asyncGetTodos();
  };

  useEffect(() => {
    asyncGetTodos();
  }, [asyncGetTodos]);

  const SForm = styled('form')({
    width: '100%',
    maxWidth: 360,
    margin: 'auto',
    marginBottom: 40,
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
  });

  return (
    <Box
      sx={{
        paddingTop: 5,
        textAlign: 'center',
        justifyContent: 'space-between',
      }}
    >
      {
        // ログインしている場合はToDoの入力フォームを表示
        currentUser ? (
          <SForm>
            <TextField
              type="text"
              defaultValue={inputName}
              placeholder="ToDo"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => setInputName(evt.target.value)}
              variant="standard"
              sx={{ marginRight: 2 }}
            />
            <Button
              type="button"
              onClick={() => handleAddBtn()}
              variant="contained"
              color="primary"
              size="small"
              disabled={!(inputName.length > 0)}
            >
              追加
            </Button>
          </SForm>
        ) : (
          <button onClick={signInWithGoogle}>ログイン</button>
        )
      }
      <TodoList todos={todos} asyncGetTodos={asyncGetTodos} />
    </Box>
  );
};
