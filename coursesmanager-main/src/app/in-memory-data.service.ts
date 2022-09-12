import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const courses = [
      { id: 11, name: 'Matematica' },
      { id: 12, name: 'Estruturas de Dados' },
      { id: 13, name: 'Programacao I' },
      { id: 14, name: 'Programacao II' },
      { id: 13, name: 'Jogos Digitais' },
      { id: 13, name: 'Redes' },
      { id: 13, name: 'Arquitectura de Computadores' }
    ];
    const criteria = [
      { id: 11, courseClassId: 11, name: "Teste Escrito"},
      { id: 12, courseClassId: 11, name: "Exercicios Aula"},
      { id: 13, courseClassId: 12, name: "Trabalho Pratico"},
      { id: 14, courseClassId: 12, name: "Defesa Trabalho"},
      { id: 15, courseClassId: 13, name: "Prova Oral"},
      { id: 16, courseClassId: 13, name: "Trabalho Pratico + Defesa"},
      { id: 17, courseClassId: 14, name: "Trabalho Investigacao"},
      { id: 18, courseClassId: 14, name: "Machine Learning Score"},
      { id: 19, courseClassId: 14, name: "Teste Moodle"}
    ]
    const courseClasses = [
      { id: 11, courseId: 11, name: "Matematica 2021"},
      { id: 12, courseId: 11, name: "Matematica 2022"},
      { id: 13, courseId: 12, name: "Estruturas de Dados 2021"},
      { id: 14, courseId: 12, name: "Estruturas de Dados 2022"},
      { id: 15, courseId: 13, name: "Programacao I 2021"},
      { id: 16, courseId: 13, name: "Programacao I 2022"},
      { id: 17, courseId: 14, name: "Programacao II 2021"},
      { id: 18, courseId: 14, name: "Programacao II 2022"}
    ]
    const students = [
      { id: 11, courseClassId: 11, name: "Helder Barbosa"},
      { id: 12, courseClassId: 11, name: "Maria Chaves"},
      { id: 13, courseClassId: 11, name: "Goncalo Lourenco"},

      { id: 14, courseClassId: 12, name: "Fatima Ferreira"},
      { id: 15, courseClassId: 12, name: "Flavio Silvia"},
      { id: 16, courseClassId: 12, name: "Joao Jordao"},

      { id: 14, courseClassId: 15, name: "Silvio Belem"},
      { id: 15, courseClassId: 15, name: "Teresa Maria"},
      { id: 16, courseClassId: 15, name: "Carina Lopes"},

      { id: 17, courseClassId: 14, name: "Vanessa Ferreira"},
      { id: 18, courseClassId: 14, name: "Ema Pereira"},
      { id: 19, courseClassId: 14, name: "Rodrigo Rodrigues"}
    ]

    const studentClassScores = [
      { id: 11, studentClassId: 11, criteriumId: 11, amount: 20},
      { id: 12, studentClassId: 11, criteriumId: 12, amount: 17},
      { id: 13, studentClassId: 12, criteriumId: 11, amount: 13},
      { id: 14, studentClassId: 12, criteriumId: 12, amount: 9},
      { id: 15, studentClassId: 13, criteriumId: 11, amount: 15},
    ]

    const classNotes = [
      { id: 11, courseClassId: 11, note: "Turma precisa de mais motivacao"},
      { id: 12, courseClassId: 11, note: "Não sabem aplicar a equação resolvente... Insitir com eles!"}
    ]

    return {courses, criteria, courseClasses, students, classNotes, studentClassScores};
  }

}
