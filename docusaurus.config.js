const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "gnark",
  tagline: "Fast, expressive zk-SNARKs in Go",
  url: "https://docs.gnark.consensys.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/gnark-logo-assets/svgs/black-symbol.svg",
  trailingSlash: false,

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Consensys-Incorporated", // Usually your GitHub org/user name.
  projectName: "doc.gnark", // Usually your repo name.
  deploymentBranch: "gh-pages", // Github Pages deploying branch

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          breadcrumbs: true,
          sidebarPath: require.resolve("./sidebars.js"),
          // Set a base path separate from default /docs
          editUrl: "https://github.com/Consensys-Incorporated/doc.gnark/tree/main/",
          routeBasePath: "/",
          path: "docs",
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          includeCurrentVersion: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: "NSRFPEJ4NC",

        // Public API key: it is safe to commit it
        apiKey: "cea41b975ad6c9a01408dfda6e0061d3",

        indexName: "gnark",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        // ... other Algolia params
      },
      // announcementBar: {
      //   id: "announcement_bar",
      //   content: "⛔️ This documentation site is still under construction! 🚧",
      //   backgroundColor: "#fafbfc",
      //   textColor: "#091E42",
      //   isCloseable: false,
      // },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: "img/gnark-logo-assets/jpgs/black-social-banner@2x@2x.jpg",
      metadata: [
        {
          name: "description",
          content:
            "Documentation for gnark, a fast and expressive zk-SNARK library written in Go.",
        },
        { name: "theme-color", content: "#121212" },
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        // title: "gnark",
        logo: {
          alt: "gnark documentation",
          src: "img/gnark-logo-assets/svgs/black-logomark.svg",
          srcDark: "img/gnark-logo-assets/svgs/white-logomark.svg",
          width: 104,
          height: 32,
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docSidebar",
            docId: "overview",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://play.gnark.io",
            label: "Playground",
            position: "left",
          },
          {
            href: "https://github.com/Consensys-Incorporated/gnark",
            className: "header-github-link",
            position: "right",
            "aria-label": "gnark on GitHub",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Learn",
            items: [
              {
                label: "How to",
                to: "/category/how-to",
              },
              {
                label: "Concepts",
                to: "/category/concepts",
              },
              {
                label: "Tutorials",
                to: "/category/tutorials",
              },
              {
                label: "Reference",
                to: "/Reference/api",
              },
            ],
          },
          {
            title: "Build",
            items: [
              {
                label: "Playground",
                href: "https://play.gnark.io",
              },
              {
                label: "Go package",
                href: "https://pkg.go.dev/github.com/Consensys-Incorporated/gnark",
              },
            ],
          },
          {
            title: "Project",
            items: [
              {
                label: "gnark on GitHub",
                href: "https://github.com/Consensys-Incorporated/gnark",
              },
              {
                label: "Improve these docs",
                href: "https://github.com/Consensys-Incorporated/doc.gnark",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Consensys Software Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
      ],
    }),
  plugins: [
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-P4FDDG8",
      },
    ],
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-GWMGBWJX08",
        anonymizeIP: true,
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  themes: [],
};

module.exports = async function createConfig() {
  const remarkMath = (await import("remark-math")).default;
  const rehypeKatex = (await import("rehype-katex")).default;

  config.presets[0][1].docs.remarkPlugins = [remarkMath];
  config.presets[0][1].docs.rehypePlugins = [rehypeKatex];

  return config;
};
