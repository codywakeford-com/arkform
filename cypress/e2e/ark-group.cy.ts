import { Chance } from "chance"
const chance = new Chance()

const formName = "test-form"

describe("ark-group", () => {
    beforeEach(() => {
        cy.visit("/test/ark-group")
    })

    // it("Should throw an incorrect email error.", () => {
    //     cy.fillInput("email", chance.first())

    //     cy.submitForm(formName)

    //     cy.checkErrors({
    //         email: "Please enter a valid email.",
    //     })
    // })

    // it("should pass with no errors", () => {
    //     cy.fillForm({
    //         email: chance.email(),
    //     })

    //     cy.submitForm(formName)

    //     cy.checkErrors({
    //         email: "",
    //     })
    // })

    // it("should fill, submitForm and reset the form", () => {
    //     cy.fillInput("email", chance.email())

    //     cy.submitForm(formName)
    //     cy.resetForm(formName)

    //     cy.checkInputs({
    //         email: "",
    //     })
    // })

    // it("v-model:id should be a valid group id", () => {
    //     cy.checkModel({
    //         id: "form",
    //     })

    //     cy.checkModel({
    //         id: "group",
    //     })
    // })

    // it("v-model should represent the group state", () => {
    //     cy.checkModel({
    //         model: {
    //             email: null,
    //             message: null,
    //             message2: null,
    //             message3: null,
    //         },
    //     })

    //     const input = {
    //         email: chance.email(),
    //         message: chance.first(),
    //         message2: chance.first(),
    //         message3: chance.first(),
    //     }

    //     cy.fillForm(input)
    //     cy.checkModel({
    //         model: input,
    //     })

    //     cy.resetForm(formName)

    //     cy.checkModel({
    //         model: {
    //             email: null,
    //             message: null,
    //             message2: null,
    //             message3: null,
    //         },
    //     })
    // })

    // it("v-model:valid should represent the form state", () => {
    //     cy.checkModel({
    //         valid: null,
    //     })

    //     cy.submitForm(formName)

    //     cy.checkModel({
    //         valid: false,
    //     })

    //     cy.fillForm({
    //         email: chance.email(),
    //         message: chance.first(),
    //         message2: chance.first(),
    //         message3: chance.first(),
    //     })

    //     cy.submitForm(formName)

    //     cy.checkModel({
    //         valid: true,
    //     })
    // })

    // it("v-model:errors should represent the form state", () => {
    //     cy.checkModel({
    //         errors: [],
    //     })

    //     cy.submitForm(formName)

    //     cy.checkModel({
    //         errors: [
    //             "Please enter a valid email.",
    //             "This field is required.",
    //             "This field is required.",
    //             "This field is required.",
    //         ],
    //     })

    //     cy.resetForm(formName)

    //     cy.checkModel({
    //         errors: [],
    //     })
    // })

    // it("v-model:validated should be null unless the entire group is valid", () => {
    //     cy.checkModel({
    //         validated: null,
    //     })

    //     cy.submitForm(formName)

    //     cy.checkModel({
    //         validated: null,
    //     })

    //     const input = {
    //         email: chance.email(),
    //         message: chance.first(),
    //         message2: chance.first(),
    //         message3: chance.first(),
    //     }

    //     cy.fillForm(input)

    //     cy.submitForm(formName)

    //     cy.checkModel({
    //         validated: input,
    //     })
    // })

    // it("should add an items from the group value and clear inputs", () => {
    //     cy.checkModel({
    //         items: [],
    //     })

    //     const input = {
    //         email: chance.email(),
    //         message: chance.first(),
    //         message2: chance.first(),
    //         message3: chance.first(),
    //     }

    //     cy.fillForm(input)

    //     cy.get("#add-items-button").click()

    //     cy.checkModel({
    //         items: [input],
    //     })

    //     cy.checkInputs({
    //         email: "",
    //         message: "",
    //         message2: "",
    //         message3: "",
    //     })
    // })

    it("should only add an item if the group is valid", () => {
        cy.checkModel({
            items: [],
            errors: [],
        })

        cy.get("#add-items-button").click()

        cy.checkModel({
            errors: [
                "Please enter a valid email.",
                "This field is required.",
                "This field is required.",
                "This field is required.",
            ],
        })

        const input = {
            email: chance.email(),
            message: chance.first(),
            message2: chance.first(),
            message3: chance.first(),
        }

        cy.fillForm(input)

        cy.get("#add-items-button").click()

        cy.checkModel({
            items: [input],
            errors: [],
        })
    })
})
