import { cn } from '#/lib/utils'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  containerClass?: string
}

const TextInput = ({
  label,
  name,
  containerClass,
  ...props
}: TextInputProps) => {
  return (
    <div className={cn('space-y-2', containerClass)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input  id={name} name={name} {...props} />
    </div>
  )
}

export default TextInput
