'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, ZoomIn } from 'lucide-react'

interface Props { images: string[]; name: string }

export default function Gallery({ images, name }: Props) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  return (
    <div className="flex flex-col md:flex-row-reverse gap-3">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {images.map((src, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-card overflow-hidden flex-shrink-0 border-2 transition-all
              ${active === i ? 'border-gold shadow-gold' : 'border-light-border dark:border-dark-border hover:border-gold/50'}`}>
            <Image src={src} alt={`${name} ${i+1}`} width={80} height={80} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      {/* Main Image */}
      <div className="relative flex-1 aspect-[3/4] rounded-card overflow-hidden bg-light-elevated dark:bg-dark-elevated order-1 md:order-2 group">
        <Image src={images[active]} alt={name} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 55vw" priority />
        <button onClick={() => setZoomed(true)}
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 dark:bg-dark-surface/90
                     flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={16} className="text-light-muted" />
        </button>
        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-dark-surface/90
                         flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={18} />
            </button>
            <button onClick={next}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-dark-surface/90
                         flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={18} />
            </button>
          </>
        )}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${active === i ? 'bg-gold w-4' : 'w-1.5 bg-white/60'}`} />
          ))}
        </div>
      </div>
      {zoomed && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setZoomed(false)}>
          <div className="relative w-full max-w-2xl aspect-[3/4] mx-4">
            <Image src={images[active]} alt={name} fill className="object-contain" />
          </div>
          <button className="absolute top-4 left-4 text-white/70 hover:text-white text-2xl">✕</button>
        </div>
      )}
    </div>
  )
}