import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Todo } from '../../types/collections';
import { db } from '../firebase';

// 指定したユーザーIDに対応するToDoリストを取得
export const getTodos = async (uid: string) => {
  // クエリの作成
  const q = query(collection(db, 'todo'), where('uid', '==', uid), orderBy('createdAt', 'desc'));
  // todoのドキュメントを全件取得
  const querySnapshot = await getDocs(q);
  // 取得したtodoから配列を作成
  const todos: Todo[] = [];
  querySnapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      content: doc.data().content,
      createdAt: doc.data().createdAt,
      isComplete: doc.data().isComplete,
      uid: doc.data().uid,
    });
  });
  return todos;
};

// ToDoの追加
export const addTodo = async (content: string, uid: string) => {
  await addDoc(collection(db, 'todo'), {
    content,
    uid,
    isComplete: false,
    createdAt: serverTimestamp(),
  });
};

// ToDoの削除
export const deleteTodo = async (id: string) => {
  await deleteDoc(doc(db, 'todo', id));
};

// 完了フラグの切り替え
export const toggleComplete = async (id: string) => {
  const todoRef = doc(db, 'todo', id);
  const todoSnap = await getDoc(todoRef);
  await updateDoc(todoRef, {
    isComplete: !todoSnap.data()!.isComplete,
    updatedAt: serverTimestamp(),
  });
};
