export interface CreateTaskDTO {
  userId: number;
  questId: number;
  pointEared: number;
}

export interface UpdateTaskDTO {
  pointEared: number;
  completedDate: Date;
}
