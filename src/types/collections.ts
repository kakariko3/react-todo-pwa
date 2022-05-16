import { Timestamp } from 'firebase/firestore';

export type Todo = {
  id: string;
  content: string;
  createdAt: Timestamp;
  isComplete: boolean;
  uid: string;
};
