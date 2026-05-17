import { GripVertical, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import type { FieldDef } from '#/lib/types'
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
import { useTableStore } from '#/app/store'

interface FieldRowProps {
  field: FieldDef
  currentTableId: string
  onChange: (f: FieldDef) => void
  onRemove: () => void
}

const FieldRow = ({
  field,
  onRemove,
  onChange,
  currentTableId,
}: FieldRowProps) => {
  const { tables } = useTableStore()
  const update = <K extends keyof FieldDef>(key: K, value: FieldDef[K]) => {
    onChange({ ...field, [key]: value })
  }
  const refTable = tables.find((t) => t.id === field.relationTableId)

  return (
    <div className="group flex flex-col gap-2 rounded-lg border border-border bg-secondary/50 p-3 transition-all hover:border-primary/40   justify-between  md:flex-row md:items-center">
      <div className="flex flex-col items-center gap-2 grow md:flex-row md:items-center">
        <GripVertical className="hidden h-4 w-4 shrink-0 text-muted-foreground md:block" />
        <Input
          value={field.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="field_name"
          className="md:max-w-45 font-mono text-sm"
        />

        <Select
          value={field.type}
          onValueChange={(v) => update('type', v as FieldDef['type'])}
        >
          <SelectTrigger className="md:max-w-40 w-full">
            <SelectValue>{fieldLabel(field.type)}</SelectValue>
          </SelectTrigger>
          <SelectContent className="md:max-w-40 ">
            {FIELD_GROUPS.map((g) => (
              <SelectGroup key={g.label}>
                <SelectLabel className="font-bold text-active">
                  {g.label}
                </SelectLabel>
                {g.items.map((it) => (
                  <SelectItem key={it.type} value={it.type}>
                    {it.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-1 flex-wrap items-center gap-2">
          {field.type === 'static' && (
            <Input
              value={field.staticValue ?? ''}
              onChange={(e) => update('staticValue', e.target.value)}
              placeholder="Static value (same for every row)"
              className="flex-1 min-w-40 max-w-60"
            />
          )}
          {field.type === 'enum' && (
            <Input
              value={field.enumValues ?? ''}
              onChange={(e) => update('enumValues', e.target.value)}
              placeholder="active, pending, archived"
              className="flex-1 min-w-40  max-w-60"
            />
          )}
          {(field.type === 'number' || field.type === 'price') && (
            <>
              <Input
                type="number"
                value={field.min ?? ''}
                onChange={(e) =>
                  update(
                    'min',
                    e.target.value === '' ? undefined : Number(e.target.value),
                  )
                }
                placeholder="min"
                className="w-24"
              />
              <Input
                type="number"
                value={field.max ?? ''}
                onChange={(e) =>
                  update(
                    'max',
                    e.target.value === '' ? undefined : Number(e.target.value),
                  )
                }
                placeholder="max"
                className="w-24"
              />
            </>
          )}

          {field.type === 'relation' && (
            <>
              <Select
                value={field.relationTableId ?? ''}
                onValueChange={(v) =>
                  onChange({
                    ...field,
                    relationTableId: v,
                    relationFieldId: undefined,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Table" className="w-40" />
                </SelectTrigger>
                <SelectContent>
                  {tables
                    .filter((tb) => tb.id !== currentTableId)
                    .map((tb) => (
                      <SelectItem key={tb.id} value={tb.id}>
                        {tb.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select
                value={field.relationFieldId}
                onValueChange={(v) => update('relationFieldId', v)}
                disabled={!refTable}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Field" className="w-40" />
                </SelectTrigger>
                <SelectContent>
                  {refTable?.fields
                    ?.filter((f) => f.type !== 'relation')
                    .map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default FieldRow
