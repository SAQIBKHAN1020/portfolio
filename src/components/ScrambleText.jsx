import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

/**
 * Cycles through `words`, decoding each one with a scramble effect.
 * Classic award-site text-decode animation.
 */
export default function ScrambleText({ words, interval = 2800, className = '' }) {
  const [output, setOutput] = useState(words[0] || '')
  const frameRef = useRef(0)
  const rafRef = useRef(null)
  const indexRef = useRef(0)

  useEffect(() => {
    if (!words || words.length < 2) return

    let queue = []
    let resolvePromise

    const update = () => {
      let complete = 0
      let out = ''

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i]
        let { char } = queue[i]

        if (frameRef.current >= end) {
          complete++
          out += to
        } else if (frameRef.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)]
            queue[i].char = char
          }
          out += `<span style="opacity:.55">${char}</span>`
        } else {
          out += from
        }
      }

      setOutput(out)

      if (complete === queue.length) {
        resolvePromise && resolvePromise()
      } else {
        frameRef.current++
        rafRef.current = requestAnimationFrame(update)
      }
    }

    const setText = (newText) => {
      const oldText = words[indexRef.current] || ''
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((res) => (resolvePromise = res))
      queue = []

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 20)
        const end = start + Math.floor(Math.random() * 20) + 10
        queue.push({ from, to, start, end, char: '' })
      }

      cancelAnimationFrame(rafRef.current)
      frameRef.current = 0
      update()
      return promise
    }

    const timer = setInterval(() => {
      const next = (indexRef.current + 1) % words.length
      setText(words[next]).then(() => {
        indexRef.current = next
      })
    }, interval)

    return () => {
      clearInterval(timer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [words, interval])

  return (
    <span
      className={className}
      // Scramble output contains only generated <span> wrappers around characters.
      dangerouslySetInnerHTML={{ __html: output }}
    />
  )
}
