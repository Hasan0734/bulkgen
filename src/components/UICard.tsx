import type { LucideIcon } from 'lucide-react'
type DataTypes = {
  title: string
  icon: LucideIcon
  desc: string
}

interface UICardProps {
  data: DataTypes
  index: number
}
const UICard = ({ data, index }: UICardProps) => {
  return (
    <div
     
      key={data.title}
      className="bg-card rounded-2xl p-5 space-y-4 relative"
    >
      <div className="flex gap-4 items-center">
        <div className="bg-background/50 rounded-full size-8 flex items-center justify-center">
          <data.icon size={18} />
        </div>
        <h2 className="text-base font-semibold">{data.title}</h2>
      </div>
      <p className="m-0 text-sm text-muted-foreground">{data.desc}</p>
    </div>
  )
}

export default UICard
