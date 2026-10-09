'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BlogPreview } from '@/components/blog-preview'
import { parseMarkdown, sampleMarkdown } from '@/lib/blog'

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const sharedMarkdown = searchParams.get('content')
  const [savedMarkdown, setSavedMarkdown] = useState<string | null>(null)

  useEffect(() => {
    setSavedMarkdown(window.localStorage.getItem('blog-logue-markdown'))
  }, [])

  const markdown = sharedMarkdown || savedMarkdown || sampleMarkdown
  const data = useMemo(() => parseMarkdown(markdown), [markdown])

  return (
    <main className="min-h-screen bg-[#ebe6dd] p-4 sm:p-8 lg:p-12">
      <div className="mx-auto max-w-5xl">
        {data.errors.length > 0 && <div role="alert" className="mb-5 rounded-xl border border-[#e6c9bc] bg-[#fcf1eb] p-4 text-xs text-[#945b48]"><p className="font-semibold">확인이 필요한 항목이 있어요</p><ul className="mt-1 list-disc pl-4">{data.errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
        <BlogPreview data={data} />
      </div>
    </main>
  )
}
