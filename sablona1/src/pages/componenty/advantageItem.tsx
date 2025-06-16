import { Check } from 'lucide-react';

interface AdvantageItemProps {
    title: string
}

function AdvantageItem({ title }: AdvantageItemProps) {
    return (
      <div className="flex items-center justify-center">
        <Check className="w-5 h-5 mr-2 text-black" />
        <span className="text-lg font-semibold text-gray-800">{title}</span>
      </div>
    )
}
export default AdvantageItem;