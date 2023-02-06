import { DomainError } from "@errors/DomainError";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";

import { CreateCourseUseCase } from "../CreateCourseUseCase";

let createCourseUseCase: CreateCourseUseCase;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;

describe("Create course", () => {
  beforeEach(() => {
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    createCourseUseCase = new CreateCourseUseCase(coursesRepositoryInMemory);
  });

  it("should be able to create a new course", async () => {
    const course = {
      name: "Course do Iago",
      category: "Música",
      address: "Av. Retiro",
      phone: "24998179466",
      email: "curso@email.com.br",
      description: "Novo curso!",
      link: "https://app.rocketseat.com.br/ignite",
      user_id: "123",
    };

    const res = await createCourseUseCase.execute(course);

    expect(res).toHaveProperty("id");
    expect(res.user_id).toEqual(course.user_id);
  });

  it("should not be able to create a course with data missing", async () => {
    const course = {
      name: "Course do Iago",
      category: "Música",
      address: "Av. Retiro",
      phone: "24998179466",
      email: "curso@email.com.br",
      description: "Novo curso!",
      link: "",
      user_id: "123",
    };

    await expect(createCourseUseCase.execute(course)).rejects.toEqual(
      new DomainError("Any data is missing!")
    );
  });
});
