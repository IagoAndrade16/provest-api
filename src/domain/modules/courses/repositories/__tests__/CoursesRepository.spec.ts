import { AppDataSource } from "@infra/database";
import { Course } from "@modules/courses/entities/Course";
import { v4 as uuid } from "uuid";

import { ICoursesRepository } from "../ICoursesRepository";
import { CoursesRepository } from "../implementations/CoursesRepository";

let coursesRepo: ICoursesRepository;

beforeAll(async () => {
  coursesRepo = new CoursesRepository();
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
});

const deleteCourseById = async (id: string) => {
  await AppDataSource.getRepository(Course).delete({ id });
};

describe("create", () => {
  it("should be able to insert a new course", async () => {
    const createdCourse = await coursesRepo.create({
      address: "address",
      category: "category",
      description: "description",
      name: "name",
      email: "email",
      link: "link",
      phone: "phone",
      user_id: uuid(),
    });

    expect(createdCourse).toHaveProperty("id");

    const course = await coursesRepo.findById(createdCourse.id);

    expect(course).toEqual(createdCourse);

    await deleteCourseById(course.id);
  });
});

describe("findByUserId", () => {
  it("should not return course if user does not have courses", async () => {
    const courses = await coursesRepo.findByUserId(uuid());

    expect(courses).toEqual([]);
  });
  it("should return course by user id", async () => {
    const createdCourse = await coursesRepo.create({
      address: "address",
      category: "category",
      description: "description",
      name: "name",
      email: "email",
      link: "link",
      phone: "phone",
      user_id: uuid(),
    });

    const courses = await coursesRepo.findByUserId(createdCourse.user_id);

    expect(courses).toHaveLength(1);
    expect(courses[0].user_id).toEqual(createdCourse.user_id);

    await deleteCourseById(createdCourse.id);
  });
});

describe("listAllCourses", () => {
  it("should return empty array of courses", async () => {
    const courses = await coursesRepo.listAllCourses();

    expect(courses).toHaveLength(0);
    expect(courses).toEqual([]);
  });
  it("should return courses", async () => {
    const createdCourse = await coursesRepo.create({
      address: "address",
      category: "category",
      description: "description",
      name: "name",
      email: "email",
      link: "link",
      phone: "phone",
      user_id: uuid(),
    });

    const courses = await coursesRepo.listAllCourses();

    expect(courses).toHaveLength(1);

    await deleteCourseById(createdCourse.id);
  });
});

describe("update", () => {
  it("should be able to update course", async () => {
    const createdCourse = await coursesRepo.create({
      address: "address",
      category: "category",
      description: "description",
      name: "name",
      email: "email",
      link: "link",
      phone: "phone",
      user_id: uuid(),
    });

    await coursesRepo.update({ email: "email2" }, createdCourse.id);

    const course = await coursesRepo.findById(createdCourse.id);

    expect(course.email).toEqual("email2");

    await deleteCourseById(createdCourse.id);
  });
});

describe("findById", () => {
  it("should be able find course by id", async () => {
    const createdCourse = await coursesRepo.create({
      address: "address",
      category: "category",
      description: "description",
      name: "name",
      email: "email",
      link: "link",
      phone: "phone",
      user_id: uuid(),
    });

    const course = await coursesRepo.findById(createdCourse.id);

    expect(course).toEqual(createdCourse);

    await deleteCourseById(course.id);
  });
});

describe("delete", () => {
  it("should be able to delete course", async () => {
    const createdCourse = await coursesRepo.create({
      address: "address",
      category: "category",
      description: "description",
      name: "name",
      email: "email",
      link: "link",
      phone: "phone",
      user_id: uuid(),
    });

    await coursesRepo.delete(createdCourse.id);

    const course = await coursesRepo.findById(createdCourse.id);

    expect(course).toBeNull();
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
