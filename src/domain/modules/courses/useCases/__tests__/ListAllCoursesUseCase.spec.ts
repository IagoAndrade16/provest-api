import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";

import { CreateCourseUseCase } from "../../CreateCourseUseCase";
import { ListAllCoursesUseCase } from "../../ListAllCoursesUseCase";

let listAllCoursesUseCase: ListAllCoursesUseCase;
let createCourseUseCase: CreateCourseUseCase;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;

describe("List all courses", () => {
  beforeEach(() => {
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    listAllCoursesUseCase = new ListAllCoursesUseCase(
      coursesRepositoryInMemory
    );
    createCourseUseCase = new CreateCourseUseCase(coursesRepositoryInMemory);
  });

  it("should be able list all courses", async () => {
    await createCourseUseCase.execute({
      name: "Course do Iago",
      category: "Programação TS",
      address: "Av. Retiro",
      phone: "24998179466",
      email: "curso@email.com.br",
      description: "Novo curso!",
      link: "https://app.rocketseat.com.br/ignite",
      user_id: "123",
    });

    const res = await listAllCoursesUseCase.execute();

    expect(res).toHaveLength(1);
    expect(res[0]).toHaveProperty("id");
  });
});
