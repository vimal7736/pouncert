import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FullStackJavaScriptRoadmap = () => {
    const [expandedSections, setExpandedSections] = useState({});
    const [expandedTopics, setExpandedTopics] = useState({});

    const toggleSection = (sectionId) => {
        setExpandedSections({
            ...expandedSections,
            [sectionId]: !expandedSections[sectionId]
        });
    };

    const toggleTopic = (topicId) => {
        setExpandedTopics({
            ...expandedTopics,
            [topicId]: !expandedTopics[topicId]
        });
    };

    const sections = [
        {
            id: 'javascript-fundamentals',
            title: 'JavaScript Fundamentals',
            topics: [
                {
                    id: 'js-basics',
                    name: 'JavaScript Basics',
                    subtopics: [
                        'Variables, Data Types & Type Coercion',
                        'Operators & Expressions',
                        'Control Flow (if/else, switch, loops)',
                        'Functions & Scope',
                        'Error Handling (try/catch)'
                    ]
                },
                {
                    id: 'js-advanced',
                    name: 'Advanced JavaScript',
                    subtopics: [
                        'Closures & Lexical Scope',
                        'Prototypes & Inheritance',
                        'Object-Oriented JavaScript',
                        'Asynchronous JS (Callbacks, Promises, Async/Await)',
                        'Event Loop & Call Stack'
                    ]
                },
                {
                    id: 'js-modern',
                    name: 'Modern JavaScript (ES6+)',
                    subtopics: [
                        'Arrow Functions & Template Literals',
                        'Destructuring & Spread/Rest Operators',
                        'Default Parameters & Optional Chaining',
                        'Map, Set & WeakMap Collections',
                        'Modules (import/export)'
                    ]
                },
                {
                    id: 'js-patterns',
                    name: 'Design Patterns',
                    subtopics: [
                        'Module Pattern & Revealing Module',
                        'Factory & Constructor Patterns',
                        'Singleton & Observer Patterns',
                        'Facade & Mediator Patterns',
                        'Flux Architecture Pattern'
                    ]
                },
                {
                    id: 'js-dom',
                    name: 'DOM Manipulation',
                    subtopics: [
                        'Selecting & Modifying Elements',
                        'Event Handling & Propagation',
                        'DOM Traversal & Manipulation',
                        'Browser Storage (localStorage, sessionStorage)',
                        'Web APIs (Fetch, Geolocation, Canvas)'
                    ]
                }
            ]
        },
        {
            id: 'frontend',
            title: 'Frontend Development',
            topics: [
                {
                    id: 'frontend-html-css',
                    name: 'HTML & CSS Foundations',
                    subtopics: [
                        'Semantic HTML & Accessibility',
                        'CSS Box Model & Layout',
                        'Flexbox & CSS Grid',
                        'Responsive Design & Media Queries',
                        'CSS Preprocessors (SASS/SCSS)'
                    ]
                },
                {
                    id: 'frontend-react',
                    name: 'React.js',
                    subtopics: [
                        'JSX Syntax & Component Structure',
                        'Class vs. Functional Components',
                        'Props, State & Lifecycle Methods',
                        'Hooks (useState, useEffect, useContext, useReducer)',
                        'React Router & Navigation'
                    ]
                },
                {
                    id: 'frontend-react-advanced',
                    name: 'Advanced React',
                    subtopics: [
                        'Performance Optimization & React.memo',
                        'Custom Hooks & Hook Composition',
                        'Context API & State Management',
                        'Render Props & Higher Order Components',
                        'Error Boundaries & Suspense'
                    ]
                },
                {
                    id: 'frontend-redux',
                    name: 'Redux & Redux Toolkit',
                    subtopics: [
                        'Redux Core Concepts (Store, Actions, Reducers)',
                        'Redux Toolkit Setup & Configuration',
                        'createSlice & Immutable State Updates',
                        'Async Logic with createAsyncThunk',
                        'Selectors & Performance Optimization'
                    ]
                },
                {
                    id: 'frontend-styling',
                    name: 'Styling in React',
                    subtopics: [
                        'CSS Modules & Scoped Styling',
                        'Styled Components & Emotion',
                        'Tailwind CSS Integration',
                        'Material UI & Component Libraries',
                        'Theming & Dark Mode Implementation'
                    ]
                }
            ]
        },
        {
            id: 'backend',
            title: 'Backend Development',
            topics: [
                {
                    id: 'backend-nodejs',
                    name: 'Node.js Fundamentals',
                    subtopics: [
                        'Node.js Runtime & Architecture',
                        'CommonJS vs. ES Modules',
                        'Built-in Modules (fs, path, http)',
                        'NPM Ecosystem & Package Management',
                        'Event Emitters & Streams'
                    ]
                },
                {
                    id: 'backend-express',
                    name: 'Express.js',
                    subtopics: [
                        'Routing & Middleware Patterns',
                        'Request & Response Objects',
                        'Route Parameters & Query Strings',
                        'Error Handling & Status Codes',
                        'Template Engines (EJS, Pug, Handlebars)'
                    ]
                },
                {
                    id: 'backend-rest',
                    name: 'RESTful API Design',
                    subtopics: [
                        'REST Principles & Resource Naming',
                        'HTTP Methods & Status Codes',
                        'JSON API Structure & Versioning',
                        'API Documentation (Swagger/OpenAPI)',
                        'Rate Limiting & Pagination'
                    ]
                },
                {
                    id: 'backend-auth',
                    name: 'Authentication & Security',
                    subtopics: [
                        'JWT Authentication & Session Management',
                        'OAuth 2.0 & Social Login Integration',
                        'Password Hashing & Secure Storage',
                        'CORS, CSRF & XSS Protection',
                        'Input Validation & Sanitization'
                    ]
                },
                {
                    id: 'backend-testing',
                    name: 'Backend Testing',
                    subtopics: [
                        'Unit Testing with Jest/Mocha',
                        'Integration Testing with Supertest',
                        'API Testing with Postman/Insomnia',
                        'Mocking & Stubbing Dependencies',
                        'Test Coverage & Continuous Integration'
                    ]
                }
            ]
        },
        {
            id: 'database',
            title: 'Database & Data Management',
            topics: [
                {
                    id: 'database-postgres',
                    name: 'PostgreSQL',
                    subtopics: [
                        'Database Design & Normalization',
                        'SQL Queries & Joins',
                        'Indexes & Query Optimization',
                        'Transactions & ACID Properties',
                        'PostgreSQL-specific Features (JSON, Arrays)'
                    ]
                },
                {
                    id: 'database-orm',
                    name: 'ORM & Query Builders',
                    subtopics: [
                        'Sequelize ORM Setup & Configuration',
                        'Models, Associations & Relationships',
                        'Migrations & Schema Management',
                        'Query Building & Complex Queries',
                        'Knex.js Query Builder'
                    ]
                },
                {
                    id: 'database-nosql',
                    name: 'NoSQL Databases',
                    subtopics: [
                        'MongoDB Fundamentals',
                        'Document Structure & Schema Design',
                        'Mongoose ODM for Node.js',
                        'CRUD Operations & Aggregation',
                        'Redis for Caching & Session Storage'
                    ]
                },
                {
                    id: 'database-data',
                    name: 'Data Management',
                    subtopics: [
                        'Data Validation & Sanitization',
                        'DTOs & Data Transformation',
                        'Pagination & Filtering Strategies',
                        'Database Backup & Recovery',
                        'Seed Data & Fixtures'
                    ]
                },
                {
                    id: 'database-performance',
                    name: 'Database Performance',
                    subtopics: [
                        'Connection Pooling & Resource Management',
                        'N+1 Query Problem & Solutions',
                        'Indexing Strategies & Execution Plans',
                        'Database Replication & Sharding',
                        'Query Caching & Optimization'
                    ]
                }
            ]
        },
        {
            id: 'deployment',
            title: 'DevOps & Deployment',
            topics: [
                {
                    id: 'deployment-basics',
                    name: 'Deployment Fundamentals',
                    subtopics: [
                        'Environment Variables & Configuration',
                        'Build Process & Bundling (Webpack, Babel)',
                        'Process Managers (PM2, Forever)',
                        'Web Servers (Nginx, Apache)',
                        'SSL/TLS Setup & HTTPS Configuration'
                    ]
                },
                {
                    id: 'deployment-docker',
                    name: 'Containerization',
                    subtopics: [
                        'Docker Basics & Dockerfile Creation',
                        'Container Orchestration with Docker Compose',
                        'Docker Networks & Volumes',
                        'Multi-stage Builds & Optimization',
                        'Kubernetes Fundamentals'
                    ]
                },
                {
                    id: 'deployment-ci-cd',
                    name: 'CI/CD Pipelines',
                    subtopics: [
                        'GitHub Actions Workflows',
                        'Jenkins Pipeline Setup',
                        'Automated Testing & Linting',
                        'Continuous Deployment Strategies',
                        'Infrastructure as Code (Terraform, CloudFormation)'
                    ]
                },
                {
                    id: 'deployment-cloud',
                    name: 'Cloud Services',
                    subtopics: [
                        'AWS Core Services (EC2, S3, RDS)',
                        'Heroku Deployment & Add-ons',
                        'Serverless Architecture (AWS Lambda, Netlify Functions)',
                        'Vercel & Netlify for Frontend Deployment',
                        'Cloud Monitoring & Logging'
                    ]
                },
                {
                    id: 'deployment-scaling',
                    name: 'Scaling & Reliability',
                    subtopics: [
                        'Load Balancing & Traffic Management',
                        'Auto-scaling & Resource Optimization',
                        'Caching Strategies (CDN, Redis)',
                        'Microservices Architecture',
                        'Service Health Monitoring & Alerts'
                    ]
                }
            ]
        },
        {
            id: 'advanced',
            title: 'Advanced Topics',
            topics: [
                {
                    id: 'advanced-architecture',
                    name: 'Software Architecture',
                    subtopics: [
                        'Clean Architecture & SOLID Principles',
                        'Domain-Driven Design (DDD)',
                        'Microservices vs. Monolithic Applications',
                        'Event-Driven Architecture',
                        'Serverless Architecture Patterns'
                    ]
                },
                {
                    id: 'advanced-typescript',
                    name: 'TypeScript',
                    subtopics: [
                        'TypeScript Type System & Interfaces',
                        'Advanced Types & Type Manipulation',
                        'Generics & Type Inference',
                        'Decorators & Metadata',
                        'TypeScript Configuration & Migration Strategies'
                    ]
                },
                {
                    id: 'advanced-graphql',
                    name: 'GraphQL',
                    subtopics: [
                        'GraphQL Schema & Type System',
                        'Queries, Mutations & Subscriptions',
                        'Apollo Client & Apollo Server',
                        'Resolvers & Data Sources',
                        'GraphQL Performance Optimization'
                    ]
                },
                {
                    id: 'advanced-realtime',
                    name: 'Real-time Applications',
                    subtopics: [
                        'WebSockets & Socket.io',
                        'Server-Sent Events (SSE)',
                        'Real-time Data Synchronization',
                        'Building Chat & Notification Systems',
                        'Push Notifications & Service Workers'
                    ]
                },
                {
                    id: 'advanced-testing',
                    name: 'Advanced Testing',
                    subtopics: [
                        'End-to-End Testing with Cypress/Playwright',
                        'Component Testing with React Testing Library',
                        'Test-Driven Development (TDD)',
                        'Behavior-Driven Development (BDD)',
                        'Performance & Load Testing'
                    ]
                }
            ]
        },
        {
            id: 'soft',
            title: 'Professional Skills',
            topics: [
                {
                    id: 'soft-tools',
                    name: 'Development Tools',
                    subtopics: [
                        'Git Version Control & GitHub Flow',
                        'IDE Mastery (VS Code Extensions & Shortcuts)',
                        'Chrome DevTools Debugging',
                        'Agile Project Management Tools (Jira, Trello)',
                        'Documentation Tools & Practices'
                    ]
                },
                {
                    id: 'soft-practices',
                    name: 'Best Practices',
                    subtopics: [
                        'Clean Code Principles',
                        'Code Reviews & Pair Programming',
                        'Documentation Standards',
                        'Performance Profiling & Optimization',
                        'Accessibility (WCAG Guidelines)'
                    ]
                },
                {
                    id: 'soft-teamwork',
                    name: 'Team Collaboration',
                    subtopics: [
                        'Agile & Scrum Methodologies',
                        'Technical Communication Skills',
                        'Pair Programming & Knowledge Sharing',
                        'Cross-Functional Collaboration',
                        'Remote Work Effectiveness'
                    ]
                },
                {
                    id: 'soft-career',
                    name: 'Career Development',
                    subtopics: [
                        'Portfolio Building & GitHub Presence',
                        'Technical Interview Preparation',
                        'Coding Challenges & Algorithm Practice',
                        'Conference Participation & Networking',
                        'Open Source Contribution'
                    ]
                },
                {
                    id: 'soft-communication',
                    name: 'Communication',
                    subtopics: [
                        'Technical Writing & Documentation',
                        'Presenting Technical Concepts to Non-technical Audiences',
                        'Requirements Gathering & User Stories',
                        'Stakeholder Management',
                        'Leading Technical Discussions'
                    ]
                }
            ]
        }
    ];

    return (
        <div className="font-mono bg-white text-gray-800 min-h-screen p-6">
            <header className="max-w-3xl mx-auto mb-12">
                <h1 className="text-2xl font-bold border-b-2 border-gray-800 pb-3 mb-3">Full Stack JavaScript Developer Roadmap</h1>
                <p className="text-sm">Essential skills from JavaScript basics to advanced full stack deployment</p>
            </header>

            <div className="max-w-3xl mx-auto">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.id}
                        className="mb-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div
                            className="flex items-center mb-2 cursor-pointer"
                            onClick={() => toggleSection(section.id)}
                        >
                            <div className="w-6 h-6 flex items-center justify-center border-2 border-gray-800 mr-3 font-bold">
                                {index + 1}
                            </div>
                            <h2 className="text-lg font-bold">{section.title}</h2>
                            <div className="ml-auto text-sm">
                                {expandedSections[section.id] ? '−' : '+'}
                            </div>
                        </div>

                        {expandedSections[section.id] && (
                            <div className="ml-9 border-l-2 border-gray-300 pl-4">
                                {section.topics.map((topic, topicIndex) => (
                                    <motion.div
                                        key={topic.id}
                                        className="mb-3"
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: topicIndex * 0.05 }}
                                    >
                                        <div
                                            className="flex items-center cursor-pointer py-1"
                                            onClick={() => toggleTopic(topic.id)}
                                        >
                                            <div className="w-1.5 h-1.5 bg-gray-800 mr-2"></div>
                                            <span className="font-medium">{topic.name}</span>
                                            <div className="ml-auto text-xs">
                                                {expandedTopics[topic.id] ? '−' : '+'}
                                            </div>
                                        </div>

                                        {expandedTopics[topic.id] && (
                                            <div className="ml-3 pl-3 border-l border-gray-200 text-sm">
                                                {topic.subtopics.map((subtopic, subtopicIndex) => (
                                                    <motion.div
                                                        key={subtopicIndex}
                                                        className="py-1 flex items-start"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: subtopicIndex * 0.05 }}
                                                    >
                                                        <span className="text-xs mr-2 mt-1">•</span>
                                                        <span className="text-gray-600">{subtopic}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}

                <motion.div
                    className="mt-16 border-t-2 border-gray-800 pt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: sections.length * 0.1 }}
                >
                    <div className="inline-block border-2 border-gray-800 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold mt-2">Ready for Industry</h2>
                    <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto">
                        With these skills mastered, you're well-equipped to build, deploy, and maintain full-stack JavaScript applications.
                    </p>
                </motion.div>
            </div>

            <footer className="max-w-3xl mx-auto mt-16 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
                <p>This learning path evolves continuously as JavaScript and its ecosystem grow.</p>
            </footer>
        </div>
    );
};

export default FullStackJavaScriptRoadmap;