import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import WindowControll from './WindowControll'
import { GooeyInput } from './ui/gooey-input'
import { Button } from './ui/button'
import { FIELD_GROUPS, fieldLabel } from '#/lib/generator'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import { useEffect, useState } from 'react'
import { cn } from '#/lib/utils'
import type { FeildGroupType, FieldType } from '#/lib/types'
import { AnimatePresence, motion } from 'motion/react'

interface PropsType {
  value: FieldType
  onValueChange: (v: string) => void
}

const getFields = () => {
  const allField: FeildGroupType[] = [{ label: 'All', items: [] }]
  for (const element of FIELD_GROUPS) {
    allField[0] = {
      ...allField[0],
      items: [...allField[0].items, ...element.items],
    }
    allField.push(element)
  }
  return allField
}

const TypeDialog = ({ value, onValueChange }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [groupFields, setGroupFields] = useState<FeildGroupType[]>(getFields())
  const [active, setActive] = useState<FeildGroupType | null>(groupFields[0])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const handleSearch = () => {
      if (!searchText) {
        setGroupFields(getFields())
        setActive(getFields()[0])
        return
      }
      const searchItems = []
      for (const element of groupFields) {
        const items = []
        for (const field of element.items) {
          const filter = field.type.toLowerCase().includes(searchText.toLowerCase())
          if (!filter) continue
          items.push(field)
        }
        searchItems.push({ ...element, items })
      }
      setActive(searchItems[0])

      setGroupFields(searchItems)
    }

    handleSearch()
  }, [searchText])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="bg-accent! ">
          {fieldLabel(value)} <ChevronsUpDownIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-4xl w-full p-0 overflow-hidden bg-card gap-0"
        showCloseButton={false}
      >
        <DialogHeader className="bg-secondary py-1 px-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <WindowControll />
              <DialogTitle className="text-lg">Chose a type</DialogTitle>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex w-full items-center justify-center">
                <GooeyInput
                  onValueChange={(val) => setSearchText(val)}
                  expandedOffset={40}
                  classNames={{
                    input:
                      'text-primary! placeholder:text-mute dark:placeholder:text-mute',
                    trigger: 'h-8 bg-card text-primary',
                    bubble: 'size-8',
                    bubbleSurface: 'size-8 bg-card text-primary',
                    buttonRow: 'h-8',
                    filterWrap: 'h-8',
                  }}
                  collapsedWidth={150}
                  placeholder="Find Type..."
                  autoFocus={true}
                />
              </div>
              <DialogClose asChild>
                <Button className="" size={'icon-sm'} variant={'ghost'}>
                  <XIcon />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-3">
          <ScrollArea className="h-120 col-span-1 pl-2 pr-3 py-3 bg-secondary">
            <ul className="space-y-1">
              {groupFields.map((field, index) => (
                <motion.li key={index}>
                  <button
                    className={cn(
                      'w-full hover:bg-card py-2 px-3 rounded-lg font-semibold flex justify-between',
                      {
                        'bg-card': field.label === active?.label,
                      },
                    )}
                    onClick={() => setActive(field)}
                  >
                    {field.label}
                    <span>{field.items.length}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </ScrollArea>

          <ScrollArea className="col-span-2 px-4 pt-2 pb-2 h-120 ">
            <AnimatePresence>
              {active && (
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex items-center flex-wrap gap-3"
                >
                  {active.items.map((field) => (
                    <motion.li key={field.type} className="">
                      <button
                        onClick={() => {
                          onValueChange(field.type)
                          setIsOpen(false)
                        }}
                        className={cn(
                          ' hover:bg-secondary py-1.5 px-4 rounded-md text-sm font-semibold border transition duration-100',
                          {
                            'bg-background hover:bg-background dark:bg-primary dark:text-black':
                              value === field.type,
                          },
                        )}
                      >
                        {field.label}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TypeDialog
