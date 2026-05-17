import { Card, CardContent } from './ui/card'

import PreviewHeader from './PreviewHeader'
import { useTableStore } from '#/app/store'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { useMemo, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { toCSV, toSQL } from '#/lib/generator'

const PreviewPanel = () => {
  const { data, tables } = useTableStore()
  const [format, setFormat] = useState<'json' | 'csv' | 'sql'>('json')
  const [activeTable, setActiveTable] = useState(tables[0]?.name ?? '')

  const current = activeTable && data[activeTable] ? data[activeTable] : []

  const text = useMemo(() => {
    if (!current.length) return ''
    if (format === 'json') return JSON.stringify(current, null, 2)
    if (format === 'csv') return toCSV(current)
    return toSQL(activeTable, current)
  }, [current, format, activeTable])

  return (
    <div className="space-y-3">
      <PreviewHeader
        format={format}
        setFormat={setFormat}
        activeTable={activeTable}
        setActiveTable={setActiveTable}
      />
      <Card className="p-0">
        <CardContent className="p-0">
          <ScrollArea className="h-120 rounded-xl overflow-y-scroll ">
            {text && format !== 'csv' && (
              <SyntaxHighlighter
                className="rounded-xl p-2!"
                language="json"
                style={dracula}
              >
                {text}
              </SyntaxHighlighter>
            )}

            {format === 'csv' && <div className='p-4'>{text}</div>}

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
