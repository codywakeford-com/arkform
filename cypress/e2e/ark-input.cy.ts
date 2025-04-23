import { Chance } from "chance"
const chance = new Chance()

const formName = "test-form"

describe("ark-input", () => {
    beforeEach(() => {
        cy.visit("/test/ark-input")
    })

    it("Should throw an incorrect email error.", () => {
        cy.fillInput("email", chance.first())

        cy.submitForm(formName)

        cy.checkErrors({
            email: "Please enter a valid email.",
        })
    })

    it("should pass with no errors", () => {
        cy.fillForm({
            email: chance.email(),
        })

        cy.submitForm(formName)

        cy.checkErrors({
            email: "",
        })
    })

    it("should fill, submitForm and reset the form", () => {
        cy.fillInput("email", chance.email())

        cy.submitForm(formName)
        cy.resetForm(formName)

        cy.checkInputs({
            email: "",
        })
    })

    it("v-model:id should be a valid input id", () => {
        cy.checkModel({
            id: "input",
        })

        cy.checkModel({
            id: "form",
        })
    })

    it("v-model should represent the form state", () => {
        cy.checkModel({
            model: null,
        })

        const email = chance.email()

        cy.fillInput("email", email)

        cy.checkModel({
            model: email,
        })

        cy.resetForm(formName)

        cy.checkModel({
            model: null,
        })
    })

    it("v-model:valid should represent the form state", () => {
        cy.checkModel({
            valid: null,
        })

        cy.submitForm(formName)

        cy.checkModel({
            valid: false,
        })

        cy.fillForm({
            email: chance.email(),
        })

        cy.submitForm(formName)
    })

    it("v-model:errors should represent the form state", () => {
        cy.checkModel({
            errors: [],
        })

        cy.submitForm(formName)

        cy.checkModel({
            errors: ["Please enter a valid email."],
        })

        cy.resetForm(formName)

        cy.checkModel({
            errors: [],
        })
    })

    it("v-model:validated should be null unless the entire form is valid", () => {
        cy.checkModel({
            validated: null,
        })

        cy.submitForm(formName)

        cy.checkModel({
            validated: null,
        })

        const email = chance.email()

        cy.fillInput("email", email)

        cy.submitForm(formName)

        cy.checkModel({
            validated: email,
        })
    })
})
