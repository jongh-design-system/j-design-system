import { ErrorMap } from "../../common/error"
import { presetSchema } from "../../common/types"

const BASE_URL = "https://whdgur.shop"

export async function fetchPreset() {
  const response = await fetch(`${BASE_URL}/preset.json`)
  if (!response.ok) {
    throw ErrorMap({
      code: "failed_to_fetch",
      target: "preset.json",
      statusCode: response.status,
    })
  }
  const registry = await response.json()
  return presetSchema.parse(registry)
}
