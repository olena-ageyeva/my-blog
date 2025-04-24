
module.exports = {
  siteMetadata: {
    // edit below
    title: `Simple Code Blog`,
    author: `Olena Ageyeva`,
    description: `A starter personal blog with styled components, dark mode, and Netlify CMS.`,
    siteUrl: `https://olena-ageyeva.netlify.com/`,
    social: {
      twitter: `Olena91250581`,
      website: `https://olena-ageyeva.com/`,
      mathwell: `https://www.linkedin.com/company/mathwell/`,
      cto: "https://www.linkedin.com/posts/activity-7275698198474620928-rokI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAm5xMQBBacbbstPN14e6mDAMyRSp-nzHeA",
      mentor: "https://www.linkedin.com/posts/activity-7245898937335779329-kwQF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAm5xMQBBacbbstPN14e6mDAMyRSp-nzHeA",
      linkedIn: "https://www.linkedin.com/in/olenaageyeva/"
    },
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "blog",
        engine: "flexsearch",
        engineOptions: {
          encode: "icase",
          tokenize: "forward",
          async: false,
        },
        query: `
          {
            allMdx {
              nodes {
                id
                fields { slug }
                excerpt
                rawBody
                frontmatter {
                  title
                  description
                  date(formatString: "MMMM DD, YYYY")
                }
              }
            }
          }
        `,
        ref: "id",
        index: ["title", "rawBody"],
        store: ["id", "slug", "date", "title", "excerpt", "description", "timeToRead"],
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            slug: node.fields.slug,
            rawBody: node.rawBody,
            excerpt: node.excerpt,
            title: node.frontmatter.title,
            description: node.frontmatter.description,
            date: node.frontmatter.date,
            timeToRead: node.fields.timeToRead,
          })),
      },
    },
    `gatsby-plugin-feed-mdx`,
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
        plugins: [`gatsby-remark-images`],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // edit below
        trackingId: `UA-177364284-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // edit below
        icon: `content/assets/olena-circle.jpg`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [`gatsby-remark-images`],
        plugins: [`gatsby-remark-images`],
      },
    },
  ],
}
