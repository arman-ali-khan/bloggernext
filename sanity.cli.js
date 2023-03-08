import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.NECT_PUBLIC_SANITY_ID
const dataset = process.env.NECT_PUBLIC_SANITY_DATASET
export default defineCliConfig({
  api: {
    projectId,
    dataset
  }
})
