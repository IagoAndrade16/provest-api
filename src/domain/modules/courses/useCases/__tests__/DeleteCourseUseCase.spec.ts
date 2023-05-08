import { DomainError } from "@errors/DomainError";
import { Course } from "@modules/courses/entities/Course";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";

import { DeleteCourseUseCase } from "../DeleteCourseUseCase";

let coursesRepository: CoursesRepositoryInMemory;
let usecase: DeleteCourseUseCase;

beforeEach(() => {
  coursesRepository = new CoursesRepositoryInMemory();
  usecase = new DeleteCourseUseCase(coursesRepository);
});

it("should not be able to delete a course if course does not exists", async () => {
  jest.spyOn(coursesRepository, "findById").mockResolvedValueOnce(null);

  await expect(
    usecase.execute({
      user_id: "1",
      course_id: "1",
    })
  ).rejects.toEqual(new DomainError("COURSE_NOT_FOUND"));

  expect(coursesRepository.findById).toHaveBeenCalledWith("1");
});

it("should not be able to delete a course if user doens't have this course", async () => {
  jest.spyOn(coursesRepository, "findById").mockResolvedValueOnce({
    user_id: "2",
  } as Course);

  await expect(
    usecase.execute({
      user_id: "1",
      course_id: "1",
    })
  ).rejects.toEqual(new DomainError("UNAUTHORIZED_DELETE"));

  expect(coursesRepository.findById).toHaveBeenCalledWith("1");
});

it("should be able to delete a course", async () => {
  jest.spyOn(coursesRepository, "findById").mockResolvedValueOnce({
    id: "1",
    user_id: "1",
  } as Course);

  jest.spyOn(coursesRepository, "delete").mockResolvedValueOnce(null);

  await usecase.execute({
    course_id: "1",
    user_id: "1",
  });

  expect(coursesRepository.findById).toHaveBeenCalledWith("1");
  expect(coursesRepository.delete).toHaveBeenCalledTimes(1);
  expect(coursesRepository.delete).toHaveBeenCalledWith("1");
});
