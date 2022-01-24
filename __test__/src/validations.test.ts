import {
  validateEmail,
  validatePasswordSize,
} from "../../src/components/screens/LoginScreen";

import { organizeItems } from "../../src/components/screens/ListUsersScreen";

const fetch = require("node-fetch");

describe("Validacion para el filtro de usuarios", () => {
  let users = [
    {
      id: 7,
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    },
    {
      id: 7,
      email: "Byron.lawson@reqres.in",
      first_name: "Byron",
      last_name: "Fields",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    },
  ];
  test("Verifica la union entre el nombre y apellido de cada usuario", () => {
    expect(organizeItems(users)[0].name).toEqual("Byron Fields");
  });

  test("Verifica la estructura de organizada alfabeticamente del arreglo", () => {
    expect(organizeItems(users)).toEqual([
      {
        email: "Byron.lawson@reqres.in",
        name: "Byron Fields",
        profilePicture: "https://reqres.in/img/faces/7-image.jpg",
      },
      {
        email: "michael.lawson@reqres.in",
        name: "Michael Lawson",
        profilePicture: "https://reqres.in/img/faces/7-image.jpg",
      },
    ]);
  });

  test("Verificar que si llega null retorne array vacio", () => {
    expect(organizeItems(null)).toEqual([]);
  });

  test("Verificar que si llega undefined retorne array vacio", () => {
    expect(organizeItems(undefined)).toEqual([]);
  });

  test("Verificar que si llega un valor diferente a un arreglo retorne un arreglo vacio", () => {
    expect(organizeItems("hola123")).toEqual([]);
  });
});

describe("Validacion para Email", () => {
  test("Verifica que el correo electronico tenga un arroba", () => {
    expect(validateEmail("hernan.guioc@gmail.com")).toEqual(true);
  });

  test("Si el correo no tiene arroba arroja falso ", () => {
    expect(validateEmail("hernan.guiocgmail.com")).toEqual(false);
  });

  test("Si el espacio del correo esta vacio debe arrojar falso", () => {
    expect(validateEmail("")).toEqual(false);
  });
});

describe("Validacion longitud de contraseña", () => {
  test("Verifica que la contraseña sea lo suficientemente larga", () => {
    expect(validatePasswordSize("holamundo")).toEqual(true);
  });

  test("Si la contraseña es pequeña arroja falso", () => {
    expect(validatePasswordSize("123")).toEqual(false);
  });

  test("Si el espacio de la contraseña esta vacio debe arrojar falso", () => {
    expect(validatePasswordSize("")).toEqual(false);
  });
});
