import { Card, CardContent } from './ui/card'

import PreviewHeader from './PreviewHeader'
import { useTableStore } from '#/app/store'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const PreviewPanel = () => {
  const { data, tables } = useTableStore()
  const [activeTable, setActiveTable] = useState(tables[0]?.name ?? '')

  return (
    <div className="space-y-3">
      <PreviewHeader
        activeTable={activeTable}
        setActiveTable={setActiveTable}
      />
      <Card className="p-0">
        <CardContent className="p-0">
          <ScrollArea className="h-120 rounded-xl ">
            {(data[activeTable] || activeTable === 'all') && (
              <SyntaxHighlighter
                className="rounded-xl"
                language="json"
                style={dracula}
              >
                {JSON.stringify(
                  activeTable === 'all' ? data : data[activeTable],
                  null,
                  2,
                )}
              </SyntaxHighlighter>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreviewPanel
