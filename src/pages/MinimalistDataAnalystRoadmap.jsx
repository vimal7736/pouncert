import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MinimalistDataAnalystRoadmap = () => {
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
            id: 'foundation',
            title: 'Foundation Skills',
            topics: [
                {
                    id: 'foundation-stats',
                    name: 'Statistics & Probability',
                    subtopics: [
                        'Descriptive Statistics (Mean, Median, Mode, Variance)',
                        'Probability Distributions (Normal, Binomial, Poisson)',
                        'Sampling Methods & Central Limit Theorem',
                        'Confidence Intervals',
                        'Bayesian vs. Frequentist Statistics'
                    ]
                },
                {
                    id: 'foundation-math',
                    name: 'Mathematics',
                    subtopics: [
                        'Linear Algebra (Matrices, Vectors, Eigenvalues)',
                        'Calculus (Derivatives, Integrals, Optimization)',
                        'Dimensionality Reduction Concepts',
                        'Distance Metrics (Euclidean, Manhattan, Cosine)'
                    ]
                },
                {
                    id: 'foundation-programming',
                    name: 'Programming Concepts',
                    subtopics: [
                        'Variables, Data Types & Control Structures',
                        'Functions & Modules',
                        'Object-Oriented Programming Basics',
                        'Algorithm Complexity (Big O Notation)',
                        'Programming Logic & Debugging'
                    ]
                },
                {
                    id: 'foundation-datastructures',
                    name: 'Data Types & Structures',
                    subtopics: [
                        'Scalar vs. Vector Data Types',
                        'Arrays, Lists, Dictionaries & Sets',
                        'Structured vs. Unstructured Data',
                        'Time Series Data Structures',
                        'Graph Data Structures'
                    ]
                },
                {
                    id: 'foundation-business',
                    name: 'Business Understanding',
                    subtopics: [
                        'Key Performance Indicators (KPIs)',
                        'Business Process Analysis',
                        'Cost-Benefit Analysis',
                        'Business Metrics (Customer Retention, Conversion)',
                        'Industry-Specific Knowledge'
                    ]
                }
            ]
        },
        {
            id: 'tools',
            title: 'Technical Tools',
            topics: [
                {
                    id: 'tools-excel',
                    name: 'Excel',
                    subtopics: [
                        'Advanced Functions (VLOOKUP, INDEX-MATCH, SUMIFS)',
                        'Pivot Tables & Power Pivot',
                        'Power Query & Data Modeling',
                        'Excel Statistical Functions',
                        'Macros & VBA Basics'
                    ]
                },
                {
                    id: 'tools-sql',
                    name: 'SQL',
                    subtopics: [
                        'Advanced Queries & Joins',
                        'Subqueries & Common Table Expressions (CTEs)',
                        'Window Functions (ROW_NUMBER, RANK, LAG)',
                        'Database Design & Normalization',
                        'Query Optimization'
                    ]
                },
                {
                    id: 'tools-python',
                    name: 'Python/R Programming',
                    subtopics: [
                        'Python: Pandas, NumPy, SciPy Libraries',
                        'R: tidyverse, dplyr, ggplot2 Packages',
                        'Data Manipulation & Cleaning',
                        'Statistical Computing',
                        'API Integrations & Web Scraping'
                    ]
                },
                {
                    id: 'tools-viz',
                    name: 'Power BI/Tableau',
                    subtopics: [
                        'Data Modeling & Relationships',
                        'DAX Formulas / Calculated Fields',
                        'Interactive Dashboard Creation',
                        'Visualizations & Best Practices',
                        'Report Distribution & Embedding'
                    ]
                },
                {
                    id: 'tools-git',
                    name: 'Version Control',
                    subtopics: [
                        'Git Fundamentals (Commit, Branch, Merge)',
                        'Collaborative Workflows',
                        'Documentation Best Practices',
                        'Issue Tracking & Project Management'
                    ]
                }
            ]
        },
        {
            id: 'analysis',
            title: 'Analysis Techniques',
            topics: [
                {
                    id: 'analysis-cleaning',
                    name: 'Data Cleaning & Preparation',
                    subtopics: [
                        'Handling Missing Values',
                        'Outlier Detection & Treatment',
                        'Feature Scaling & Normalization',
                        'Data Type Conversion',
                        'Deduplication Techniques'
                    ]
                },
                {
                    id: 'analysis-eda',
                    name: 'Exploratory Data Analysis',
                    subtopics: [
                        'Univariate Analysis',
                        'Bivariate & Multivariate Analysis',
                        'Distribution Analysis',
                        'Correlation & Covariance',
                        'Pattern Recognition'
                    ]
                },
                {
                    id: 'analysis-descriptive',
                    name: 'Descriptive Statistics',
                    subtopics: [
                        'Measures of Central Tendency',
                        'Measures of Dispersion',
                        'Percentiles & Quartiles',
                        'Data Summarization',
                        'Statistical Report Generation'
                    ]
                },
                {
                    id: 'analysis-hypothesis',
                    name: 'Hypothesis Testing',
                    subtopics: [
                        't-Tests & z-Tests',
                        'ANOVA & Chi-Square Tests',
                        'Non-parametric Tests',
                        'Effect Size Calculation',
                        'P-value Interpretation'
                    ]
                },
                {
                    id: 'analysis-ab',
                    name: 'A/B Testing',
                    subtopics: [
                        'Experiment Design',
                        'Sample Size Determination',
                        'Control vs. Treatment Groups',
                        'Statistical Significance',
                        'Multi-variate Testing'
                    ]
                }
            ]
        },
        {
            id: 'advanced',
            title: 'Advanced Techniques',
            topics: [
                {
                    id: 'advanced-regression',
                    name: 'Regression Analysis',
                    subtopics: [
                        'Linear & Multiple Regression',
                        'Logistic Regression',
                        'Ridge & Lasso Regression',
                        'Polynomial Regression',
                        'Regression Diagnostics'
                    ]
                },
                {
                    id: 'advanced-timeseries',
                    name: 'Time Series Analysis',
                    subtopics: [
                        'Trend & Seasonality Decomposition',
                        'Moving Averages & Exponential Smoothing',
                        'ARIMA & SARIMA Models',
                        'Forecasting Techniques',
                        'Anomaly Detection'
                    ]
                },
                {
                    id: 'advanced-ml',
                    name: 'Machine Learning Basics',
                    subtopics: [
                        'Supervised vs. Unsupervised Learning',
                        'Classification Algorithms',
                        'Clustering Techniques',
                        'Model Evaluation Metrics',
                        'Cross-validation & Hyperparameter Tuning'
                    ]
                },
                {
                    id: 'advanced-nlp',
                    name: 'Natural Language Processing',
                    subtopics: [
                        'Text Preprocessing & Tokenization',
                        'Sentiment Analysis',
                        'Text Classification',
                        'Topic Modeling',
                        'Word Embeddings'
                    ]
                },
                {
                    id: 'advanced-bigdata',
                    name: 'Big Data Technologies',
                    subtopics: [
                        'Distributed Computing Concepts',
                        'Hadoop & MapReduce',
                        'Spark Fundamentals',
                        'Data Lakes & Data Warehouses',
                        'Cloud Computing Platforms'
                    ]
                }
            ]
        },
        {
            id: 'soft',
            title: 'Soft Skills',
            topics: [
                {
                    id: 'soft-communication',
                    name: 'Communication',
                    subtopics: [
                        'Translating Technical Concepts for Non-Technical Audiences',
                        'Data Storytelling Techniques',
                        'Executive Summaries & Presentations',
                        'Documentation & Knowledge Sharing',
                        'Effective Email & Written Communication'
                    ]
                },
                {
                    id: 'soft-critical',
                    name: 'Critical Thinking',
                    subtopics: [
                        'Logical Reasoning & Argumentation',
                        'Identifying Biases in Data & Analysis',
                        'Separating Correlation from Causation',
                        'Structured Problem Decomposition',
                        'First Principles Thinking'
                    ]
                },
                {
                    id: 'soft-problemsolving',
                    name: 'Problem-Solving',
                    subtopics: [
                        'Root Cause Analysis',
                        'Solution Evaluation & Prioritization',
                        'Decision-Making Frameworks',
                        'Constraint Optimization',
                        'Dealing with Ambiguity'
                    ]
                },
                {
                    id: 'soft-domain',
                    name: 'Domain Knowledge',
                    subtopics: [
                        'Industry-Specific Metrics & Standards',
                        'Regulatory & Compliance Requirements',
                        'Market & Competitive Analysis',
                        'Technical Domain Language',
                        'Cross-Functional Understanding'
                    ]
                },
                {
                    id: 'soft-stakeholder',
                    name: 'Stakeholder Management',
                    subtopics: [
                        'Requirement Gathering & Clarification',
                        'Managing Expectations',
                        'Delivering Difficult News',
                        'Building Trust & Credibility',
                        'Influence Without Authority'
                    ]
                }
            ]
        }
    ];

    return (
        <div className="font-mono bg-white text-gray-800 min-h-screen p-6">
            <header className="max-w-3xl mx-auto mb-12">
                <h1 className="text-2xl font-bold border-b-2 border-gray-800 pb-3 mb-3">Data Analyst Career Roadmap</h1>
                <p className="text-sm">Essential skills to master before joining the workforce</p>
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
                    <h2 className="text-lg font-bold mt-2">Ready for the Workplace</h2>
                    <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto">
                        With these skills mastered, you're well-prepared to contribute value as a data analyst from day one.
                    </p>
                </motion.div>
            </div>

            <footer className="max-w-3xl mx-auto mt-16 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
                <p>The learning journey continues throughout your career.</p>
            </footer>
        </div>
    );
};

export default MinimalistDataAnalystRoadmap;