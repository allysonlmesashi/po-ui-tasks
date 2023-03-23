export interface Task {
  id?: number | string;
  description: number | string;
  finished: boolean,
  dueDate?: Date
}
