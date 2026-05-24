import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('app', {
  platform: process.platform,
  versions: process.versions,
})
