import { Header } from "@/components/header"

export default function MainPage() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Tokens", href: "/tokens" },
    { label: "Guidelines", href: "/guidelines" },
  ]

  return (
    <>
      <Header logo={<span>Design System</span>} navItems={navItems} />
    </>
  )
}
