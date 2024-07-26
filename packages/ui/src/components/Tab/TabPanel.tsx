import { useTabContext } from "./Tab"

interface TabPanelProps {}
export const TabPanel = (TabPanelProps) => {
  const { selected } = useTabContext("tab")
  return <div></div>
}
