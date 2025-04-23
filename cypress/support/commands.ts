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

Cypress.Commands.add("getInput", (name) => {
    return cy.get(`[data-ark-input="${name}"]`).should("be.visible")
})

Cypress.Commands.add("fillInput", (name, value) => {
    cy.get(`[data-ark-input="${name}"]`).should("be.visible").clear().type(value)
})

Cypress.Commands.add("submitForm", (name) => {
    cy.get(`[data-ark-submit="${name}"]`).click()
})

Cypress.Commands.add("checkError", (name, expectedText) => {
    cy.get(`[data-ark-errors="${name}"]`).should("contain.text", expectedText)
})

Cypress.Commands.add("resetForm", (formName) => {
    cy.get(`[data-ark-reset="${formName}"]`).should("be.visible").click()
})

Cypress.Commands.add("fillForm", (data) => {
    Object.entries(data).forEach(([name, value]) => {
        cy.fillInput(name, value)
    })
})

Cypress.Commands.add("checkErrors", (data) => {
    Object.entries(data).forEach(([name, error]) => {
        cy.checkError(name, error)
    })
})

Cypress.Commands.add("checkInputs", (data) => {
    Object.keys(data).forEach((name) => {
        cy.getInput(name).should("have.value", "")
    })
})

Cypress.Commands.add("checkModel", (data) => {
    Object.entries(data).forEach(([name, expected]) => {
        const thing = cy.get(`#${name}`)

        if (typeof expected === "string") {
            thing.contains(expected)
            return
        }

        const minifiedExpected = JSON.stringify(expected).replace(/\s+/g, "").toLowerCase()

        thing.invoke("text").then((text) => {
            const minifiedActual = text.replace(/\s+/g, "").toLowerCase() // strip all whitespace
            expect(minifiedActual).to.equal(minifiedExpected)
        })
    })
})
