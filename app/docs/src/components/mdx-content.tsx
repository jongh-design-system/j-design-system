import * as runtime from "react/jsx-runtime"

import { MDXComponents } from "@/mdx-components"

import * as Avatar from "./avatar"
import { Button } from "./button"
import { CommandCodeBlock } from "./commandCodeBlock"
import * as Dialog from "./dialog"
import { PropRow, PropsTable } from "./propsTable"
import * as Select from "./select"
import * as Tabs from "./tabs"
import { TextField } from "./textfield"

const sharedComponents = {
  Button,
  TextField,
  Tabs,
  Avatar,
  Select,
  Dialog,
  CommandCodeBlock,
  PropsTable,
  PropRow,
  ...MDXComponents(),
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
  // The compiled MDX entrypoint is produced dynamically from the serialized code.

  const Component = useMDXComponent(code)

  return <Component components={{ ...sharedComponents, ...components }} />
}
