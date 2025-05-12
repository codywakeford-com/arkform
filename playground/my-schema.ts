const schema = {
    users: {
        $doc: {
            name: "string",
            id: "number",
        },
        $collections: {
            names: {
                $doc: {
                    name: "string",
                },
            },
        },
    },
} satisfies FirestoreSchemaBase

export default schema
export type MySchema = {
    users: {
        $doc: {
            name: string
            id: number
        }
        $collections: {
            names: {
                $doc: {
                    name: string
                }
            }
        }
    }
}
