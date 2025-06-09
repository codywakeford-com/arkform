import { createJiti } from "../../../node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "arkform": "/home/cody/git/monorepo/libs/arkform"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/home/cody/git/monorepo/libs/arkform/src/module.js")} */
const _module = await jiti.import("/home/cody/git/monorepo/libs/arkform/src/module.ts");

export default _module?.default ?? _module;