// maybe a set of refs that is typesafe by name?

function defineGlobals(globals: Record<string, any> = {}) {
    const map = new Map<string, any>(ref(Object.entries(globals)))

    function $app(name: string) {
        return {}
    }

    return { $app }
}

const { $app } = defineGlobals()
