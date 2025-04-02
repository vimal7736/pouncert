import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

// Complete course data structure
const courseData = {
    'javascript': {
        title: 'JavaScript',
        topics: [
            {
                id: 'js-basics',
                name: 'JavaScript Basics',
                subtopics: [
                    {
                        name: 'Variables, Data Types & Type Coercion',
                        exercises: [
                            {
                                description: "Declare variables using let, const, and var",
                                example: "const name = 'John';\nlet age = 30;\nvar isActive = true;"
                            },
                            {
                                description: "Demonstrate type coercion with the equality operator",
                                example: "console.log('5' == 5); // true (coercion happens)\nconsole.log('5' === 5); // false (strict equality)"
                            },
                            {
                                description: "Create different data types in JavaScript",
                                example: "const string = 'text';\nconst number = 42;\nconst boolean = false;\nconst array = [1, 2, 3];\nconst object = { key: 'value' };"
                            }
                        ]
                    },
                    {
                        name: 'Operators & Expressions',
                        exercises: [
                            {
                                description: "Use arithmetic operators",
                                example: "const sum = 5 + 10;\nconst product = 3 * 7;\nconst remainder = 10 % 3;"
                            },
                            {
                                description: "Use comparison operators",
                                example: "const isEqual = x === y;\nconst isGreater = a > b;\nconst isLessOrEqual = c <= d;"
                            },
                            {
                                description: "Use logical operators",
                                example: "const logicalAnd = x && y;\nconst logicalOr = a || b;\nconst logicalNot = !isValid;"
                            }
                        ]
                    },
                    {
                        name: 'Control Flow (if/else, switch, loops)',
                        exercises: [
                            {
                                description: "Write an if-else statement",
                                example: "if (age >= 18) {\n  console.log('Adult');\n} else {\n  console.log('Minor');\n}"
                            },
                            {
                                description: "Create a switch statement",
                                example: "switch (day) {\n  case 'Monday':\n    return 'Start of work week';\n  case 'Friday':\n    return 'End of work week';\n  default:\n    return 'Regular day';\n}"
                            },
                            {
                                description: "Write a for loop",
                                example: "for (let i = 0; i < array.length; i++) {\n  console.log(array[i]);\n}"
                            }
                        ]
                    },
                    {
                        name: 'Functions & Scope',
                        exercises: [
                            {
                                description: "Define a function declaration",
                                example: "function calculateArea(width, height) {\n  return width * height;\n}"
                            },
                            {
                                description: "Create a function expression",
                                example: "const greet = function(name) {\n  return `Hello, ${name}!`;\n};"
                            },
                            {
                                description: "Demonstrate lexical scope",
                                example: "function outer() {\n  const x = 10;\n  function inner() {\n    console.log(x); // Accesses x from outer scope\n  }\n  inner();\n}"
                            }
                        ]
                    },
                    {
                        name: 'Error Handling (try/catch)',
                        exercises: [
                            {
                                description: "Use try-catch blocks",
                                example: "try {\n  const result = riskyOperation();\n  console.log(result);\n} catch (error) {\n  console.error(error.message);\n}"
                            },
                            {
                                description: "Create a custom error",
                                example: "class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'ValidationError';\n  }\n}"
                            },
                            {
                                description: "Use finally block",
                                example: "try {\n  openFile();\n  processData();\n} catch (error) {\n  handleError(error);\n} finally {\n  closeFile(); // Always executes\n}"
                            }
                        ]
                    }
                ]
            },
            {
                id: 'js-advanced',
                name: 'Advanced JavaScript',
                subtopics: [
                    {
                        name: 'Closures & Lexical Scope',
                        exercises: [
                            {
                                description: "Create a closure",
                                example: "function createCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\nconst counter = createCounter();"
                            },
                            {
                                description: "Use closure for private variables",
                                example: "const makeWallet = () => {\n  let balance = 0;\n  return {\n    deposit: amount => { balance += amount; },\n    getBalance: () => balance\n  };\n};"
                            }
                        ]
                    },
                    {
                        name: 'Prototypes & Inheritance',
                        exercises: [
                            {
                                description: "Create a prototype method",
                                example: "function Person(name) {\n  this.name = name;\n}\n\nPerson.prototype.greet = function() {\n  return `Hello, my name is ${this.name}`;\n};"
                            },
                            {
                                description: "Implement prototypal inheritance",
                                example: "function Employee(name, title) {\n  Person.call(this, name);\n  this.title = title;\n}\n\nEmployee.prototype = Object.create(Person.prototype);\nEmployee.prototype.constructor = Employee;"
                            }
                        ]
                    },
                    {
                        name: 'Object-Oriented JavaScript',
                        exercises: [
                            {
                                description: "Create a class with ES6 syntax",
                                example: "class User {\n  constructor(username, email) {\n    this.username = username;\n    this.email = email;\n  }\n  \n  getProfile() {\n    return `${this.username} (${this.email})`;\n  }\n}"
                            },
                            {
                                description: "Implement class inheritance",
                                example: "class Admin extends User {\n  constructor(username, email, permissions) {\n    super(username, email);\n    this.permissions = permissions;\n  }\n  \n  hasPermission(permission) {\n    return this.permissions.includes(permission);\n  }\n}"
                            }
                        ]
                    },
                    {
                        name: 'Asynchronous JS (Callbacks, Promises, Async/Await)',
                        exercises: [
                            {
                                description: "Write a callback function",
                                example: "function fetchData(callback) {\n  setTimeout(() => {\n    const data = { result: 'success' };\n    callback(null, data);\n  }, 1000);\n}"
                            },
                            {
                                description: "Create a Promise",
                                example: "function fetchUserData(userId) {\n  return new Promise((resolve, reject) => {\n    if (userId) {\n      resolve({ id: userId, name: 'John Doe' });\n    } else {\n      reject(new Error('User ID is required'));\n    }\n  });\n}"
                            },
                            {
                                description: "Use async/await syntax",
                                example: "async function getUserDetails(userId) {\n  try {\n    const user = await fetchUserData(userId);\n    const posts = await fetchUserPosts(userId);\n    return { user, posts };\n  } catch (error) {\n    console.error(error);\n    return null;\n  }\n}"
                            }
                        ]
                    },
                    {
                        name: 'Event Loop & Call Stack',
                        exercises: [
                            {
                                description: "Demonstrate the event loop with setTimeout",
                                example: "console.log('Start');\nsetTimeout(() => {\n  console.log('Timeout callback');\n}, 0);\nPromise.resolve().then(() => {\n  console.log('Promise resolved');\n});\nconsole.log('End');"
                            },
                            {
                                description: "Show microtask vs macrotask queue",
                                example: "setTimeout(() => console.log('Timeout 1'), 0);\nPromise.resolve().then(() => console.log('Promise 1'));\nPromise.resolve().then(() => console.log('Promise 2'));\nsetTimeout(() => console.log('Timeout 2'), 0);"
                            }
                        ]
                    }
                ]
            },
            {
                id: 'js-modern',
                name: 'Modern JavaScript (ES6+)',
                subtopics: [
                    {
                        name: 'Arrow Functions & Template Literals',
                        exercises: [
                            {
                                description: "Convert function to arrow function",
                                example: "const multiply = (a, b) => a * b;"
                            },
                            {
                                description: "Use template literals with expressions",
                                example: "const name = 'Alice';\nconst greeting = `Hello ${name}! Today is ${new Date().toLocaleDateString()}.`;"
                            }
                        ]
                    },
                    {
                        name: 'Destructuring & Spread/Rest Operators',
                        exercises: [
                            {
                                description: "Destructure an object",
                                example: "const person = { name: 'John', age: 30, city: 'New York' };\nconst { name, age } = person;"
                            },
                            {
                                description: "Use spread operator with arrays",
                                example: "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2];"
                            },
                            {
                                description: "Use rest parameters in function",
                                example: "function sum(...numbers) {\n  return numbers.reduce((total, num) => total + num, 0);\n}"
                            }
                        ]
                    },
                    {
                        name: 'Default Parameters & Optional Chaining',
                        exercises: [
                            {
                                description: "Set default function parameters",
                                example: "function createUser(name, role = 'user', active = true) {\n  return { name, role, active };\n}"
                            },
                            {
                                description: "Use optional chaining operator",
                                example: "const userValue = user?.profile?.preferences?.theme;"
                            }
                        ]
                    },
                    {
                        name: 'Map, Set & WeakMap Collections',
                        exercises: [
                            {
                                description: "Create and use a Map",
                                example: "const userRoles = new Map();\nuserRoles.set('john', 'admin');\nuserRoles.set('jane', 'editor');\nconst role = userRoles.get('john');"
                            },
                            {
                                description: "Use a Set for unique values",
                                example: "const uniqueTags = new Set();\nuniqueTags.add('javascript');\nuniqueTags.add('react');\nuniqueTags.add('javascript'); // Won't be added again"
                            }
                        ]
                    },
                    {
                        name: 'Modules (import/export)',
                        exercises: [
                            {
                                description: "Export functions and variables",
                                example: "// utils.js\nexport const PI = 3.14159;\nexport function square(x) {\n  return x * x;\n}\nexport default class Calculator {\n  // implementation\n}"
                            },
                            {
                                description: "Import from a module",
                                example: "import Calculator, { PI, square } from './utils.js';\n\nconst area = PI * square(5);\nconst calc = new Calculator();"
                            }
                        ]
                    }
                ]
            },
            {
                id: 'js-patterns',
                name: 'Design Patterns',
                subtopics: [
                    {
                        name: 'Module Pattern & Revealing Module',
                        exercises: [
                            {
                                description: "Implement module pattern",
                                example: "const calculator = (function() {\n  const add = (a, b) => a + b;\n  const subtract = (a, b) => a - b;\n  \n  return {\n    add,\n    subtract\n  };\n})();"
                            },
                            {
                                description: "Create revealing module pattern",
                                example: "const shoppingCart = (function() {\n  const items = [];\n  \n  function addItem(item) {\n    items.push(item);\n  }\n  \n  function getItemCount() {\n    return items.length;\n  }\n  \n  return {\n    add: addItem,\n    count: getItemCount\n  };\n})();"
                            }
                        ]
                    },
                    {
                        name: 'Factory & Constructor Patterns',
                        exercises: [
                            {
                                description: "Create a factory function",
                                example: "function createUser(name, email) {\n  return {\n    name,\n    email,\n    login() {\n      console.log(`${name} logged in`);\n    }\n  };\n}\n\nconst user = createUser('John', 'john@example.com');"
                            },
                            {
                                description: "Use constructor pattern",
                                example: "function User(name, email) {\n  this.name = name;\n  this.email = email;\n  this.login = function() {\n    console.log(`${this.name} logged in`);\n  };\n}\n\nconst user = new User('John', 'john@example.com');"
                            }
                        ]
                    },
                    {
                        name: 'Singleton & Observer Patterns',
                        exercises: [
                            {
                                description: "Implement singleton pattern",
                                example: "const Database = (function() {\n  let instance;\n  \n  function createInstance() {\n    return { data: [], connect() {} };\n  }\n  \n  return {\n    getInstance() {\n      if (!instance) {\n        instance = createInstance();\n      }\n      return instance;\n    }\n  };\n})();"
                            },
                            {
                                description: "Create observer pattern",
                                example: "class EventObserver {\n  constructor() {\n    this.observers = [];\n  }\n  \n  subscribe(fn) {\n    this.observers.push(fn);\n  }\n  \n  unsubscribe(fn) {\n    this.observers = this.observers.filter(\n      subscriber => subscriber !== fn\n    );\n  }\n  \n  broadcast(data) {\n    this.observers.forEach(subscriber => subscriber(data));\n  }\n}"
                            }
                        ]
                    },
                    {
                        name: 'Facade & Mediator Patterns',
                        exercises: [
                            {
                                description: "Create facade pattern",
                                example: "class VideoConverter {\n  convertVideo(filename, format) {\n    // Complex logic simplified with facade\n    const file = new VideoFile(filename);\n    const sourceCodec = new CodecFactory().extract(file);\n    let destinationCodec;\n    \n    if (format === 'mp4') {\n      destinationCodec = new MPEG4CompressionCodec();\n    } else {\n      destinationCodec = new OggCompressionCodec();\n    }\n    \n    const buffer = new BitrateReader().read(filename, sourceCodec);\n    const result = new BitrateReader().convert(buffer, destinationCodec);\n    return new AudioMixer().fix(result);\n  }\n}"
                            },
                            {
                                description: "Implement mediator pattern",
                                example: "class ChatRoom {\n  constructor() {\n    this.users = {};\n  }\n  \n  register(user) {\n    this.users[user.name] = user;\n    user.chatroom = this;\n  }\n  \n  send(message, from, to) {\n    if (to) {\n      // Single user message\n      this.users[to].receive(message, from);\n    } else {\n      // Broadcast message\n      Object.keys(this.users).forEach(key => {\n        if (this.users[key] !== from) {\n          this.users[key].receive(message, from);\n        }\n      });\n    }\n  }\n}"
                            }
                        ]
                    },
                    {
                        name: 'Flux Architecture Pattern',
                        exercises: [
                            {
                                description: "Define Flux action creators",
                                example: "const TodoActions = {\n  addTodo(text) {\n    AppDispatcher.dispatch({\n      actionType: TodoConstants.ADD_TODO,\n      text: text\n    });\n  },\n  \n  deleteTodo(id) {\n    AppDispatcher.dispatch({\n      actionType: TodoConstants.DELETE_TODO,\n      id: id\n    });\n  }\n};"
                            },
                            {
                                description: "Create Flux store",
                                example: "const TodoStore = {\n  todos: [],\n  \n  getAll() {\n    return this.todos;\n  },\n  \n  addTodo(text) {\n    this.todos.push({\n      id: Date.now(),\n      text,\n      complete: false\n    });\n    this.emitChange();\n  },\n  \n  emitChange() {\n    EventEmitter.emit('change');\n  }\n};"
                            }
                        ]
                    }
                ]
            },
            {
                id: 'js-dom',
                name: 'DOM Manipulation',
                subtopics: [
                    {
                        name: 'Selecting & Modifying Elements',
                        exercises: [
                            {
                                description: "Select elements with querySelector",
                                example: "const header = document.querySelector('.header');\nconst buttons = document.querySelectorAll('button.primary');"
                            },
                            {
                                description: "Modify element content",
                                example: "element.textContent = 'New text content';\nelement.innerHTML = '<span>New HTML content</span>';"
                            },
                            {
                                description: "Change element styles",
                                example: "element.style.color = 'blue';\nelement.style.backgroundColor = '#f0f0f0';\nelement.classList.add('active');"
                            }
                        ]
                    },
                    {
                        name: 'Event Handling & Propagation',
                        exercises: [
                            {
                                description: "Add event listener",
                                example: "button.addEventListener('click', function(event) {\n  console.log('Button clicked!');\n});"
                            },
                            {
                                description: "Handle event propagation",
                                example: "child.addEventListener('click', function(event) {\n  event.stopPropagation(); // Prevents bubbling\n  console.log('Child clicked');\n});"
                            },
                            {
                                description: "Use event delegation",
                                example: "parentList.addEventListener('click', function(event) {\n  if (event.target.matches('li')) {\n    console.log('List item clicked:', event.target.textContent);\n  }\n});"
                            }
                        ]
                    },
                    {
                        name: 'DOM Traversal & Manipulation',
                        exercises: [
                            {
                                description: "Traverse the DOM",
                                example: "const parent = element.parentNode;\nconst firstChild = parent.firstElementChild;\nconst nextSibling = element.nextElementSibling;"
                            },
                            {
                                description: "Create and append elements",
                                example: "const newDiv = document.createElement('div');\nnewDiv.textContent = 'New Element';\nparentElement.appendChild(newDiv);"
                            },
                            {
                                description: "Remove elements",
                                example: "parentElement.removeChild(childElement);\n// Or more modern approach\nelement.remove();"
                            }
                        ]
                    },
                    {
                        name: 'Browser Storage (localStorage, sessionStorage)',
                        exercises: [
                            {
                                description: "Use localStorage",
                                example: "// Store data\nlocalStorage.setItem('username', 'john_doe');\n\n// Retrieve data\nconst username = localStorage.getItem('username');\n\n// Remove data\nlocalStorage.removeItem('username');"
                            },
                            {
                                description: "Store objects in storage",
                                example: "const user = { name: 'John', role: 'admin' };\nlocalStorage.setItem('user', JSON.stringify(user));\n\nconst storedUser = JSON.parse(localStorage.getItem('user'));"
                            }
                        ]
                    },
                    {
                        name: 'Web APIs (Fetch, Geolocation, Canvas)',
                        exercises: [
                            {
                                description: "Use the Fetch API",
                                example: "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));"
                            },
                            {
                                description: "Get geolocation",
                                example: "navigator.geolocation.getCurrentPosition(\n  position => {\n    const { latitude, longitude } = position.coords;\n    console.log(`Location: ${latitude}, ${longitude}`);\n  },\n  error => console.error('Error:', error)\n);"
                            },
                            {
                                description: "Draw on canvas",
                                example: "const canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\nctx.fillStyle = 'blue';\nctx.fillRect(10, 10, 150, 100);\n\nctx.strokeStyle = 'red';\nctx.beginPath();\nctx.arc(100, 100, 50, 0, Math.PI * 2);\nctx.stroke();"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    'react': {
        title: 'React',
        topics: [
            {
                id: 'react-basics',
                name: 'React Basics',
                subtopics: [
                    {
                        name: 'JSX Syntax & Component Structure',
                        exercises: [
                            {
                                description: "Create a basic React component with JSX",
                                example: "function Welcome() {\n  return (\n    <div className=\"welcome\">\n      <h1>Hello, React!</h1>\n    </div>\n  );\n}"
                            },
                            {
                                description: "Use JavaScript expressions in JSX",
                                example: "function Greeting({ user }) {\n  return (\n    <div>\n      {user ? (\n        <h1>Welcome back, {user.name}!</h1>\n      ) : (\n        <h1>Please sign in</h1>\n      )}\n    </div>\n  );\n}"
                            }
                        ]
                    },
                    {
                        name: 'Class vs. Functional Components',
                        exercises: [
                            {
                                description: "Create a class component",
                                example: "class Counter extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { count: 0 };\n  }\n  \n  increment = () => {\n    this.setState({ count: this.state.count + 1 });\n  };\n  \n  render() {\n    return (\n      <div>\n        <p>Count: {this.state.count}</p>\n        <button onClick={this.increment}>Increment</button>\n      </div>\n    );\n  }\n}"
                            },
                            {
                                description: "Create a functional component with hooks",
                                example: "function Counter() {\n  const [count, setCount] = useState(0);\n  \n  const increment = () => {\n    setCount(count + 1);\n  };\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>Increment</button>\n    </div>\n  );\n}"
                            }
                        ]
                    },
                    {
                        name: 'Props, State & Lifecycle Methods',
                        exercises: [
                            {
                                description: "Pass and use props",
                                example: "function UserProfile({ name, role, avatar }) {\n  return (\n    <div className=\"profile\">\n      <img src={avatar} alt={`${name}'s avatar`} />\n      <h2>{name}</h2>\n      <p>Role: {role}</p>\n    </div>\n  );\n}"
                            },
                            {
                                description: "Use lifecycle methods in class component",
                                example: "class DataFetcher extends React.Component {\n  state = { data: null, loading: true, error: null };\n  \n  componentDidMount() {\n    fetch(this.props.url)\n      .then(res => res.json())\n      .then(data => this.setState({ data, loading: false }))\n      .catch(error => this.setState({ error, loading: false }));\n  }\n  \n  render() {\n    const { data, loading, error } = this.state;\n    if (loading) return <div>Loading...</div>;\n    if (error) return <div>Error: {error.message}</div>;\n    return <div>{JSON.stringify(data)}</div>;\n  }\n}"
                            }
                        ]
                    },
                    {
                        name: 'Hooks (useState, useEffect, useContext, useReducer)',
                        exercises: [
                            {
                                description: "Use useState hook",
                                example: "function Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}"
                            },
                            {
                                description: "Use useEffect hook",
                                example: "function DataFetcher({ url }) {\n  const [data, setData] = useState(null);\n  \n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(setData);\n  }, [url]); // Re-run when URL changes\n  \n  return <div>{JSON.stringify(data)}</div>;\n}"
                            }
                        ]
                    },
                    {
                        name: 'React Router & Navigation',
                        exercises: [
                            {
                                description: "Set up basic routing",
                                example: "function App() {\n  return (\n    <Router>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n        <Route path=\"/contact\" element={<Contact />} />\n      </Routes>\n    </Router>\n  );\n}"
                            },
                            {
                                description: "Create navigation links",
                                example: "function NavBar() {\n  return (\n    <nav>\n      <Link to=\"/\">Home</Link>\n      <Link to=\"/about\">About</Link>\n      <Link to=\"/contact\">Contact</Link>\n    </nav>\n  );\n}"
                            }
                        ]
                    }
                ]
            },
            {
                id: 'react-advanced',
                name: 'Advanced React',
                subtopics: [
                    {
                        name: 'Performance Optimization & React.memo',
                        exercises: [
                            {
                                description: "Use React.memo to prevent unnecessary re-renders",
                                example: "const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {\n  // Component implementation\n  return <div>{data}</div>;\n});"
                            },
                            {
                                description: "Use useCallback to memoize functions",
                                example: "function Parent() {\n  const [count, setCount] = useState(0);\n  \n  const handleClick = useCallback(() => {\n    console.log('Button clicked');\n  }, []);\n  \n  return <Child onClick={handleClick} />;\n}"
                            }
                        ]
                    },
                    {
                        name: 'Custom Hooks & Hook Composition',
                        exercises: [
                            {
                                description: "Create a custom hook",
                                example: "function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initialValue;\n  });\n  \n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n  \n  return [value, setValue];\n}"
                            }
                        ]
                    },
                    {
                        name: 'Context API & State Management',
                        exercises: [
                            {
                                description: "Create and use a context",
                                example: "const ThemeContext = createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div>Current theme: {theme}</div>;\n}"
                            }
                        ]
                    },
                    {
                        name: 'Render Props & Higher Order Components',
                        exercises: [
                            {
                                description: "Create a component with render props",
                                example: "class MouseTracker extends React.Component {\n  state = { x: 0, y: 0 };\n  \n  handleMouseMove = (e) => {\n    this.setState({ x: e.clientX, y: e.clientY });\n  };\n  \n  render() {\n    return (\n      <div onMouseMove={this.handleMouseMove}>\n        {this.props.render(this.state)}\n      </div>\n    );\n  }\n}"
                            }
                        ]
                    },
                    {
                        name: 'Error Boundaries & Suspense',
                        exercises: [
                            {
                                description: "Create an error boundary",
                                example: "class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  \n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n  \n  componentDidCatch(error, info) {\n    logErrorToService(error, info);\n  }\n  \n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}"
                            }
                        ]
                    }
                ]
            },
            {
                id: 'react-redux',
                name: 'Redux & Redux Toolkit',
                subtopics: [
                    {
                        name: 'Redux Core Concepts (Store, Actions, Reducers)',
                        exercises: [
                            {
                                description: "Create a Redux store",
                                example: "import { createStore } from 'redux';\n\nconst initialState = { count: 0 };\n\nfunction counterReducer(state = initialState, action) {\n  switch (action.type) {\n    case 'INCREMENT':\n      return { count: state.count + 1 };\n    default:\n      return state;\n  }\n}\n\nconst store = createStore(counterReducer);"
                            }
                        ]
                    },
                    {
                        name: 'Redux Toolkit Setup & Configuration',
                        exercises: [
                            {
                                description: "Configure a Redux Toolkit store",
                                example: "import { configureStore } from '@reduxjs/toolkit';\n\nconst store = configureStore({\n  reducer: {\n    counter: counterReducer,\n    // other reducers\n  }\n});"
                            }
                        ]
                    },
                    {
                        name: 'createSlice & Immutable State Updates',
                        exercises: [
                            {
                                description: "Create a Redux Toolkit slice",
                                example: "import { createSlice } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment(state) {\n      state.value += 1;\n    }\n  }\n});\n\nexport const { increment } = counterSlice.actions;\nexport default counterSlice.reducer;"
                            }
                        ]
                    },
                    {
                        name: 'Async Logic with createAsyncThunk',
                        exercises: [
                            {
                                description: "Create an async thunk",
                                example: "import { createAsyncThunk } from '@reduxjs/toolkit';\n\nexport const fetchUser = createAsyncThunk(\n  'users/fetchById',\n  async (userId) => {\n    const response = await fetch(`/api/users/${userId}`);\n    return response.json();\n  }\n);"
                            }
                        ]
                    },
                    {
                        name: 'Selectors & Performance Optimization',
                        exercises: [
                            {
                                description: "Create a memoized selector",
                                example: "import { createSelector } from '@reduxjs/toolkit';\n\nconst selectUser = state => state.user;\n\nconst selectUserDetails = createSelector(\n  [selectUser],\n  (user) => ({\n    name: `${user.firstName} ${user.lastName}`,\n    age: user.age\n  })\n);"
                            }
                        ]
                    }
                ]
            },
            {
                id: 'react-styling',
                name: 'Styling in React',
                subtopics: [
                    {
                        name: 'CSS Modules & Scoped Styling',
                        exercises: [
                            {
                                description: "Use CSS Modules",
                                example: "import styles from './Button.module.css';\n\nfunction Button() {\n  return <button className={styles.button}>Click me</button>;\n}"
                            }
                        ]
                    },
                    {
                        name: 'Styled Components & Emotion',
                        exercises: [
                            {
                                description: "Create a styled component",
                                example: "import styled from 'styled-components';\n\nconst Button = styled.button`\n  background: palevioletred;\n  border-radius: 3px;\n  border: none;\n  color: white;\n`;\n\n// Usage: <Button>Click me</Button>"
                            }
                        ]
                    },
                    {
                        name: 'Tailwind CSS Integration',
                        exercises: [
                            {
                                description: "Use Tailwind CSS classes",
                                example: "function Button() {\n  return (\n    <button className=\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\">\n      Click me\n    </button>\n  );\n}"
                            }
                        ]
                    },
                    {
                        name: 'Material UI & Component Libraries',
                        exercises: [
                            {
                                description: "Use Material UI components",
                                example: "import { Button } from '@mui/material';\n\nfunction MyButton() {\n  return <Button variant=\"contained\">Click me</Button>;\n}"
                            }
                        ]
                    },
                    {
                        name: 'Theming & Dark Mode Implementation',
                        exercises: [
                            {
                                description: "Implement dark mode with context",
                                example: "const ThemeContext = createContext({\n  theme: 'light',\n  toggleTheme: () => {}\n});\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  \n  const toggleTheme = () => {\n    setTheme(theme === 'light' ? 'dark' : 'light');\n  };\n  \n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

const TypingPractice = () => {
    const [selectedCourse, setSelectedCourse] = useState('javascript');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSubtopic, setSelectedSubtopic] = useState('');
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isComplete, setIsComplete] = useState(false);
    const inputRef = useRef(null);

    const courses = Object.keys(courseData);
    const topics = selectedCourse ? courseData[selectedCourse].topics : [];
    const subtopics = selectedTopic
        ? topics.find(t => t.id === selectedTopic)?.subtopics || []
        : [];
    const exercises = selectedSubtopic
        ? subtopics.find(st => st.name === selectedSubtopic)?.exercises || []
        : [];
    const currentExercise = exercises[currentExerciseIndex];

    useEffect(() => {
        if (currentExercise && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentExercise]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setUserInput(value);

        if (!startTime && value.length > 0) {
            setStartTime(Date.now());
        }

        // Calculate accuracy
        const expectedText = currentExercise.example.substring(0, value.length);
        let errors = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== expectedText[i]) {
                errors++;
            }
        }
        const newAccuracy = Math.round(((value.length - errors) / value.length) * 100);
        setAccuracy(isNaN(newAccuracy) ? 100 : newAccuracy);

        // Check completion
        if (value === currentExercise.example) {
            const endTime = Date.now();
            const minutes = (endTime - startTime) / 60000;
            const words = currentExercise.example.split(/\s+/).length;
            const calculatedWpm = Math.round(words / minutes);
            setWpm(calculatedWpm);
            setIsComplete(true);
            toast.success('Exercise completed!', {
                description: `Speed: ${calculatedWpm} WPM, Accuracy: ${accuracy}%`
            });
        }
    };

    const handleReset = () => {
        setUserInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setIsComplete(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleNextExercise = () => {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            handleReset();
        } else {
            toast.info('You completed all exercises in this subtopic!');
        }
    };

    const handlePrevExercise = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
            handleReset();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleNextExercise();
        } else if (e.key === 'Enter' && e.shiftKey) {
            handlePrevExercise();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Toaster position="top-center" />

            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">JavaScript & React Typing Practice</h1>

                {/* Course/Topic/Subtopic Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="font-bold mb-2">1. Select Course</h2>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedCourse}
                            onChange={(e) => {
                                setSelectedCourse(e.target.value);
                                setSelectedTopic('');
                                setSelectedSubtopic('');
                            }}
                        >
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course} value={course}>
                                    {courseData[course].title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="font-bold mb-2">2. Select Topic</h2>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedTopic}
                            onChange={(e) => {
                                setSelectedTopic(e.target.value);
                                setSelectedSubtopic('');
                            }}
                            disabled={!selectedCourse}
                        >
                            <option value="">Select a topic</option>
                            {topics.map(topic => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="font-bold mb-2">3. Select Subtopic</h2>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedSubtopic}
                            onChange={(e) => {
                                setSelectedSubtopic(e.target.value);
                                setCurrentExerciseIndex(0);
                                handleReset();
                            }}
                            disabled={!selectedTopic}
                        >
                            <option value="">Select a subtopic</option>
                            {subtopics.map(subtopic => (
                                <option key={subtopic.name} value={subtopic.name}>
                                    {subtopic.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Typing Practice Area */}
                {currentExercise ? (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {selectedSubtopic} - Exercise {currentExerciseIndex + 1} of {exercises.length}
                            </h2>
                            <div className="text-sm">
                                <span className="font-medium">WPM: {wpm}</span> |
                                <span className="font-medium"> Accuracy: {accuracy}%</span>
                            </div>
                        </div>

                        <p className="mb-4 text-gray-700">{currentExercise.description}</p>

                        <div className="bg-gray-100 p-4 rounded-md mb-4 font-mono whitespace-pre">
                            {currentExercise.example.split('').map((char, idx) => (
                                <span
                                    key={idx}
                                    className={`
                    ${idx >= userInput.length ? 'text-gray-400' : ''}
                    ${idx < userInput.length && char === userInput[idx] ? 'text-green-600' : ''}
                    ${idx < userInput.length && char !== userInput[idx] ? 'text-red-600 bg-red-100' : ''}
                  `}
                                >
                  {char}
                </span>
                            ))}
                        </div>

                        <textarea
                            ref={inputRef}
                            className="w-full p-4 border rounded-md font-mono text-sm"
                            value={userInput}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            disabled={isComplete}
                            rows={8}
                            placeholder="Type the code above exactly as shown..."
                        />

                        <div className="flex justify-between mt-4">
                            <div>
                                <button
                                    onClick={handlePrevExercise}
                                    disabled={currentExerciseIndex === 0}
                                    className="px-4 py-2 bg-gray-300 rounded-md mr-2 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextExercise}
                                    disabled={currentExerciseIndex === exercises.length - 1}
                                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Reset
                            </button>
                        </div>

                        {isComplete && (
                            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
                                <p className="font-medium">Completed! Press Next to continue or Reset to try again.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <p className="text-gray-600">
                            {!selectedCourse ? 'Select a course to begin' :
                                !selectedTopic ? 'Select a topic to continue' :
                                    !selectedSubtopic ? 'Select a subtopic to start practicing' :
                                        'No exercises available for this subtopic'}
                        </p>
                    </div>
                )}

                {/* Keyboard Shortcuts Help */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-bold mb-2">Keyboard Shortcuts:</h3>
                    <ul className="text-sm space-y-1">
                        <li><span className="font-mono bg-gray-100 px-1 py-0.5 rounded">Ctrl + Enter</span> - Next exercise</li>
                        <li><span className="font-mono bg-gray-100 px-1 py-0.5 rounded">Shift + Enter</span> - Previous exercise</li>
                        <li><span className="font-mono bg-gray-100 px-1 py-0.5 rounded">Esc</span> - Reset current exercise</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TypingPractice;