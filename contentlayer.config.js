import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from "rehype-pretty-code";

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `./projects/**/*.mdx`,
  contentType: 'mdx',
  
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string' },
    repo: { type: 'string' },
    published: { type: "boolean", default: false }
  },

  computedFields: {
    url: { type: 'string', resolve: (project) => `/${project._raw.flattenedPath}` },
  },
}))

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "./blog/**/*.mdx",
  contentType: "mdx",

  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: 'string' },
    published: { type: "boolean", default: false }
  },

  computedFields: {
    url: { type: 'string', resolve: (blog) => `/${blog._raw.flattenedPath}` },
  },
}))


export default makeSource({ 
  contentDirPath: './content', 
  documentTypes: [Project, Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypePrettyCode, {
        theme: 'github-dark',
        onVisitLine(node) {
          if (node.children.length === 0 ){
            node.children = [{ type: "text", value: " "}];
          }
        },
        onVisitHighlightedLine(node) {
          node.properties.className.push("line--highlighted");
        },
        onVisitHighlightedWord(node) {
          node.properties.className = ["word--highlighted"];
        },
      }
    ]
  }
})