import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const projectId = process.env.NECT_PUBLIC_SANITY_ID
const dataset = process.env.NECT_PUBLIC_SANITY_DATASET

export default defineConfig({
  basePath: '/studio',
  name: 'Blogger_Content_studio',
  title: 'Blogger Next Dashboard',

  projectId,
   dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
