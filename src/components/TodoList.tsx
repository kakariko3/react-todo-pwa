import { Box, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { deleteTodo, toggleComplete } from '../services/api/todo';
import { Todo } from '../types/collections';

type Props = {
  todos: Todo[];
  asyncGetTodos: () => void;
};

export const TodoList = ({ todos, asyncGetTodos }: Props) => {
  // 削除ボタンを押下したときの処理
  const handleDelete = (id: string) => {
    deleteTodo(id);
    asyncGetTodos();
  };

  // チェックボックスを押下したときの処理
  const handleCheckBox = async (id: string) => {
    await toggleComplete(id);
    asyncGetTodos();
  };

  return (
    <Box sx={{ maxWidth: 360, margin: 'auto' }}>
      <h2>あなたのToDo</h2>
      <Box component="ul" sx={{ paddingLeft: 0, listStyle: 'none' }}>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                checked={todo.isComplete}
                onChange={() => handleCheckBox(todo.id)}
                color="secondary"
              />
            </ListItemIcon>
            <ListItemText primary={todo.content} />
          </ListItem>
        ))}
      </Box>
    </Box>
  );
};
