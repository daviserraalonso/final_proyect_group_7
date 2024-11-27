export interface ICourse {
    id: number;
    name: string;
    category_id: number;
    modality_id: number;
    professor_id: number;
    createdAt: string;
    updatedAt: string;
    professor: {
      name: string;
      email: string;
    };
  }
  