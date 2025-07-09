// src/lib/constants.js
export const PROGRAMMING_LANGUAGES = {
  javascript: {
    name: 'JavaScript',
    extension: 'js',
    codemirrorMode: 'javascript'
  },
  python: {
    name: 'Python',
    extension: 'py',
    codemirrorMode: 'python'
  },
  java: {
    name: 'Java',
    extension: 'java',
    codemirrorMode: 'java'
  },
  cpp: {
    name: 'C++',
    extension: 'cpp',
    codemirrorMode: 'cpp'
  }
}

export const DIFFICULTY_LEVELS = {
  easy: { name: 'Easy', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  medium: { name: 'Medium', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  hard: { name: 'Hard', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' }
}

export const PROBLEM_CATEGORIES = {
  arrays: 'Arrays',
  strings: 'Strings',
  linkedlist: 'Linked Lists',
  trees: 'Trees',
  graphs: 'Graphs',
  'dynamic-programming': 'Dynamic Programming',
  sorting: 'Sorting',
  searching: 'Searching'
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  CODING: '/coding',
  INTERVIEWS: '/interviews',
  ANALYTICS: '/analytics',
  PROFILE: '/profile'
}
