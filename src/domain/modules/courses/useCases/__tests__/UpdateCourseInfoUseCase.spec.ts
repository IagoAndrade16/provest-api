import { DomainError } from "@errors/DomainError";
import { Course } from "@modules/courses/entities/Course";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";

import { UpdateCourseInfoUseCase } from "../UpdateCourseInfoUseCase";

let coursesRepository: CoursesRepositoryInMemory;
let usecase: UpdateCourseInfoUseCase;

beforeEach(() => {
  coursesRepository = new CoursesRepositoryInMemory();
  usecase = new UpdateCourseInfoUseCase(coursesRepository);
});

it("should throw COURSE_NOT_FOUND if course does not exists", async () => {
  jest.spyOn(coursesRepository, "findById").mockResolvedValueOnce(null);

  await expect(
    usecase.execute(
      {
        name: "Course alterado",
      },
      "123",
      "123"
    )
  ).rejects.toEqual(new DomainError("COURSE_NOT_FOUND"));
  expect(coursesRepository.findById).toHaveBeenCalledWith("123");
});

it("should thorw UNAUTHORIZED_UPDATE if userId !== course.userId", async () => {
  jest.spyOn(coursesRepository, "findById").mockResolvedValueOnce({
    user_id: "456",
  } as Course);

  await expect(
    usecase.execute(
      {
        name: "Course alterado",
      },
      "123",
      "321"
    )
  ).rejects.toEqual(new DomainError("UNAUTHORIZED_UPDATE"));

  expect(coursesRepository.findById).toHaveBeenCalledWith("123");
});

it("should be able to update course", async () => {
  jest.spyOn(coursesRepository, "findById").mockResolvedValueOnce({
    id: "1",
    user_id: "1",
  } as Course);
  jest.spyOn(coursesRepository, "update").mockResolvedValueOnce(null);

  await usecase.execute(
    {
      email: "course@email.com",
    },
    "1",
    "1"
  );

  expect(coursesRepository.findById).toHaveBeenCalledWith("1");
  expect(coursesRepository.update).toHaveBeenCalledWith(
    {
      email: "course@email.com",
    },
    "1"
  );
  expect(coursesRepository.update).toHaveBeenCalledTimes(1);
});
