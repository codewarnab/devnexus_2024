import * as React from 'react'




export function MissingApiKeyBanner({
  missingKeys
}: {
  missingKeys: string[]
}) {
  if (!missingKeys.includes('GROQ_API_KEY')) {
    return null
  }

  return (
    <div className="border p-4">
      <div className="text-red-700 font-medium">
        You need to provide a Groq API Key.
      </div>
      <a
        href="https://console.groq.com/keys"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-red-800 hover:text-red-900"
      >
        <span
          className="ml-1 text-primary font-semibold"
          style={{ textDecoration: 'underline' }}
        >
          {' '}
          Get a Groq API Key
        </span>
      </a>
    </div>
  )
}
