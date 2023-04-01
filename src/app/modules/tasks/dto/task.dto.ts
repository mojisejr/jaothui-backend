export interface CreateNewTaskDTO {
  userId: number;
  questId: number;
  pointEarned: number;
  completed: boolean;
}

export interface UpdateTaskDTO {
  pointEarned: number;
  completedDate: Date;
  completed: boolean;
}
