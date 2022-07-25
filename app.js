const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template.js");
const profileDataArgs = process.argv.slice(2);
const [name, github] = profileDataArgs;

// fs.writeFile("index.html", generatePage(name, github), (err) => {
//   if (err) throw err;
//   console.log("Portfolio complete! Check out index.html to see the output!");
// });

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("please enter your name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github Username",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("please enter your github");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for "about" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};
const promptProject = (portfolioData) => {
  console.log(`
  =================
  Add a New Project
  =================
  `);
  //why does the way it looks in the module work?
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  //why two return statements in this function?
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("please enter your project name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of your project (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("please enter your project description");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "link",
        message: "Enter the project github link",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("please enter link");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (check all that apply)",
        choices: [
          "JavaScript",
          "Html",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        //why two return statements in this function?
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};
promptUser()
  .then(promptProject)
  .then((portfolioData) => console.log(portfolioData));
