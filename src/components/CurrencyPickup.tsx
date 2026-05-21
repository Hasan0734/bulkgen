import { CURRENCIES } from '#/lib/currency'
import { useState } from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './ui/combobox'
import { cn } from '#/lib/utils';


interface CurrencyPickupProps {
    value: string
    onChange: (code:string | null) => void;
    currencyType?: string
    placeholder?:string
    className?: string
}

const CurrencyPickup = ({value, onChange, currencyType = "code", placeholder="Select", className}: CurrencyPickupProps) => {
  const [currencies] = useState(CURRENCIES)
  return (
    <Combobox items={currencies} value={value} onValueChange={(v) => onChange(v)}>
      <ComboboxInput className={cn("max-w-24", className)} placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item[currencyType]}>
              {currencyType === "symbol"  ? `${item.code} (${item[currencyType]})` :  item[currencyType]}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default CurrencyPickup
