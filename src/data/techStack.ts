export interface TechStackItem {
  name: string;
  icon: string;
  category: "language" | "framework" | "tool";
}

export const TECH_STACK: readonly TechStackItem[] = [
  // Sprachen
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    category: "language",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
    category: "language",
  },
  {
    name: "Scala",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg",
    category: "language",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    category: "language",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    category: "language",
  },

  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    category: "language",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    category: "language",
  },

  // Frameworks/Libraries
    {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    category: "framework",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    category: "framework",
  },
  {
    name: "Streamlit",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg",
    category: "framework",
  },
  {
    name: "LangChain",
    icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/langchain-ipuhh4qo1jz5ssl4x0g2a.png/langchain-dp1uxj2zn3752pntqnpfu2.png?_a=DATAiZAAZAA0",
    category: "framework",
  },
  {
    name: "LangGraph",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMDAwMDAwIiBzdHlsZT0ib3BhY2l0eToxOyI+PHBhdGggIGQ9Ik02LjA5OSA1Ljg4SDE3LjljMy4zNjQgMCA2LjEgMi43NDUgNi4xIDYuMTJzLTIuNzM2IDYuMTItNi4wOTkgNi4xMkg2LjFDMi43MzYgMTguMTIgMCAxNS4zNzUgMCAxMnMyLjczNi02LjEyIDYuMDk5LTYuMTJtNS40MTkgOS40ODdjLjE0OC4xNTYuMzY3LjE0OC41NjEuMTA4aC4wMDJjLjA5LS4wNzMtLjAzOC0uMTY2LS4xNi0uMjU0Yy0uMDc0LS4wNTQtLjE0NS0uMTA1LS4xNjYtLjE1Yy4wNjgtLjA4My0uMTMyLS4yNy0uMjg5LS40MTdhMiAyIDAgMCAxLS4xNS0uMTUxYy0uMTEtLjEyLS4xNTUtLjI3My0uMi0uNDI3YTEuNiAxLjYgMCAwIDAtLjExLS4yOTdjLS4zMDQtLjcwOC0uNjUzLTEuNDEtMS4xNDMtMi4wMWMtLjMxNS0uMzk4LS42NzQtLjc1NS0xLjAzMy0xLjExMmMtLjIzMi0uMjMtLjQ2My0uNDYtLjY4My0uNzAxYy0uMjI2LS4yMzQtLjM2Mi0uNTIxLS40OTktLjgxYy0uMTE0LS4yNC0uMjI4LS40ODItLjM5Ni0uNjkzYy0uNTA3LS43NS0yLjEwNy0uOTU1LTIuMzQyLjEwNWMwIC4wMzMtLjAxLjA1NC0uMDM5LjA3NWExLjYgMS42IDAgMCAwLS4zNDIuMzM0Yy0uMjM4LjMzMi0uMjc0Ljg5NS4wMjIgMS4xOTNsLjAwMS0uMDJjLjAxLS4xNS4wMi0uMjkuMTM5LS4zOTljLjIyOC4xOTguNTc2LjI2OC44NDEuMTJjLjMyLjQ2LjQyMiAxLjAxNS41MjUgMS41NzJjLjA4NS40NjQuMTcuOTMuMzgyIDEuMzQxbC4wMTQuMDIyYy4xMjQuMjA4LjI1LjQxOS40MS42Yy4wNTkuMDkuMTc4LjE4Ny4yOTcuMjg0Yy4xNTcuMTI4LjMxNC4yNTYuMzI5LjM2NnYuMTQ2Yy0uMDAxLjI5LS4wMDIuNTkuMTg0LjgzYy4xMDMuMjA4LS4xNS40MTgtLjM1Mi4zOTJhMSAxIDAgMCAxLS4zNTQtLjA0M2MtLjE2NS0uMDQtLjMyOS0uMDgtLjQ2Mi0uMDAzYy0uMDM4LjA0LS4wOTEuMDQyLS4xNDUuMDQzYy0uMDY0LjAwMi0uMTI5LjAwNC0uMTY3LjA3YS4zLjMgMCAwIDEtLjA0NS4wNjZjLS4wNDIuMDUxLS4wODcuMTA3LS4wMzMuMTQ5bC4wMTUtLjAxMWMuMDgyLS4wNjMuMTYtLjEyMy4yNy0uMDg1Yy0uMDE0LjA4Mi4wMzkuMTAzLjA5Mi4xMjVsLjAyNy4wMTJhLjQuNCAwIDAgMS0uMDA4LjA1N2MtLjAwOS4wNDYtLjAxNy4wOS4wMTguMTNsLjA0Ni0uMDU2Yy4wMzctLjA0Ni4wNzMtLjA5NC4xMzktLjExYy4xNDQuMTkyLjI4OS4xMTIuNDcxLjAxMmMuMjA2LS4xMTQuNDU5LS4yNTMuODEtLjA1NmMtLjEzNS0uMDA3LS4yNTUuMDEtLjM0NS4xMjFjLS4wMjMuMDI1LS4wNDIuMDU0LS4wMDIuMDg3Yy4yMDctLjEzNS4yOTQtLjA4Ni4zNzUtLjA0Yy4wNi4wMzIuMTE1LjA2My4yMTIuMDI0bC4wNy0uMDM3Yy4xNTUtLjA4NC4zMTQtLjE3LjQ5OS0uMTRjLS4xMzkuMDQtLjE4OC4xMjctLjI0Mi4yMjNhMSAxIDAgMCAxLS4wOTQuMTQzYy0uMDIxLjAyMS0uMDMuMDQ2LS4wMDcuMDgyYy4yOS0uMDI0LjQtLjA5OC41NDgtLjE5N2MuMDctLjA0Ny4xNS0uMS4yNjEtLjE1N2MuMTI0LS4wNzYuMjQ4LS4wMjguMzY4LjAyYy4xMy4wNS4yNTUuMS4zNzEtLjAxM2MuMDM3LS4wMzUuMDgzLS4wMzUuMTI5LS4wMzZsLjA1LS4wMDJjLS4wMzctLjE5NC0uMjQtLjE5MS0uNDQ4LS4xODljLS4yNC4wMDMtLjQ4My4wMDUtLjQ3NS0uMjk1Yy4yMjItLjE1Mi4yMjQtLjQxNS4yMjYtLjY2NXEtLjAwMS0uMDkuMDA1LS4xNzZjLjE2My4wOTIuMzM2LjE2My41MDguMjM0Yy4xNjIuMDY2LjMyMy4xMzMuNDc0LjIxNWMuMTU3LjI1NC40MDQuNTkuNzMyLjU2OGwuMDI2LS4wNzRsLjA1OS4wMTRjLjA4Ni4wMjEuMTc4LjA0NS4yMjMtLjA1N202LjQyOS0yLjg4NmExLjAxNCAxLjAxNCAwIDAgMCAxLjcyOS0uNzE1YTEuMDEgMS4wMSAwIDAgMC0xLjAxMy0xLjAxYTEgMSAwIDAgMC0uMzY0LjA2OGwtLjU4LS44NDhsLS40MDUuMjc4bC41ODMuODUxYTEuMDEgMS4wMSAwIDAgMCAuMDUgMS4zNzZtLTEuODE4LTIuNzQ0YTEuMDE0IDEuMDE0IDAgMCAwIDEuNDItLjYxNWExLjAwOCAxLjAwOCAwIDAgMC0uODQ1LTEuMjkzYTEuMDE1IDEuMDE1IDAgMCAwLTEuMDk1LjcxMmExLjAxIDEuMDEgMCAwIDAgLjUyIDEuMTk2bTAgNS44NjdhMS4wMTUgMS4wMTUgMCAwIDAgMS40Mi0uNjE1YTEuMDA4IDEuMDA4IDAgMCAwLS44NDUtMS4yOTNhMS4wMTUgMS4wMTUgMCAwIDAtMS4wOTUuNzEyYTEuMDEgMS4wMSAwIDAgMCAuNTIgMS4xOTZtLjkzMi0zLjU4NnYtLjUwM2gtMS41NWExIDEgMCAwIDAtLjIxOC0uNDEybC41ODMtLjg2NGwtLjQyNC0uMjhsLS41ODMuODYzYTEgMSAwIDAgMC0uMzMzLS4wNmMtLjI2OCAwLS41MjUuMTA2LS43MTQuMjk0YTEuMDAyIDEuMDAyIDAgMCAwIDEuMDQ3IDEuNjU1bC41ODMuODY0bC40Mi0uMjgxbC0uNTc5LS44NjRjLjEwNC0uMTE5LjE3OC0uMjYuMjE3LS40MTJ6Ii8+PC9zdmc+",
    category: "framework",
  },
  {
    name: "ChromaDB",
    icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/chroma-erzavigj9yrwcd5lup0swm.png/chroma-1xw4nxhjo4c64ndhrqtxp.png?_a=DATAiZAAZAA0",
    category: "framework",
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    category: "framework",
  },
  {
    name: "Flask",
    icon: "https://skillicons.dev/icons?i=flask",
    category: "framework",
  },
  {
    name: "SQLAlchemy",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original-wordmark.svg",
    category: "framework",
  },
  {
    name: "Apache Spark",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
    category: "framework",
  },


  // Developer Tools
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    category: "tool",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
    category: "tool",
  },
];

export function getTechIcon(name: string): string | undefined {
  return TECH_STACK.find((t) => t.name === name)?.icon;
}