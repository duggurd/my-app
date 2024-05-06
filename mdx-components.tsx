import type { MDXComponents } from 'mdx/types'
import { PropsWithChildren } from "react";
import Image, { ImageProps } from 'next/image'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }: PropsWithChildren) => (
      <h1 className='text-4xl font-bold'>{children}</h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
			<h2 className="text-zinc-50">{children}</h2>
		),
    ...components,
  }
}