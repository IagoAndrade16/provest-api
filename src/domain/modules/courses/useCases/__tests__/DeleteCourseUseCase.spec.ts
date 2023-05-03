import { DomainError } from "@errors/DomainError";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";

import { CreateCourseUseCase } from "../CreateCourseUseCase";
import { DeleteCourseUseCase } from "../DeleteCourseUseCase";

let coursesRepository: CoursesRepositoryInMemory;
let deleteCourseUseCase: DeleteCourseUseCase;
let createCourseUseCase: CreateCourseUseCase;

describe("Delete course", () => {
  beforeEach(() => {
    coursesRepository = new CoursesRepositoryInMemory();
    deleteCourseUseCase = new DeleteCourseUseCase(coursesRepository);
    createCourseUseCase = new CreateCourseUseCase(coursesRepository);
  });

  it("should be able to delete a course", async () => {
    const course = await createCourseUseCase.execute({
      name: "Course do Iago",
      category: "Programação TS",
      address: "Av. Retiro",
      phone: "24998179466",
      email: "curso@email.com.br",
      description: "Novo curso!",
      link: "https://app.rocketseat.com.br/ignite",
      user_id: "123",
    });

    const deleted = await deleteCourseUseCase.execute({
      user_id: course.user_id,
      course_id: course.id,
    });

    expect(deleted).toEqual({
      status: "SUCCESS",
      message: "Course deleted successfully",
    });
  });

  it("should not be able to delete a course if course does not exists", async () => {
    await expect(
      deleteCourseUseCase.execute({
        user_id: "123",
        course_id: "123",
      })
    ).rejects.toEqual(new DomainError("Course not found"));
  });

  it("should not be able to delete a course if user doens't have this course", async () => {
    const course = await createCourseUseCase.execute({
      name: "Course do Iago",
      category: "Programação TS",
      address: "Av. Retiro",
      phone: "24998179466",
      email: "curso@email.com.br",
      description: "Novo curso!",
      link: "https://app.rocketseat.com.br/ignite",
      user_id: "123",
    });

    await expect(
      deleteCourseUseCase.execute({
        user_id: "321",
        course_id: course.id,
      })
    ).rejects.toEqual(
      new DomainError("This course does not be delete for this user!")
    );
  });
});
