"use client"

import { useState } from "react"
import styles from "./loader.module.css"

type Props = {
    size?: number
}

export default function Loader({ size = 96 }: Props) {
    const [broken, setBroken] = useState(false)

    return (
        <div className={styles.wrapper} aria-live="polite" aria-busy="true">
            {!broken ? (
                // try to load image from public/logos/loader.png
                // Save your provided image as `public/logos/loader.png` (from the repo root)
                // and the loader will display it. If the file is missing the inline SVG is used.
                <img
                    src="/IN-TALKS.png-2.png"
                    alt="Loading"
                    width={size}
                    height={size}
                    style={{ width: size, height: size }}
                    className={styles.image}
                    onError={() => setBroken(true)}
                />
            ) : (
                // fallback inline SVG spinner (guaranteed to render)
                <svg
                    className={styles.image}
                    style={{ width: size, height: size }}
                    viewBox="0 0 50 50"
                    aria-hidden="true"
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                        stroke="url(#g)"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="g" x1="0%" x2="100%">
                            <stop offset="0%" stopColor="#ff6ea3" />
                            <stop offset="100%" stopColor="#7ad3ff" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </div>
    )
}
