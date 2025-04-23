import { Chance } from "chance"
const chance = new Chance()

const formName = "test-form"

describe("ark-form", () => {
    beforeEach(() => {
        cy.visit("/test/ark-form")
    })

    it("Should throw an incorrect email error.", () => {
        cy.fillForm({
            email: chance.first(),
            message: chance.first(),
            message2: chance.first(),
            message3: chance.first(),
        })

        cy.submitForm(formName)

        cy.checkErrors({
            email: "Please enter a valid email.",
            message: "",
            message2: "",
            message3: "",
        })
    })

    it("should pass with no errors", () => {
        cy.fillForm({
            email: chance.email(),
            message: chance.first(),
            message2: chance.first(),
            message3: chance.first(),
        })

        cy.submitForm(formName)

        cy.checkErrors({
            email: "",
            message: "",
            message2: "",
            message3: "",
        })
    })

    it("should fill, submitForm and reset the form", () => {
        cy.fillForm({
            email: chance.email(),
            message: chance.first(),
            message2: chance.first(),
            message3: chance.first(),
        })

        cy.submitForm(formName)
        cy.resetForm(formName)

        cy.checkInputs({
            email: "",
            message: "",
            message2: "",
            message3: "",
        })
    })

    it("v-model:id should represent the form state", () => {
        cy.checkModel({
            formId: "form:",
        })
    })

    it("v-model should represent the form state", () => {
        cy.checkModel({
            model: {
                email: null,
                message: null,
                message2: null,
                message3: null,
            },
        })

        const input = {
            email: chance.email(),
            message: chance.first({ length: 5 }),
            message2: chance.first({ length: 5 }),
            message3: chance.first({ length: 5 }),
        }

        cy.fillForm(input)
        cy.checkModel({
            model: input,
        })

        cy.resetForm(formName)

        cy.checkModel({
            model: {
                email: null,
                message: null,
                message2: null,
                message3: null,
            },
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
            message: chance.first(),
            message2: chance.first(),
            message3: chance.first(),
        })

        cy.submitForm(formName)
    })

    it("v-model:errors should represent the form state", () => {
        cy.checkModel({
            errors: [],
        })

        cy.submitForm(formName)

        cy.checkModel({
            errors: [
                "Please enter a valid email.",
                "This field is required.",
                "This field is required.",
                "This field is required.",
            ],
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

        const input = {
            email: chance.email(),
            message: chance.first(),
            message2: chance.first(),
            message3: chance.first(),
        }

        cy.fillForm(input)

        cy.submitForm(formName)

        cy.checkModel({
            validated: input,
        })
    })
})
