export type QueueTask = {
    request: {
        url: string
        headers?: Record<string, string>
        params?: Record<string, string | number | boolean>
        body?: any
        method: "get" | "post" | "put" | "delete" | "patch" | "head" | "options"
    }
    performAt: number // unix ms
    status: "pending" | "completed" | "failed"
}

/**Manage cloud tasks. Specify an endpoint that will be hit at the scheduled time +/- 5 minutes.*/
export const $tasks = {
    /**Create a cloud task. */
    create: async (task: QueueTask) => {
        const endpoint = "/api/_arkfire/tasks/create"

        try {
            await $fetch(endpoint, {
                method: "post",
                body: { task },
            })
        } catch (error) {
            console.log(error)
        }
    },

    /**Update a cloud task. */
    update: async (id: string, data: Partial<QueueTask>) => {
        const endpoint = "/api/_arkfire/tasks/update"

        await $fetch(endpoint, {
            method: "post",
            body: { id, data },
        })
    },

    /**Read a cloud task object. */
    read: async (id: string) => {
        const endpoint = "/api/_arkfire/tasks/create"

        await $fetch(endpoint, {
            method: "post",
            body: { id },
        })
    },

    /**Delete a cloud task. */
    delete: async (id: string) => {
        const endpoint = "/api/_arkfire/tasks/delete"

        await $fetch(endpoint, {
            method: "post",
            body: { id },
        })
    },
}

// Example usage
if (false) {
    $tasks.create({
        request: {
            url: "https://google.com",
            method: "post",
            body: {},
        },
        performAt: Date.now() + 600_000, // 10 mins
        status: "pending",
    })
}
