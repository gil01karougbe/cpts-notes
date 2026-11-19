import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/gil01karougbe/cpts-notes",
      "HTB Academy": "https://academy.hackthebox.com/",
      "Built with Quartz": "https://quartz.jzhao.xyz",
    },
  }),
}

// Explorer: hide the attachments folder, and pin g-procedures (playbooks)
// to the very top so it's always one click away. Everything else stays
// in the natural a → f learning order.
const cptsExplorer = Component.Explorer({
  filterFn: (node) => node.name !== "tags" && node.name !== "attachments",
  sortFn: (a, b) => {
    const pin = (n: { displayName: string; file: unknown }) =>
      n.displayName.toLowerCase().startsWith("g-procedures") ? 0 : 1
    const pa = pin(a)
    const pb = pin(b)
    if (pa !== pb) return pa - pb
    // folders before files, then alphabetical (Quartz default behaviour)
    if ((!a.file && !b.file) || (a.file && b.file)) {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }
    return a.file && !b.file ? 1 : -1
  },
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    cptsExplorer,
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    cptsExplorer,
  ],
  right: [],
}
