import mitt from "mitt"
const emitter = mitt()

// Todo - make typesafe
// eventually, during dev, send details about each event to a backend to save to a txt for tracking.

type Events = {
    "arkform:ready": void
}

/**Global runtime event bus. */
export const $bus = {
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit,
    all: emitter.all,
}
