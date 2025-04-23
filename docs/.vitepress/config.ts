import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Arkform",
    description: "A VitePress Site",
    themeConfig: {
        nav: [{ text: "Home", link: "/" }],

        sidebar: [
            {
                text: "Getting Started",
                items: [
                    { text: "Introduction", link: "/overview" },
                    { text: "First Form", link: "/first-form" },
                    { text: "Installation", link: "/installation" },
                ],
            },
            {
                text: "Concepts",
                items: [{ text: "Validation", link: "/concepts/validation" }],
            },
            {
                text: "$arkform",
                link: "/$arkform",
                items: [
                    { text: "Introduction", link: "/$arkform" },
                    { text: "useInput()", link: "/$arkform/useInput" },
                    { text: "useForm()", link: "/$arkform/useForm" },
                    { text: "useGroup()", link: "/$arkform/useGroup" },
                ],
            },
            {
                text: "Components",

                items: [
                    {
                        text: "ark-form",
                        collapsed: true,
                        link: "/components/ark-form/",
                        items: [
                            { text: "overview", link: "/components/ark-form" },
                            { text: "state", link: "/components/ark-form/state" },
                            { text: "props", link: "/components/ark-form/props" },
                        ],
                    },
                    {
                        text: "ark-input",
                        collapsed: true,
                        link: "/components/ark-input/",
                        items: [
                            { text: "overview", link: "/components/ark-input" },
                            { text: "props", link: "/components/ark-input/props" },
                            { text: "descendents", link: "/components/ark-input/descendents" },
                            { text: "wrappers", link: "/components/ark-input/wrappers" },
                            { text: "state", link: "/components/ark-input/state" },
                            { text: "box-model", link: "/components/ark-input/box-model" },
                        ],
                    },
                    {
                        text: "ark-group",
                        collapsed: true,
                        link: "/components/ark-group/",
                        items: [
                            { text: "UI Elements", link: "/components/ark-group/ui" },
                            { text: "state", link: "/components/ark-input/state" },
                        ],
                    },
                    { text: "ark-errors", link: "/components/ark-errors" },
                    { text: "ark-items", link: "/components/ark-items" },
                ],
            },
            {
                text: "Customization",
                items: [
                    { text: "Options", link: "customization/options" },
                    { text: "Error Messages", link: "customization/error-messages" },
                    { text: "Theme", link: "customization/theme" },
                ],
            },
            {
                text: "Examples",
                items: [
                    { text: "Register Form", link: "/examples/register-form" },
                    { text: "Register Form", link: "/examples/register-form" },
                    { text: "Register Form", link: "/examples/register-form" },
                ],
            },
        ],

        socialLinks: [{ icon: "github", link: "" }],
    },
})
