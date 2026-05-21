import { useShallow } from 'zustand/shallow'
import SchemaCard from './SchemaCard'
import { useTableStore } from '#/app/store'
import { ScrollArea } from './ui/scroll-area'
import { useEffect, useMemo, useState } from 'react'
import PreviewPanel from './PreviewPanel'
import PlaygroundHeader from './PlaygroundHeader'

const Playground = () => {
  const { tables } = useTableStore(
    useShallow((state) => ({ tables: state.tables })),
  )
  const csv = useTableStore((state) => state.csv)
  const json = useTableStore((state) => state.json)
  const sql = useTableStore((state) => state.sql)

  const [format, setFormat] = useState<'json' | 'csv' | 'sql'>('json')
  const [activeTable, setActiveTable] = useState<string>('')
  const currentTable = tables.find((t) => t.id === activeTable)
  const currentTableName = currentTable?.name ?? ''

  useEffect(() => {
    if (tables.length > 0 && !activeTable) {
      setActiveTable(tables[0].id)
    }
  }, [tables, activeTable])

  const text = useMemo(() => {
    if (format === 'json') {
      return json[currentTableName]
    }
    if (format === 'csv') {
      return csv[currentTableName]
    }

    if (format === 'sql') {
      return sql[currentTableName]
    }
    return ''
  }, [format, currentTableName, sql, json, csv])


  return (
    <section
      
      className="py-20"
      id="playground"
    >
      <div className="container mx-auto relative border  bg-card rounded-2xl min-h-[calc(100vh-160px)] 2xl:min-h-[calc(100vh-190px)] h-full overflow-hidden">
        <PlaygroundHeader
        format={format}
        currentTableName={currentTableName}
        setFormat={setFormat}
        text={text}
        setActiveTable={setActiveTable}
        activeTable={activeTable}
      />

        <div className="grid grid-cols-2 gap-5 px-4 pt-3">
          <div className="space-y-5">
            <ScrollArea className=" h-147 2xl:h-170 pr-1">
              <div className="space-y-5 p-2">
                {tables.length ? tables.map((tb) => (
                  <SchemaCard key={tb.id} tableId={tb.id} />
                )) : <p className='text-muted-foreground text-base'>No tables found!</p>}
              </div>
            </ScrollArea>
          </div>

          <PreviewPanel
            format={format}
            text={text}
            currentTableName={currentTableName}
          />
        </div>
      </div>
    </section>
  )
}

export default Playground
