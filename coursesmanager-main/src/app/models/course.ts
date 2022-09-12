export interface Course { //Nome das Cadeiras
  id: number;
  name: string;
}

export interface CourseClass { //Nome/data-semestre ou turma da cadeira
  id: number;
  courseId: number;
  name: string;
}

export interface Criterium { //Critérios de Avaliação, Testes/Exercicios/Trabalhos práticos etc...
  id: number;
  courseClassId: number;
  name: string;
}

export interface Student { //Informações dos estudantes
  id: number;
  courseClassId: number;
  name: string;
}

export interface Score { //Notas dos estudantes
  id: number;
  studentClassId: number;
  criteriumId: number;
  amount: string;
}

export interface Note { //Informações/notas/lembretes apontados pelo professor
  id: number;
  courseClassId: number;
  note: string;
}
