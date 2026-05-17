import { Card, CardContent } from './ui/card'
import PreviewHeader from './PreviewHeader'
import { useTableStore } from '#/app/store'
import { ScrollArea } from './ui/scroll-area'
import { useEffect, useMemo, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  dracula,
  lightfair,
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { toCSV, toSQL } from '#/lib/generator'

const PreviewPanel = () => {
  const { data, tables } = useTableStore()
  const theme = localStorage.getItem("theme");

  const [format, setFormat] = useState<'json' | 'csv' | 'sql'>('json')
  const [activeTable, setActiveTable] = useState<string>('')

  useEffect(() => {
    if (tables.length > 0 && !activeTable) {
      setActiveTable(tables[0].id)
    }
  }, [tables, activeTable])

  const currentTable = tables.find((t) => t.id === activeTable)
  const currentTableName = currentTable?.name ?? ''
  const currentData = data[currentTableName] ?? []

  const text = useMemo(() => {
    if (!currentData.length) return ''
    if (format === 'json') {
      return JSON.stringify(currentData, null, 2)
    }

    if (format === 'csv') return toCSV(currentData)
    return toSQL(activeTable, currentData)
  }, [currentData, format, activeTable])

  return (
    <div className="space-y-5">
      <PreviewHeader
        format={format}
        setFormat={setFormat}
        activeTable={activeTable}
        setActiveTable={setActiveTable}
        text={text}
      />
      <Card className="p-0">
        <CardContent className="p-0">
          <ScrollArea className="h-170">
            {text && format !== 'csv' && (
              <SyntaxHighlighter
                language={format}
                wrapLongLines
                style={theme === "light" ? lightfair: dracula}
              >
                {text}
              </SyntaxHighlighter>
            )}
            {text && format === 'csv' && <div className="p-4">{text}</div>}
            {!text && (
              <div className="p-3 text-muted-foreground">
                No data — add fields and click Generate.
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreviewPanel
