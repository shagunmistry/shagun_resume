'use client'
import React, { useState, useEffect } from 'react'
import {
  AlertCircle,
  Upload,
  Save,
  Plus,
  Trash2,
  Key,
  Eye,
  Table,
  FileText,
  Play,
} from 'lucide-react'

// Define field interface
interface FieldDefinition {
  name: string
  start: number
  length: number
  isKey: boolean
}

// Define parsed record interface with index signature
interface ParsedRecord {
  _lineNumber: number
  [key: string]: string | number
}

// Sample data for demonstration
const EXAMPLE_DATA = `CUS0000123JOHN          SMITH               20221014000012543.75ACT
CUS0000124JANE          DOE                 20230225000001250.00ACT
CUS0000125ROBERT        JOHNSON             20220630000000750.50INA
CUS0000126SARAH         WILLIAMS            20230110000010000.25ACT
CUS0000127MICHAEL       BROWN               20221128000005432.80ACT
CUS0000128EMILY         JONES               20230301000000089.99INA
CUS0000129DAVID         GARCIA              20221205000002341.60ACT
CUS0000130JENNIFER      MARTINEZ            20230218000003500.00ACT
CUS0000131WILLIAM       ANDERSON            20220815000000000.00SUS
CUS0000132ELIZABETH     TAYLOR              20230405000008765.43ACT
CUS0000133CHRISTOPHER   THOMAS              20221020000004321.00ACT
CUS0000134ASHLEY        ROBINSON            20230119000000650.75INA
CUS0000135MATTHEW       WHITE               20220925000007890.25ACT`

// Sample field definitions that match the example data
const EXAMPLE_FIELDS: FieldDefinition[] = [
  { name: 'Customer ID', start: 1, length: 10, isKey: true },
  { name: 'First Name', start: 11, length: 15, isKey: false },
  { name: 'Last Name', start: 26, length: 20, isKey: false },
  { name: 'Registration Date', start: 46, length: 8, isKey: false },
  { name: 'Account Balance', start: 54, length: 12, isKey: false },
  { name: 'Status', start: 66, length: 3, isKey: false },
]

// Main component for the Fixed Length File Parser application
export default function FixedLengthParser() {
  // State for file and parsing
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [fileName, setFileName] = useState('sample_customer_data.txt')
  const [fields, setFields] = useState<FieldDefinition[]>(EXAMPLE_FIELDS)
  const [parsedData, setParsedData] = useState<ParsedRecord[]>([])
  const [previewLines, setPreviewLines] = useState(
    EXAMPLE_DATA.split('\n').slice(0, 5),
  )
  const [activeTab, setActiveTab] = useState('definition')
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showingExample, setShowingExample] = useState(true)

  // Load example data
  useEffect(() => {
    if (showingExample) {
      setFileContent(EXAMPLE_DATA)
    }
  }, [showingExample])

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const selectedFile = files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setError('')
      setShowingExample(false)

      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          const content = e.target.result
          setFileContent(content)

          // Preview first 5 lines
          const lines = content.split('\n').slice(0, 5)
          setPreviewLines(lines)
        }
      }
      reader.onerror = () => {
        setError('Failed to read the file. Please try again.')
      }
      reader.readAsText(selectedFile)
    }
  }

  // Add a new field definition
  const addField = () => {
    const newField: FieldDefinition = {
      name: `Field ${fields.length + 1}`,
      start: 1,
      length: 10,
      isKey: false,
    }
    setFields([...fields, newField])
  }

  // Remove a field
  const removeField = (index: number) => {
    const updatedFields = [...fields]
    updatedFields.splice(index, 1)
    setFields(updatedFields)
  }

  // Update field properties
  const updateField = (
    index: number,
    property: keyof FieldDefinition,
    value: string | number | boolean,
  ) => {
    const updatedFields = [...fields]

    if (property === 'start' || property === 'length') {
      value = parseInt(value as string, 10) || 1
    }

    updatedFields[index] = {
      ...updatedFields[index],
      [property]: value,
    }

    setFields(updatedFields)
  }

  // Toggle a field as a key field
  const toggleKeyField = (index: number) => {
    const updatedFields = [...fields]
    updatedFields[index] = {
      ...updatedFields[index],
      isKey: !updatedFields[index].isKey,
    }
    setFields(updatedFields)
  }

  // Load example data - automatically parse it
  useEffect(() => {
    if (showingExample && fileContent === EXAMPLE_DATA) {
      parseFile()
    }
  }, [fileContent])

  // Parse the file based on field definitions
  const parseFile = () => {
    if (!fileContent) {
      setError('Please upload a file first.')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      const lines = fileContent.split('\n')
      const parsedLines: ParsedRecord[] = []

      // Process each line in the file
      lines.forEach((line, lineIndex) => {
        if (line.trim() === '') return // Skip empty lines

        const record: ParsedRecord = { _lineNumber: lineIndex + 1 }

        // Extract data based on field definitions
        fields.forEach((field) => {
          // Adjust for 0-based indexing
          const startIndex = field.start - 1
          const endIndex = startIndex + field.length

          // Extract the value based on position and length
          if (startIndex < line.length) {
            const value = line.substring(startIndex, endIndex).trim()
            record[field.name] = value
          } else {
            record[field.name] = ''
          }
        })

        parsedLines.push(record)
      })

      setParsedData(parsedLines)
      setActiveTab('results')
      setIsProcessing(false)
    } catch (err) {
      setError('Failed to parse the file. Please check your field definitions.')
      setIsProcessing(false)
    }
  }

  // Export parsed data as JSON
  const exportJson = () => {
    if (parsedData.length === 0) {
      setError('No data to export.')
      return
    }

    const dataStr = JSON.stringify(parsedData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName.split('.')[0]}_parsed.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Export parsed data as CSV
  const exportCsv = () => {
    if (parsedData.length === 0) {
      setError('No data to export.')
      return
    }

    // Get all field names
    const headers = Object.keys(parsedData[0]).filter(
      (key) => key !== '_lineNumber',
    )

    // Create CSV header row
    let csvContent = headers.join(',') + '\n'

    // Add data rows
    parsedData.forEach((record) => {
      const row = headers.map((header) => {
        let value = record[header]?.toString() || ''
        // Escape commas and quotes
        if (value.includes(',') || value.includes('"')) {
          value = `"${value.replace(/"/g, '""')}"`
        }
        return value
      })
      csvContent += row.join(',') + '\n'
    })

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName.split('.')[0]}_parsed.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="flex items-center text-2xl font-bold">
            <FileText className="mr-2" /> Fixed Length File Parser
          </h1>
          <p className="text-blue-100">
            Upload, parse, and analyze fixed length files with ease
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto flex-grow p-4">
        {/* Introduction section - only shows initially */}
        {showingExample && (
          <div className="mb-6 border-l-4 border-blue-500 bg-blue-50 p-4">
            <h2 className="mb-2 text-lg font-semibold text-blue-800">
              Example Data Loaded
            </h2>
            <p className="mb-3 text-blue-700">
              This application has been pre-populated with example customer data
              in fixed-length format.
            </p>
            <p className="mb-3 text-blue-700">
              The field definitions have already been set up to match the sample
              data format. Feel free to explore the interface, modify the field
              definitions, and parse the data!
            </p>
            <p className="text-blue-700">
              You can upload your own file at any time using the file upload
              section below.
            </p>
          </div>
        )}

        {/* File upload section */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center text-xl font-semibold">
            <Upload className="mr-2 text-blue-600" size={20} />
            Upload File
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-grow">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Select a fixed length file:
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-md file:border-0
                  file:bg-blue-50 file:px-4
                  file:py-2 file:text-sm
                  file:font-semibold file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            <div className="flex items-end">
              {showingExample ? (
                <div className="flex items-center text-sm italic text-gray-600">
                  <span className="mr-2">Using example data:</span>
                  <span className="font-medium">sample_customer_data.txt</span>
                </div>
              ) : (
                fileName && (
                  <span className="text-sm italic text-gray-600">
                    Current file: {fileName}
                  </span>
                )
              )}
            </div>
          </div>

          {previewLines.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-1 text-sm font-medium text-gray-700">
                File Preview (first 5 lines):
              </h3>
              <div className="overflow-x-auto rounded border border-gray-200 bg-gray-50 p-3">
                <pre className="font-mono text-xs text-gray-800">
                  {previewLines.map((line, i) => (
                    <div key={i} className="mb-1">
                      {line}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Tabs for Definition/Results */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('definition')}
                className={`border-b-2 px-6 py-4 text-center text-sm font-medium ${
                  activeTab === 'definition'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <Eye className="mr-2" size={16} />
                  Field Definition
                </div>
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`border-b-2 px-6 py-4 text-center text-sm font-medium ${
                  activeTab === 'results'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                disabled={parsedData.length === 0}
              >
                <div className="flex items-center">
                  <Table className="mr-2" size={16} />
                  Results {parsedData.length > 0 && `(${parsedData.length})`}
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Field Definition Tab */}
        {activeTab === 'definition' && (
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Define Fields</h2>
              <button
                onClick={addField}
                className="flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100"
              >
                <Plus size={16} className="mr-1" /> Add Field
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <th className="border-b px-4 py-2">Field Name</th>
                    <th className="border-b px-4 py-2">Start Position</th>
                    <th className="border-b px-4 py-2">Length</th>
                    <th className="border-b px-4 py-2">Key Field</th>
                    <th className="border-b px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={field.name}
                          onChange={(e) =>
                            updateField(index, 'name', e.target.value)
                          }
                          className="w-full rounded border px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={field.start}
                          onChange={(e) =>
                            updateField(index, 'start', e.target.value)
                          }
                          min="1"
                          className="w-20 rounded border px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={field.length}
                          onChange={(e) =>
                            updateField(index, 'length', e.target.value)
                          }
                          min="1"
                          className="w-20 rounded border px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => toggleKeyField(index)}
                          className={`flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            field.isKey
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <Key size={14} className="mr-1" />
                          {field.isKey ? 'Yes' : 'No'}
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => removeField(index)}
                          className="text-red-600 hover:text-red-800"
                          title="Remove field"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={parseFile}
                disabled={isProcessing || !fileContent}
                className={`flex items-center justify-center rounded-md px-4 py-2 font-medium ${
                  !fileContent
                    ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                    : isProcessing
                      ? 'cursor-wait bg-blue-300 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Play size={16} className="mr-2" />
                {isProcessing ? 'Processing...' : 'Parse File'}
              </button>

              {error && (
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle size={16} className="mr-1" /> {error}
                </div>
              )}

              {showingExample && !parsedData.length && (
                <div className="flex items-center text-sm text-green-600">
                  <span>
                    Example data is ready to parse! Click "Parse File" to see
                    results.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Parsed Results</h2>
              <div className="flex gap-2">
                <button
                  onClick={exportJson}
                  disabled={parsedData.length === 0}
                  className={`flex items-center rounded-md px-3 py-1.5 text-sm font-medium ${
                    parsedData.length === 0
                      ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <Save size={16} className="mr-1" /> Export JSON
                </button>
                <button
                  onClick={exportCsv}
                  disabled={parsedData.length === 0}
                  className={`flex items-center rounded-md px-3 py-1.5 text-sm font-medium ${
                    parsedData.length === 0
                      ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Save size={16} className="mr-1" /> Export CSV
                </button>
              </div>
            </div>

            {parsedData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Line #
                      </th>
                      {fields.map((field, index) => (
                        <th
                          key={index}
                          className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          <div className="flex items-center">
                            {field.name}
                            {field.isKey && (
                              <Key size={12} className="ml-1 text-blue-600" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {parsedData.slice(0, 100).map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-500">
                          {record._lineNumber}
                        </td>
                        {fields.map((field, fieldIndex) => (
                          <td
                            key={fieldIndex}
                            className={`whitespace-nowrap px-4 py-2 text-sm ${
                              field.isKey
                                ? 'font-medium text-blue-800'
                                : 'text-gray-900'
                            }`}
                          >
                            {record[field.name] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {parsedData.length > 100 && (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Showing 100 of {parsedData.length} records. Export to see
                    all data.
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No data available. Please parse a file first.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
