import { UserModel } from "./User"

test("can be created", () => {
  const instance = UserModel.create({})
  expect(instance).toBeTruthy()
})

test("can set infos", () => {
  const instance = UserModel.create({});
  instance.setName("aaaaa");
  instance.setEmail("email@email.com");

  expect(instance.name).toBe("aaaaa");
  expect(instance.email).toBe("email@email.com");
})

test("can be set as logged in",() => {
  const instance = UserModel.create({});
  expect(instance.isLoggedIn).toBe(false);
  instance.setIsLoggedIn(true);
  expect(instance.isLoggedIn).toBe(true);
})
