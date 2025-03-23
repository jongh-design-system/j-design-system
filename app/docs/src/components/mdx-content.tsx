/* eslint-disable @typescript-eslint/no-explicit-any */
import * as runtime from "react/jsx-runtime"

import { useMDXComponents } from "@/mdx-components"

import { Button } from "./button"
import { CodeBlock } from "./codeBlock"
import { CommandCodeBlock } from "./commandCodeBlock"

const sharedComponents = {
  // Add your global components here
  Button,
  CommandCodeBlock,
  ...useMDXComponents,
  pre: (props: any) => <CodeBlock {...props} />,
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} />
}
