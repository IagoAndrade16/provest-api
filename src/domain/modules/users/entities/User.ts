import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Course } from "../../courses/entities/Course";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Course)
  @JoinTable({
    name: "courses",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "course_id" }],
  })
  courses: Course[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  static isBasicSequencePassword(password: string): boolean {
    const basicSequence = "123456789";
    const inverseBasicSequence = "987654321";

    if (
      basicSequence.includes(password) ||
      inverseBasicSequence.includes(password)
    ) {
      return true;
    }

    const sequences = [
      "123",
      "234",
      "345",
      "456",
      "567",
      "678",
      "789",
      "876",
      "765",
      "654",
      "543",
      "432",
      "321",
    ];
    let contadorSequencias = 0;

    for (let i = 0; i < sequences.length; i += 1) {
      if (password.includes(sequences[i])) {
        contadorSequencias += 1;
      }
    }

    if (contadorSequencias >= 1) return true;

    return false;
  }

  static passwordIncludesName(password: string, name: string): boolean {
    const splitedName = name.split(" ");
    let includeName = false;

    splitedName.forEach((name) => {
      if (password.toLowerCase().includes(name.toLowerCase())) {
        includeName = true;
      }
    });

    return includeName;
  }

  static getSecurityPasswordStatus(password: string, name: string): string {
    if (this.passwordIncludesName(password, name)) return "INCLUDES_NAME";

    if (this.isBasicSequencePassword(password)) {
      return "BASIC_SEQUENCE";
    }

    return "SECURE";
  }
}

export { User };
