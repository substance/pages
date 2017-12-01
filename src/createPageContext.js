export default function createPageContext({pageUrl, siteContext}) {
  const pageContext = Object.create({
    getLabel(name) {
      return siteContext.getLabel(name)
    },
    getRelativeUrl(res) {
      return siteContext.getRelativeUrl(pageUrl, res)
    },
    get url() {
      return pageUrl
    }
  })
  return pageContext
}
