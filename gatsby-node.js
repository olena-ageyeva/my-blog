const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
           filter: { frontmatter: { date: { ne: null } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges

    posts.forEach((post, index) => {
      // For DESC order: previous = newer post (index - 1), next = older post (index + 1)
      const next = index === 0 ? null : posts[index - 1].node
      const previous = index === posts.length - 1 ? null : posts[index + 1].node

      createPage({
        path: `blog${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // Calculate reading time based on lines
    const content = node.rawBody || '';
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const timeToRead = Math.max(1, Math.ceil(lines.length / 10));

    createNodeField({
      name: `timeToRead`,
      node,
      value: timeToRead,
    })
  }
}
