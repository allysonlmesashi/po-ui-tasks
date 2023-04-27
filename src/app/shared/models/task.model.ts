export interface Task {
  id?: number | string;
  description: string;
  finished: boolean,
  dueDate?: Date
}
