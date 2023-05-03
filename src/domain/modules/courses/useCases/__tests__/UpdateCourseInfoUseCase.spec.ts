import { DomainError } from "@errors/DomainError";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";

import { CreateCourseUseCase } from "../CreateCourseUseCase";
import { UpdateCourseInfoUseCase } from "../UpdateCourseInfoUseCase";

let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let createCourseUseCase: CreateCourseUseCase;
let updateCourseInfoUseCase: UpdateCourseInfoUseCase;

describe("Alter course", () => {
  beforeEach(() => {
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    createCourseUseCase = new CreateCourseUseCase(coursesRepositoryInMemory);
    updateCourseInfoUseCase = new UpdateCourseInfoUseCase(
      coursesRepositoryInMemory
    );
  });

  it("should be able to alter course", async () => {
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

    const res = await updateCourseInfoUseCase.execute(
      {
        name: "Course alterado",
      },
      course.id,
      "123"
    );

    expect(res).toHaveProperty("message");
    expect(res).toHaveProperty("status");
  });

  it("should not be able to alter course does not exists", async () => {
    await expect(
      updateCourseInfoUseCase.execute(
        {
          name: "Course alterado",
        },
        "123",
        "123"
      )
    ).rejects.toEqual(new DomainError("Course not found."));
  });

  it("should not be able to alter course does not exists", async () => {
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
      updateCourseInfoUseCase.execute(
        {
          name: "Course alterado",
        },
        course.id,
        "321"
      )
    ).rejects.toEqual(
      new DomainError("This user does not update this course!")
    );
  });

  it("should not be able to alter course does not exists", async () => {
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
      updateCourseInfoUseCase.execute({}, course.id, "123")
    ).rejects.toEqual(new DomainError("At least one parameter is required."));
  });

  it("should not be able to alter course does not exists", async () => {
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
      updateCourseInfoUseCase.execute(
        {
          name: "",
        },
        course.id,
        "123"
      )
    ).rejects.toEqual(new DomainError("Property name cannot be null."));
  });
});
