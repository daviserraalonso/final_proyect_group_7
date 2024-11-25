export interface Task {
    id?: number;
    subjectId: number;
    userId: number;
    comments?: string;
    punctuation?: number;
    creationDate: Date;
    deadline?: Date;
  }