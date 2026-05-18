import { Minimize2Icon, MinusIcon, XIcon } from 'lucide-react'

const WindowControll = () => {
  return (
    <div className="flex items-center gap-1 group">
      <button className="size-4 p-0.5 bg-red-500/80 rounded-full">
        <XIcon size={12} className="invisible group-hover:visible transition" />
      </button>
      <button className="size-4 p-0.5 bg-yellow-500/80 rounded-full">
        <MinusIcon size={12} className="invisible group-hover:visible transition" />
      </button>
      <button className="size-4 p-0.5 bg-green-500/80 rounded-full">
        <Minimize2Icon size={12} className="invisible group-hover:visible transition rotate-90" />
      </button>
    </div>
  )
}

export default WindowControll
