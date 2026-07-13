import { afterEach, describe, expect, test, vi } from "vitest"

import { guideCommand } from "@/commands/guide"

const GUIDE = {
  name: "button",
  content: "# Button\n\nComponent authoring guidance.\n",
}

describe("guide command", () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  test("prints the requested component guide as Markdown", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify(GUIDE), {
          headers: { "content-type": "application/json" },
          status: 200,
        }),
      ),
    )
    vi.stubGlobal("fetch", fetchMock)

    const write = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true)

    await guideCommand.parseAsync(["node", "guide", "Button"])

    expect(fetchMock).toHaveBeenCalledWith(
      "https://jds-docs.vercel.app/guides/button.json",
    )
    expect(write).toHaveBeenCalledWith(GUIDE.content)
  })
})
