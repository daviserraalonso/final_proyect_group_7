export interface Task {
  tarea_id?: number;
  tarea_comentarios?: string;
  materia_nombre?: string;
  profesor_nombre?: string;
  submission?: string; // Nuevo campo para la respuesta
  status: string;
}