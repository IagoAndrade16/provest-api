import { Course } from "@modules/courses/entities/Course";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";

import { CreateCourseUseCase } from "../CreateCourseUseCase";

let createCourseUseCase: CreateCourseUseCase;
let coursesRepository: CoursesRepositoryInMemory;

beforeEach(() => {
  coursesRepository = new CoursesRepositoryInMemory();
  createCourseUseCase = new CreateCourseUseCase(coursesRepository);
});

const mockedCourse = {
  name: "Course do Iago",
  category: "Música",
  address: "Av. Retiro",
  phone: "24998179466",
  email: "curso@email.com.br",
  description: "Novo curso!",
  link: "https://app.rocketseat.com.br/ignite",
  user_id: "123",
};

it("should be able to create a new course", async () => {
  jest
    .spyOn(coursesRepository, "create")
    .mockResolvedValue(mockedCourse as Course);

  const res = await createCourseUseCase.execute(mockedCourse);

  expect(res.user_id).toEqual(mockedCourse.user_id);
  expect(coursesRepository.create).toHaveBeenCalledWith(mockedCourse);
});
