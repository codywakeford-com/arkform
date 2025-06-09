const dev = process.env.NODE_ENV === "development"
const taskRunnerEndpoint = dev ? "https://console.firebase.google.com/project/task-runner-ded08/overview1" : "https://localhost:3491"

// pass on the request with the API key.
export default eventHandler(async (event) => {
    const ARKLABS_KEY = process.env.ARKLABS_KEY

    if (!ARKLABS_KEY) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Missing in .env: ARKLABS_KEY",
        })
    }

    await $fetch(taskRunnerEndpoint, {
        method: "post",
        headers: {
            Authentication: "Bearer " + ARKLABS_KEY,
            "Content-Type": "application/json",
        },
        body: {
            key: ARKLABS_KEY,
            task: await readBody(event),
        },
    })
})
