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
  // const [tables, setTables] = useState(tableData)
  // const [fields, setFields] = useState(tableData[0])

  const [format, setFormat] = useState<'json' | 'csv' | 'sql'>('json')
  const [activeTable, setActiveTable] = useState<string>('')
  const currentTable = tables.find((t) => t.id === activeTable)
  const currentTableName = currentTable?.name ?? ''
  // const [activeId, setActiveId] = useState(null)

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
    <section className="py-20" id="playground">
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
          {/* <DragDropProvider
            onDragOver={(event) => {
              const { source, target } = event.operation
              if (!source || !target || source.type !== 'field') return

              const sourceTableId = source.data.tableId
              const targetTableId =
                target.type === 'table' ? target.id : target.data?.tableId

              // Prevent endless thrashing updates if we are lingering over unchanged spaces
              if (
                !sourceTableId ||
                !targetTableId ||
                sourceTableId === targetTableId
              )
                return

              // ONLY trigger if the target is different than its current anchor state
              moveFieldToDifferentTable({
                sourceTableId,
                targetTableId,
                sourceFieldId: source.id as string,
                targetFieldId:
                  target.type === 'field' ? (target.id as string) : undefined,
              })
            }}
            onDragEnd={(event) => {
              if (event.canceled) return

              const { source, target } = event.operation
              if (!source || !target) return
              if (!isSortable(source)) return

              const { type, initialIndex, index, group } = source
              if (type === 'table') {
                reorderTable(initialIndex, index)
                return
              }
              if (type === 'field') {
                reorderFieldSameTable(group as string, initialIndex, index)
                const sourceTableId = source.data.tableId
                const targetTableId = source.data.tableId
                moveFieldToDifferentTable({
                  sourceTableId,
                  targetTableId,
                  sourceFieldId: source.id as string,
                  targetFieldId: target.id as string,
                })
              }
            }}
          ></DragDropProvider> */}

          <div className="space-y-5">
            <ScrollArea className=" h-147 2xl:h-170 pr-1">
              <div className="space-y-5 p-2">
                {tables.length ? (
                  tables.map((tb, idx) => (
                    <SchemaCard key={tb.id} tableId={tb.id} index={idx} />
                  ))
                ) : (
                  <p className="text-muted-foreground text-base">
                    No tables found!
                  </p>
                )}
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
