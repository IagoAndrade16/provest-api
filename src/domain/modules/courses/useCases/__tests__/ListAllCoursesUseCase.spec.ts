import { Course } from "@modules/courses/entities/Course";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";

import { ListAllCoursesUseCase } from "../ListAllCoursesUseCase";

let usecase: ListAllCoursesUseCase;
let coursesRepository: CoursesRepositoryInMemory;

beforeEach(() => {
  coursesRepository = new CoursesRepositoryInMemory();
  usecase = new ListAllCoursesUseCase(coursesRepository);
});

it("should be able list all courses", async () => {
  jest.spyOn(coursesRepository, "listAllCourses").mockResolvedValueOnce([
    {
      id: "2",
    },
  ] as Course[]);

  const res = await usecase.execute();

  expect(res).toHaveLength(1);
  expect(res[0]).toHaveProperty("id");
  expect(coursesRepository.listAllCourses).toHaveBeenCalledWith();
});
