export interface ITaskDetails {
  id: number;
  userId: number;
  submission: any;
  createdAt: string;
  course: {
    id: number;
    name: string;
  };
}