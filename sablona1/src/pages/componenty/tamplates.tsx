"use client";
import Image from "next/image"
import { X } from "lucide-react"
import { useState } from "react"

interface TemplateCardProps {
    imageSrc: string;
    title: string;
    description: string
}

function TemplateCard({ imageSrc, title, description } : TemplateCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
          <div 
            className="relative h-64 cursor-pointer transition-transform duration-300 transform group-hover:scale-105"
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={imageSrc}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 group-hover:opacity-80"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
  
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg max-w-3xl max-h-full overflow-auto">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
              <Image
                src={imageSrc}
                alt={title}
                width={800}
                height={600}
                objectFit="contain"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>
          </div>
        )}
        </div>
    );
}
export default TemplateCard;