/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("fillArkInput", (name, value) => {
    cy.get(`[data-ark-input="${name}"]`).should("be.visible").clear().type(value)
})

Cypress.Commands.add("clickArkSubmit", (name) => {
    cy.get(`[data-ark-submit="${name}"]`).click()
})

Cypress.Commands.add("checkArkError", (name, expectedText) => {
    cy.get(`[data-ark-errors="${name}"]`).should("contain.text", expectedText)
})
