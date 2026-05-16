import { GripVertical, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import type { FieldDef, TableDef } from '#/lib/types'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { FIELD_GROUPS, fieldLabel } from '#/lib/generator'

interface FieldRowProps {
  field: FieldDef
//   tables: TableDef[]
//   currentTableId: string
//   onChange: (f: FieldDef) => void
//   onRemove: () => void
}

const FieldRow = ({field}: FieldRowProps) => {
  return (
    <div className="group flex flex-col gap-2 rounded-lg border border-border bg-background p-3 transition-all hover:border-primary/40  md:flex-row md:items-center justify-between">
      <div className="flex items-center gap-2 grow">
        <GripVertical className="hidden h-4 w-4 shrink-0 text-muted-foreground md:block" />
        <Input
            value={field.name}
            // onChange={(e) => update('name', e.target.value)}
          placeholder="field_name"
          className="md:max-w-45 font-mono text-sm"
        />

        <Select value={field.type} >
          <SelectTrigger className="md:max-w-40 w-full">
            <SelectValue>{fieldLabel(field.type)}</SelectValue>
          </SelectTrigger>
          <SelectContent className="max-w-80">
            {FIELD_GROUPS.map((g) => (
              <SelectGroup>
                <SelectLabel>{g.label}</SelectLabel>
                {g.items.map((it) => (
                  <SelectItem key={it.type} value={it.type}>
                    {it.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {/* <div className="flex flex-1 flex-wrap items-center gap-2">
          {field.type === 'static' && (
            <Input
              value={field.staticValue ?? ''}
              onChange={(e) => update('staticValue', e.target.value)}
              placeholder="Static value (same for every row)"
              className="flex-1 min-w-40"
            />
          )}
        </div> */}
      </div>
      <Button
        variant="ghost"
        size="icon"
        // onClick={onRemove}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default FieldRow
