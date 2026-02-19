import type { ReactNode } from "react"

import { propsTableRecipe } from "./recipe"

export interface PropRowProps {
  name: string
  type: string
  description: string
  defaultValue?: string
  required?: boolean
}

interface PropsTableProps {
  children?: ReactNode
  data?: PropRowProps[]
}

export function PropsTable({ children, data }: PropsTableProps) {
  const styles = propsTableRecipe()

  return (
    <div className={styles.container()}>
      <table className={styles.table()}>
        <thead className={styles.thead()}>
          <tr className={styles.tr()}>
            <th className={styles.th()}>Prop</th>
            <th className={styles.th()}>Type</th>
            <th className={styles.th()}>Description</th>
          </tr>
        </thead>
        <tbody className={styles.tbody()}>
          {data
            ? data.map((prop) => (
                <PropRowInternal key={prop.name} {...prop} styles={styles} />
              ))
            : children}
        </tbody>
      </table>
    </div>
  )
}

interface PropRowInternalProps extends PropRowProps {
  styles: ReturnType<typeof propsTableRecipe>
}

function PropRowInternal({
  name,
  type,
  description,
  defaultValue,
  required,
  styles,
}: PropRowInternalProps) {
  return (
    <tr className={styles.tr()}>
      <td className={styles.td()}>
        <code className={styles.code()}>
          {name}
          {required && <span style={{ color: "red" }}>*</span>}
        </code>
        {defaultValue && (
          <div style={{ marginTop: "4px", fontSize: "0.75rem", opacity: 0.7 }}>
            Default: <code className={styles.code()}>{defaultValue}</code>
          </div>
        )}
      </td>
      <td className={styles.td()}>
        <code className={styles.code()}>{type}</code>
      </td>
      <td className={styles.td()}>{description}</td>
    </tr>
  )
}

export function PropRow({
  name,
  type,
  description,
  defaultValue,
  required,
}: PropRowProps) {
  const styles = propsTableRecipe()
  return (
    <tr className={styles.tr()}>
      <td className={styles.td()}>
        <code className={styles.code()}>
          {name}
          {required && <span style={{ color: "red" }}>*</span>}
        </code>
        {defaultValue && (
          <div style={{ marginTop: "4px", fontSize: "0.75rem", opacity: 0.7 }}>
            Default: <code className={styles.code()}>{defaultValue}</code>
          </div>
        )}
      </td>
      <td className={styles.td()}>
        <code className={styles.code()}>{type}</code>
      </td>
      <td className={styles.td()}>{description}</td>
    </tr>
  )
}
