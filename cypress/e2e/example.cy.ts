describe("ark-form", () => {
    it("", () => {
        cy.visit("/test/ark-form")

        cy.get('[data-ark-input="email"]').should("be.visible")
        cy.get('[data-ark-input="email"]').type("hello@arkform.io")

        cy.get('[data-ark-submit="test-form"]').click()
        cy.get('[data-ark-errors="email"]').contains("Please a valid email")
    })

    it("should pass with no errors", () => {})

    it("v-model:id should represent the form state", () => {})

    it("v-model should represent the form state", () => {})

    it("v-model:valid should represent the form state", () => {})

    it("v-model:errors should represent the form state", () => {})

    it("v-model:names should represent the form state", () => {})

    it("v-model:validated should represent the form state", () => {})
})

// test inputs work
// test button work
// test output for form
// test output for input
// test output for group
//
