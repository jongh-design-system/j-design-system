module.exports = function generator(plop) {
  plop.setGenerator("component", {
    description: "Create a new React component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/component/{{camelCase name}}/ui/index.tsx",
        templateFile: "templates/ui.tsx.hbs",
      },
    ],
  })
}
