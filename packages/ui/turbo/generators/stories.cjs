module.exports = function generator(plop) {
  plop.setGenerator("stories", {
    description: "create new storybook template",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the new file to create?",
        validate: (input) => {
          console.log(input)
          return true
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/stories/{{camelCase name}}.stories.tsx",
        templateFile: "templates/stories.tsx.hbs",
      },
    ],
  })
}
