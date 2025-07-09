// src/components/coding/CodeEditor.jsx
import { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'
import { Play, Save, RotateCcw, Settings } from 'lucide-react'
import Button from '@/components/ui/Button'
import { PROGRAMMING_LANGUAGES } from '@/lib/constants'

export default function CodeEditor({
  code,
  onChange,
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
  problem
}) {
  const [theme, setTheme] = useState('light')
  const [fontSize, setFontSize] = useState(14)

  const getLanguageExtension = () => {
    switch (language) {
      case 'python': return python()
      case 'java': return java()
      case 'cpp': return cpp()
      default: return javascript()
    }
  }

  const getStarterCode = (lang) => {
    const starters = {
      javascript: `function solution() {
    // Your code here
    return null;
}`,
      python: `def solution():
    # Your code here
    return None`,
      java: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`
    }
    return starters[lang] || starters.javascript
  }

  const handleLanguageChange = (newLanguage) => {
    onLanguageChange(newLanguage)
    onChange(getStarterCode(newLanguage))
  }

  const handleReset = () => {
    onChange(getStarterCode(language))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {Object.entries(PROGRAMMING_LANGUAGES).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={12}>12px</option>
            <option value={14}>14px</option>
            <option value={16}>16px</option>
            <option value={18}>18px</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative">
        <CodeMirror
          value={code}
          onChange={onChange}
          extensions={[getLanguageExtension()]}
          theme={theme === 'dark' ? oneDark : undefined}
          height="100%"
          style={{
            fontSize: `${fontSize}px`,
            height: '100%'
          }}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            highlightSelectionMatches: false,
            searchKeymap: true
          }}
        />
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-between p-4 border-t bg-gray-50">
        <div className="text-sm text-gray-500">
          Language: {PROGRAMMING_LANGUAGES[language]?.name} | 
          Lines: {code.split('\n').length} | 
          Characters: {code.length}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={onRun}
            disabled={isRunning || !problem}
            loading={isRunning}
            className="flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Run Code</span>
          </Button>

          <Button
            onClick={onSubmit}
            disabled={isSubmitting || !problem}
            loading={isSubmitting}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Submit</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
