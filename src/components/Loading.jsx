import React from 'react'

export default function Loading() {
    const text = 'Loading...'.split('')

    return (
        <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none">
            {/* Mascot không có background */}
            <img
                src="/assets/lv-2.png"
                alt="Mascot"
                className="h-24 w-auto mb-2 animate-bounce object-contain"
                style={{ animationDuration: '1.2s' }}
            />

            {/* Text “Loading...” */}
            <h1 className="flex text-white text-3xl font-bold">
                {text.map((char, i) => (
                    <span
                        key={i}
                        className="inline-block"
                        style={{
                            animation: `bounce 1s ease-in-out infinite`,
                            animationDelay: `${i * 0.1}s`
                        }}
                    >
            {char}
          </span>
                ))}
            </h1>
        </div>
    )
}
