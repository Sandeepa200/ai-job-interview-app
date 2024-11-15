const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "You are an AI interview coach.  Job Position: Full Stack Developer, Job Description: React, Nodejs MySql, Years of Experience: 6, Question Difficulty: Basic, Depending on this information please give me 7 Interview questions with Answers in JSON Format. Give Questions and Answers as fields in JSON"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n[\n  {\n    \"question\": \"Explain the difference between a `const`, `let`, and `var` variable declaration in JavaScript.\",\n    \"answer\": \"In JavaScript, `var` variables are function-scoped, meaning their scope is limited to the function in which they are declared. `let` and `const` variables are block-scoped, meaning their scope is limited to the block of code (usually within curly braces `{}`) in which they are declared. The key difference between `let` and `const` is that `let` variables can be reassigned, while `const` variables cannot be reassigned after their initial declaration. For example:\\n\\n```javascript\\n// Function scope\\nfunction example() {\\n  var a = 10;\\n  let b = 20;\\n  const c = 30;\\n  a = 15; // valid\\n  b = 25; // valid\\n  c = 35; // invalid: TypeError: Assignment to constant variable.\\n}\\n```\"\n  },\n  {\n    \"question\": \"What is the purpose of `npm` in a Node.js project?\",\n    \"answer\": \"`npm` stands for Node Package Manager. It is a command-line tool used for installing, managing, and publishing Node.js packages. It's a crucial part of the Node.js ecosystem as it allows developers to use and share reusable code modules, making development faster and more efficient.\"\n  },\n  {\n    \"question\": \"Describe the concept of HTTP methods and provide examples of their use.\",\n    \"answer\": \"HTTP methods are verbs used in web requests to indicate the intended action to be performed on a resource. Some common methods include:\\n\\n* **GET:** Retrieves data from a resource.\\n* **POST:** Sends data to a server to create a new resource.\\n* **PUT:** Updates an existing resource on the server.\\n* **DELETE:** Deletes a resource from the server.\\n* **PATCH:** Partially updates an existing resource.\\n\\n**Example:**\\n* **GET:** `GET /api/users` (Retrieves a list of users)\\n* **POST:** `POST /api/users` (Creates a new user)\\n* **PUT:** `PUT /api/users/1` (Updates the user with ID 1)\\n* **DELETE:** `DELETE /api/users/1` (Deletes the user with ID 1)\\n* **PATCH:** `PATCH /api/users/1` (Partially updates the user with ID 1, e.g., changes only the username).\"\n  },\n  {\n    \"question\": \"What is a React component and what are its key advantages?\",\n    \"answer\": \"A React component is a reusable building block of a user interface. It can be a simple button, a complex form, or even an entire page. React components are functions or classes that return JSX (JavaScript XML), which is a syntax extension that allows you to write HTML-like structures within JavaScript. \\n\\nKey advantages of React components:\\n\\n* **Reusability:** Components can be reused across different parts of your application, reducing code duplication and improving maintainability.\\n* **Composability:** Components can be nested within each other, creating complex UIs from simpler building blocks.\\n* **State Management:** Components can manage their own internal state, allowing for dynamic and interactive behavior.\"\n  },\n  {\n    \"question\": \"Explain the difference between `props` and `state` in React.\",\n    \"answer\": \"Both `props` and `state` are important concepts in React for managing data within components. \\n\\n* **Props (Properties):** Props are used to pass data from a parent component to a child component. They are immutable, meaning they cannot be changed by the child component.\\n* **State:** State is a private data structure that is managed by the component itself. It is used to store and update data that affects the component's rendering. Changes to the state will trigger a re-render of the component.\\n\\nEssentially, props are like inputs to a component, while state represents the component's internal data and behavior.\"\n  },\n  {\n    \"question\": \"Describe a typical workflow you follow when building a React application, from initial setup to deployment.\",\n    \"answer\": \"A typical workflow for building a React application could involve the following steps:\\n\\n1. **Project Setup:** Create a new React project using Create React App (`npx create-react-app my-app`).\\n2. **Component Development:** Break down the UI into reusable components, each with its own logic and state.\\n3. **Data Fetching and API Integration:** Use `fetch` or other methods to interact with backend APIs to retrieve and manipulate data.\\n4. **Styling:** Apply CSS, SCSS, or other styling solutions to create a visually appealing interface.\\n5. **Routing:** Implement navigation between different components and pages using a routing library like React Router.\\n6. **Testing:** Write unit tests and integration tests to ensure code quality and functionality.\\n7. **Deployment:** Deploy the application to a hosting service like Netlify, Vercel, or AWS.\"\n  },\n  {\n    \"question\": \"What are some common SQL queries used for database management in a web application?\",\n    \"answer\": \"Some common SQL queries used in web applications include:\\n\\n* **SELECT:** Retrieves data from a database table.\\n* **INSERT:** Inserts new data into a database table.\\n* **UPDATE:** Modifies existing data in a database table.\\n* **DELETE:** Removes data from a database table.\\n* **JOIN:** Combines data from multiple tables based on a common field.\\n* **WHERE:** Filters data based on specific conditions.\\n* **ORDER BY:** Sorts data in a specific order.\\n* **LIMIT:** Limits the number of rows returned in a query.\"\n  }\n]\n```"},
      ],
    },
  ],
});
