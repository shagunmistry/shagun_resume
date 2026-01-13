'use client'

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import {
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  X,
  Upload,
  Clock,
  AlertCircle,
  Info,
  AlertTriangle,
  Bug,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Check,
} from 'lucide-react'

const SAMPLE_LOGS = `2026-01-13 09:00:46.227 -05:00 [INF] Processing attachment: 111040.01.001 Inv#58520.pdf application/pdf
2026-01-13 09:00:46.239 -05:00 [INF] Processing attachment file: 111040.01.001 Inv#58520.pdf, Size: 1499550 bytes (1.43 MB)
2026-01-13 09:00:46.258 -05:00 [INF] Processing attachment: Milestone Schedule Inv#58520.pdf application/pdf
2026-01-13 09:00:46.260 -05:00 [INF] Processing attachment file: Milestone Schedule Inv#58520.pdf, Size: 107312 bytes (0.1 MB)
2026-01-13 09:00:46.266 -05:00 [INF] Combining PDFs - Base file: C:\\temp\\sweep-temp\\prod\\97b0e3b4-19d2-493a-ab94-11c1e4cd7b7c\\d76e6b25f69b4b50ab2af1eb30e36b2b_pdfEmail.pdf, Size: 6.02 MB
2026-01-13 09:00:46.266 -05:00 [INF] Total size of files to combine: 7.36 MB (3 files)
2026-01-13 09:00:48.173 -05:00 [INF] Combined PDF created C:\\temp\\sweep-temp\\prod\\97b0e3b4-19d2-493a-ab94-11c1e4cd7b7c\\70f3c1c50f114ca995706af35bd32d57-combined.pdf, Final size: 0.51 MB
2026-01-13 09:00:48.179 -05:00 [WRN] Warning: Large file detected, processing may take longer
2026-01-13 09:00:48.179 -05:00 [INF] Check if the package has files to analyze...
2026-01-13 09:00:48.179 -05:00 [INF] Looking for values to extract, calling ExtractValuesFromPDF...
2026-01-13 09:00:48.179 -05:00 [INF] Processing invoice with Azure Document Intelligence
2026-01-13 09:00:48.179 -05:00 [INF] Attempting to trim PDF before processing...
2026-01-13 09:00:48.180 -05:00 [DBG] Debug: PDF trim parameters initialized
2026-01-13 09:00:48.180 -05:00 [INF] BasicTrimPDF called with FrontTrim=5, BackTrim=10
2026-01-13 09:00:48.181 -05:00 [INF] PDF has 7 pages. Minimum for trimming: 15
2026-01-13 09:00:48.181 -05:00 [INF] PDF has 7 pages, which is not enough to trim (needs more than 15). Returning null.
2026-01-13 09:00:48.181 -05:00 [INF] PDF does not need trimming, using original file
2026-01-13 09:00:55.049 -05:00 [INF] Extracted content length: 17957 characters
2026-01-13 09:00:55.137 -05:00 [ERR] Error: Failed to connect to secondary service endpoint
2026-01-13 09:00:55.137 -05:00 [INF] Estimated content tokens: 6015, Max allowed: 3150
2026-01-13 09:00:55.137 -05:00 [INF] Content exceeds token limit, using chunked processing
2026-01-13 09:00:55.137 -05:00 [INF] Starting chunked invoice analysis with context-carrying
2026-01-13 09:00:55.319 -05:00 [INF] Extracted document header: 174 tokens
2026-01-13 09:00:55.319 -05:00 [INF] Splitting content into chunks with max 2926 tokens per chunk, 150 token overlap
2026-01-13 09:00:55.320 -05:00 [INF] Split content into 2 verified chunks with overlap
2026-01-13 09:00:55.320 -05:00 [INF] Split document into 2 chunks for processing
2026-01-13 09:00:55.320 -05:00 [INF] Starting chunk processing. Token budget: 60000/60000 available
2026-01-13 09:00:55.400 -05:00 [INF] Processing chunk 1/2 (~3353 content tokens, ~4977 total)
2026-01-13 09:00:55.400 -05:00 [INF] Analyzing document with OpenAI LLM`

type LogEntry = {
  id: number
  timestamp: string | null
  timezone: string | null
  level: string
  message: string
  raw: string
}

const LOG_LEVELS: Record<string, {
  label: string
  color: string
  bg: string
  border: string
  icon: typeof Info
}> = {
  INF: {
    label: 'Info',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    icon: Info,
  },
  WRN: {
    label: 'Warning',
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    icon: AlertTriangle,
  },
  ERR: {
    label: 'Error',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    icon: AlertCircle,
  },
  DBG: {
    label: 'Debug',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    icon: Bug,
  },
  FTL: {
    label: 'Fatal',
    color: 'text-rose-500',
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30',
    icon: AlertCircle,
  },
  VRB: {
    label: 'Verbose',
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/30',
    icon: Info,
  },
}

const parseLogLine = (line: string, index: number) => {
  const regex =
    /^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})\s+([+-]\d{2}:\d{2})\s+\[(\w+)\]\s+(.*)$/
  const match = line.match(regex)

  if (match) {
    return {
      id: index,
      timestamp: match[1],
      timezone: match[2],
      level: match[3],
      message: match[4],
      raw: line,
    }
  }

  return {
    id: index,
    timestamp: null,
    timezone: null,
    level: 'UNK',
    message: line,
    raw: line,
  }
}

const LogLevelBadge = ({ level }: { level: string }) => {
  const config = LOG_LEVELS[level] || {
    label: level,
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/30',
    icon: Info,
  }
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${config.bg} ${config.color} ${config.border} border`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  )
}

const HighlightedText = ({ text, searchTerm }: { text: string; searchTerm: string }) => {
  if (!searchTerm) return <span>{text}</span>

  const parts = text.split(
    new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
  )

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark
            key={i}
            className="rounded bg-yellow-500/40 px-0.5 text-yellow-200"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  )
}

const LogEntryComponent = ({ log, searchTerm, isSelected, onClick, lineNumber }: {
  log: LogEntry
  searchTerm: string
  isSelected: boolean
  onClick: () => void
  lineNumber: number
}) => {
  const config = LOG_LEVELS[log.level] || {
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
  }

  return (
    <div
      onClick={onClick}
      className={`group flex cursor-pointer items-start gap-3 border-b border-gray-800/50 px-4 py-2 transition-colors hover:bg-gray-800/50 ${isSelected ? 'border-l-2 border-l-blue-500 bg-blue-900/30' : ''}`}
    >
      <span className="w-12 flex-shrink-0 pt-1 text-right font-mono text-xs text-gray-600">
        {lineNumber}
      </span>
      {log.timestamp && (
        <span className="w-28 flex-shrink-0 pt-1 font-mono text-xs text-gray-500">
          {log.timestamp.split(' ')[1]}
        </span>
      )}
      <div className="flex-shrink-0 pt-0.5">
        <LogLevelBadge level={log.level} />
      </div>
      <div className={`flex-1 font-mono text-sm ${config.color} break-all`}>
        <HighlightedText text={log.message} searchTerm={searchTerm} />
      </div>
    </div>
  )
}

const FilterButton = ({ active, onClick, count, label, color }: {
  active: boolean
  onClick: () => void
  count: number
  label: string
  color: string
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
      active
        ? `${color} ring-1 ring-current`
        : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
    }`}
  >
    {label}
    <span
      className={`rounded px-1.5 py-0.5 text-xs ${active ? 'bg-white/20' : 'bg-gray-700'}`}
    >
      {count}
    </span>
  </button>
)

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between border-t border-gray-800 bg-gray-900/50 px-4 py-3">
      <span className="text-sm text-gray-500">
        Showing{' '}
        <span className="text-gray-300">
          {startItem}-{endItem}
        </span>{' '}
        of <span className="text-gray-300">{totalItems}</span> logs
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="rounded p-1.5 text-gray-400 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronsLeft size={18} />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded p-1.5 text-gray-400 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="px-3 py-1 text-sm text-gray-300">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded p-1.5 text-gray-400 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded p-1.5 text-gray-400 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  )
}

export default function LogViewer() {
  const [rawLogs, setRawLogs] = useState(SAMPLE_LOGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState(new Set<string>())
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLog, setSelectedLog] = useState<number | null>(null)
  const [showPasteModal, setShowPasteModal] = useState(false)
  const [pasteContent, setPasteContent] = useState('')
  const [jumpToLine, setJumpToLine] = useState('')
  const [copied, setCopied] = useState(false)
  const logContainerRef = useRef<HTMLDivElement>(null)

  const ITEMS_PER_PAGE = 100

  const parsedLogs = useMemo(() => {
    return rawLogs
      .split('\n')
      .filter((line) => line.trim())
      .map(parseLogLine)
  }, [rawLogs])

  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    parsedLogs.forEach((log) => {
      counts[log.level] = (counts[log.level] || 0) + 1
    })
    return counts
  }, [parsedLogs])

  const filteredLogs = useMemo(() => {
    return parsedLogs.filter((log) => {
      const matchesSearch =
        !searchTerm ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.timestamp && log.timestamp.includes(searchTerm))
      const matchesFilter =
        activeFilters.size === 0 || activeFilters.has(log.level)
      return matchesSearch && matchesFilter
    })
  }, [parsedLogs, searchTerm, activeFilters])

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredLogs.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredLogs, currentPage])

  const toggleFilter = (level: string) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev)
      if (newFilters.has(level)) {
        newFilters.delete(level)
      } else {
        newFilters.add(level)
      }
      return newFilters
    })
    setCurrentPage(1)
  }

  const handlePaste = () => {
    if (pasteContent.trim()) {
      setRawLogs(pasteContent)
      setShowPasteModal(false)
      setPasteContent('')
      setCurrentPage(1)
      setSelectedLog(null)
    }
  }

  const handleJumpToLine = () => {
    const lineNum = parseInt(jumpToLine)
    if (lineNum > 0 && lineNum <= filteredLogs.length) {
      const page = Math.ceil(lineNum / ITEMS_PER_PAGE)
      setCurrentPage(page)
      setSelectedLog(filteredLogs[lineNum - 1]?.id)
    }
    setJumpToLine('')
  }

  const copySelectedLog = () => {
    if (selectedLog !== null) {
      const log = parsedLogs.find((l) => l.id === selectedLog)
      if (log) {
        navigator.clipboard.writeText(log.raw)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && selectedLog !== null) {
        e.preventDefault()
        const currentIdx = paginatedLogs.findIndex((l) => l.id === selectedLog)
        if (currentIdx < paginatedLogs.length - 1) {
          setSelectedLog(paginatedLogs[currentIdx + 1].id)
        } else if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1)
        }
      } else if (e.key === 'ArrowUp' && selectedLog !== null) {
        e.preventDefault()
        const currentIdx = paginatedLogs.findIndex((l) => l.id === selectedLog)
        if (currentIdx > 0) {
          setSelectedLog(paginatedLogs[currentIdx - 1].id)
        } else if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1)
        }
      } else if (
        e.key === 'c' &&
        (e.ctrlKey || e.metaKey) &&
        selectedLog !== null
      ) {
        copySelectedLog()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedLog, paginatedLogs, currentPage, totalPages])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900">
        <div className="px-4 py-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Filter size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Log Viewer</h1>
                <p className="text-sm text-gray-500">
                  {parsedLogs.length.toLocaleString()} total logs
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPasteModal(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-500"
            >
              <Upload size={16} />
              Paste Logs
            </button>
          </div>

          {/* Search and Jump */}
          <div className="mb-4 flex gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2.5 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Go to line..."
                value={jumpToLine}
                onChange={(e) =>
                  setJumpToLine(e.target.value.replace(/\D/g, ''))
                }
                onKeyDown={(e) => e.key === 'Enter' && handleJumpToLine()}
                className="w-32 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleJumpToLine}
                className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm transition-colors hover:bg-gray-700"
              >
                Jump
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(LOG_LEVELS).map(
              ([level, config]) =>
                levelCounts[level] > 0 && (
                  <FilterButton
                    key={level}
                    active={activeFilters.has(level)}
                    onClick={() => toggleFilter(level)}
                    count={levelCounts[level] || 0}
                    label={config.label}
                    color={config.color}
                  />
                ),
            )}
            {activeFilters.size > 0 && (
              <button
                onClick={() => {
                  setActiveFilters(new Set())
                  setCurrentPage(1)
                }}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-800 hover:text-gray-300"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Log List */}
      <div ref={logContainerRef} className="divide-y divide-gray-800/50">
        {paginatedLogs.length > 0 ? (
          paginatedLogs.map((log, idx) => (
            <LogEntryComponent
              key={log.id}
              log={log}
              searchTerm={searchTerm}
              isSelected={selectedLog === log.id}
              onClick={() => setSelectedLog(log.id)}
              lineNumber={(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <AlertCircle size={48} className="mb-4 opacity-50" />
            <p className="text-lg">No logs match your criteria</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredLogs.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredLogs.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}

      {/* Selected Log Detail Bar */}
      {selectedLog !== null && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-700 bg-gray-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="flex-shrink-0 text-sm text-gray-500">
                Selected:
              </span>
              <code className="truncate text-sm text-gray-300">
                {parsedLogs.find((l) => l.id === selectedLog)?.raw}
              </code>
            </div>
            <button
              onClick={copySelectedLog}
              className="ml-4 flex flex-shrink-0 items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 text-sm hover:bg-gray-700"
            >
              {copied ? (
                <Check size={14} className="text-green-400" />
              ) : (
                <Copy size={14} />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {/* Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="flex max-h-[80vh] w-full max-w-4xl flex-col rounded-2xl border border-gray-700 bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-700 p-4">
              <h2 className="text-lg font-semibold">Paste Your Logs</h2>
              <button
                onClick={() => {
                  setShowPasteModal(false)
                  setPasteContent('')
                }}
                className="rounded p-1 hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <textarea
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
                placeholder="Paste your log content here..."
                className="h-full min-h-[300px] w-full resize-none rounded-lg border border-gray-700 bg-gray-950 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-700 p-4">
              <button
                onClick={() => {
                  setShowPasteModal(false)
                  setPasteContent('')
                }}
                className="px-4 py-2 text-gray-400 hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handlePaste}
                disabled={!pasteContent.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Load Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 right-4 rounded-lg border border-gray-800 bg-gray-900/80 px-3 py-2 text-xs text-gray-600">
        <span className="text-gray-500">↑↓</span> Navigate •{' '}
        <span className="text-gray-500">⌘C</span> Copy selected
      </div>
    </div>
  )
}
