import { PlopTypes } from "@turbo/gen"

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("example", {
    description:
      "An example Turborepo generator - creates a new file at the root of the project",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the new file to create?",
        validate: (input: string) => {
          console.log(input)
          return true
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/stories/{{pascalCase name}}.stories.tsx",
        templateFile: "templates/stories.tsx.hbs",
      },
    ],
  })
}
