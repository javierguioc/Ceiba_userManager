/* global cy */

describe("Aplicacion para Ceiba", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Se puede visitar la pagina ", () => {
    cy.contains("Inicia sesión");
  });

  describe("Pruebas al registro", () => {
    beforeEach(() => {
      cy.contains("Regístrate").click();
      cy.contains("Nuevo Registro");
    });

    it("Creacion de un nuevo usuario", () => {
      cy.contains("Nuevo Registro").click();
      cy.get("[placeholder='Correo']").type("eve.holt@reqres.in");
      cy.get("[placeholder='Contraseña']").type("pistol");
      cy.contains("Registrarme").click();
      cy.contains("Bienvenido").click();
    });
  });

  it("Si el correo ni contraseña es valido los estilos del boton indican que no se puede oprimir", () => {
    cy.get("[placeholder='Correo']").type("email_sin_arroba");
    cy.get("[placeholder='Contraseña']").type("123");
    cy.get("#login-button").should(
      "have.css",
      "background-color",
      "rgba(219, 181, 181, 0.424)"
    );
    cy.get("[placeholder='Correo']").type("@ex.com");
    cy.get("[placeholder='Contraseña']").type("123456");
    cy.get("#login-button").should(
      "have.css",
      "background-color",
      "rgba(255, 255, 255, 0.3)"
    );
  });

  it("Un usuario puede iniciar sesion", () => {
    cy.get("[placeholder='Correo']").type("eve.holt@reqres.in");
    cy.get("[placeholder='Contraseña']").type("cityslicka");
    cy.get("#login-button").click();
    cy.contains("Lista de Usuarios");
  });

  describe("Cuando el usuario este logeado", () => {
    beforeEach(() => {
      cy.get("[placeholder='Correo']").type("eve.holt@reqres.in");
      cy.get("[placeholder='Contraseña']").type("cityslicka");
      cy.get("#login-button").click();
      cy.contains("Lista de Usuarios");
    });

    it("Creacion de un nuevo usuario", () => {
      cy.contains("Crear usuarios").click();
      cy.get("[placeholder='Nombre']").type("Tom");
      cy.get("[placeholder='Trabajo']").type("Desarrollador React");
      cy.get("#create_user_button").click();
    });

    it("Se puede cerrar sesion", () => {
      cy.contains("Salir").click();
      cy.contains("Has cerrado sesión");
      cy.contains("Inicia sesión");
    });
  });
});
