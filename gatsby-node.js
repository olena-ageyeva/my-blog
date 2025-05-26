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
                visibility
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
    const adminPosts = result.data.allMdx.edges
    const posts = adminPosts.filter(p => p.node.frontmatter.visibility !== "draft").sort((a, b) => new Date(b.node.frontmatter.date));

    // Helper: create a map of slug -> index
    const createSlugIndexMap = (postList) =>
      Object.fromEntries(postList.map((p, i) => [p.node.fields.slug, i]));

    const publicPosts = posts.filter(p => p.node.frontmatter.visibility === "public").sort((a, b) => new Date(b.node.frontmatter.date));


    const publicIndexMap = createSlugIndexMap(publicPosts);
    const adminIndexMap = createSlugIndexMap(adminPosts);

    posts.forEach((post, index) => {
      // For DESC order: previous = newer post (index - 1), next = older post (index + 1)
      const next = index === 0 ? null : posts[index - 1].node
      const previous = index === posts.length - 1 ? null : posts[index + 1].node

      const slug = post.node.fields.slug;

      // Public neighbors (only if this post is public)
      const isPublic = post.node.frontmatter.visibility === "public";
      let prevPublic = null;
      let nextPublic = null;

      if (isPublic) {
        const publicIndex = publicIndexMap[slug];
        prevPublic = publicIndex === publicPosts.length - 1 ? null : publicPosts[publicIndex + 1].node;
        nextPublic = publicIndex === 0 ? null : publicPosts[publicIndex - 1].node;
      }

      // Admin neighbors
      const adminIndex = adminIndexMap[slug];
      const prevAdmin =
        adminIndex !== undefined && adminIndex < adminPosts.length - 1
          ? adminPosts[adminIndex + 1].node
          : null;
      const nextAdmin =
        adminIndex !== undefined && adminIndex > 0
          ? adminPosts[adminIndex - 1].node
          : null;


      createPage({
        path: `blog${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
          prevPublic,
          nextPublic,
          prevAdmin,
          nextAdmin,
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter!
    }

    type MdxFrontmatter {
      title: String
      date: Date @dateformat
      description: String
      visibility: String
    }
  `);
};
