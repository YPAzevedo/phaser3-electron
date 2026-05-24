export {}

declare global {
  interface Window {
    app: {
      platform: NodeJS.Platform
      versions: NodeJS.ProcessVersions
    }
  }
}
