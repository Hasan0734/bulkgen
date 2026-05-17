import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { Download, Wand2 } from 'lucide-react'
import CopyButton from './ui/copy-button'
import { useTableStore } from '#/app/store'

const PreviewHeader = () => {
  const { tables, generateData } = useTableStore()
  const [format, setFormat] = useState<'json' | 'csv' | 'sql'>('json')
  const [activeTable, setActiveTable] = useState(tables[0]?.id ?? '')

  return (
    <div className="flex justify-between items-center">
      <Select
        defaultValue={activeTable}
        onValueChange={(e) => setActiveTable(e)}
      >
        <SelectTrigger className="bg-card!">
          <SelectValue placeholder="Select table" />
        </SelectTrigger>
        <SelectContent>
          {tables.map((item) => (
            <SelectItem value={item.id}>{item.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-3 items-center flex-wrap">
        <Tabs
          value={format}
          onValueChange={(v) => setFormat(v as typeof format)}
        >
          <TabsList className="h-9! bg-card px-2">
            <TabsTrigger className="px-2" value="json">
              JSON
            </TabsTrigger>
            <TabsTrigger className="px-2" value="csv">
              CSV
            </TabsTrigger>
            <TabsTrigger className="px-2" value="sql">
              SQL
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <CopyButton content="hello world" />

        <Button onClick={() => generateData()} size={'lg'} className="rounded-lg ">
          <Wand2 /> Generate
        </Button>
        <Button size={'lg'} className="rounded-lg">
          <Download /> Export
        </Button>
      </div>
    </div>
  )
}

export default PreviewHeader
