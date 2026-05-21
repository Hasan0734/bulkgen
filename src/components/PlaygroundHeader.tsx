import  { type Dispatch, type SetStateAction } from 'react'
import WindowControll from './WindowControll'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import PreviewHeader from './PreviewHeader'
import { useTableStore } from '#/app/store'

interface PropsType {
  activeTable: string
  setActiveTable: Dispatch<SetStateAction<string>>
  format: 'json' | 'csv' | 'sql'
  setFormat: Dispatch<SetStateAction<'json' | 'csv' | 'sql'>>
  currentTableName: string
  text: string
}

const PlaygroundHeader = ({
  format,
  setFormat,
  activeTable,
  setActiveTable,
  currentTableName,
  text
}: PropsType) => {
  const addTable = useTableStore((state) => state.addTable)

  return (
    <div className=" z-40 top-0  w-full flex items-center gap-5 py-2 px-3 bg-secondary">
      <WindowControll />
      <div className="flex items-center w-full justify-between">
        <div className="flex gap-4 items-center">
          <h3 className="text-xl font-semibold">Table</h3>

          <Button size={'lg'} onClick={addTable} className="rounded-full">
            <PlusIcon />
            Add Table
          </Button>
        </div>

        <PreviewHeader
          format={format}
          setFormat={setFormat}
          activeTable={activeTable}
          setActiveTable={setActiveTable}
          currentTableName={currentTableName}
          text={text}
        />
      </div>
    </div>
  )
}

export default PlaygroundHeader
