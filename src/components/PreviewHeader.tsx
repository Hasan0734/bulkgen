import {  type Dispatch, type SetStateAction } from 'react'
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

interface PreviewHeaderProps {
  activeTable: string
  setActiveTable: Dispatch<SetStateAction<string>>
  format: 'json' | 'csv' | 'sql'
  setFormat: Dispatch<SetStateAction<'json' | 'csv' | 'sql'>>
  text: string
}

const PreviewHeader = ({
  activeTable,
  setActiveTable,
  format,
  setFormat,
  text,
}: PreviewHeaderProps) => {
  const { generateData, tables } = useTableStore()

  const ext = format === 'json' ? 'json' : format === 'csv' ? 'csv' : 'sql'
  const mime =
    format === 'json'
      ? 'application/json'
      : format === 'csv'
        ? 'text/csv'
        : 'text/plain'

  const handleExport = () => {
    const blob = new Blob([text], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTable}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex justify-between items-center">
      <Select value={activeTable} onValueChange={(e) => setActiveTable(e)}>
        <SelectTrigger className="bg-card! min-w-28 max-w-32">
          <SelectValue placeholder="Select table" />
        </SelectTrigger>
        <SelectContent className='min-w-28 max-w-32'>
          {tables.map((table) => (
            <SelectItem key={table.id} value={table.id}>
              {table.name}
            </SelectItem>
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

        <Button
          onClick={() => generateData()}
          size={'lg'}
          className="rounded-lg "
        >
          <Wand2 /> Generate
        </Button>
        <Button
          disabled={!text}
          onClick={handleExport}
          size={'lg'}
          className="rounded-lg"
        >
          <Download /> Export
        </Button>
      </div>
    </div>
  )
}

export default PreviewHeader
