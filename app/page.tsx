'use client'

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { BlogPreview } from '@/components/blog-preview'
import { parseMarkdown, sampleMarkdown } from '@/lib/blog'
import {
  Check,
  ChevronDown,
  Download,
  FileText,
  Link2,
  Monitor,
  PanelLeft,
  Smartphone,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Page() {
  const [markdown, setMarkdown] = useState(sampleMarkdown)
  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get('content')
    setMarkdown(shared || window.localStorage.getItem('blog-logue-markdown') || sampleMarkdown)
  }, [])
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const data = useMemo(() => parseMarkdown(markdown), [markdown])

  const updateMarkdown = (value: string) => {
    setMarkdown(value)
    window.localStorage.setItem('blog-logue-markdown', value)
  }

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.name.endsWith('.md')) return
    const reader = new FileReader()
    reader.onload = () => updateMarkdown(String(reader.result))
    reader.readAsText(file)
  }
  const downloadTemplate = () => { const blob = new Blob([sampleMarkdown], { type: 'text/markdown' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'blog-intro-template.md'; a.click(); URL.revokeObjectURL(url) }
  const share = async () => {
    const url = `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH || ''}/preview/?content=${encodeURIComponent(markdown)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt('미리보기 링크를 복사하세요', url)
    }
  }
  return (
    <main className="min-h-screen bg-[#f2eee7] text-[#302c26]">
      <header className="flex h-[72px] items-center justify-between border-b border-[#ddd6ca] bg-[#f7f4ef] px-5 md:px-10">
        <div className="flex items-center gap-3"><div className="flex size-8 items-center justify-center rounded-lg bg-[#2e2a24] text-[#f8f4ec]"><Sparkles /></div><div><p className="text-sm font-semibold tracking-tight">첫인상</p><p className="text-[10px] text-[#948b7e]">Markdown → Blog intro</p></div></div>
        <div className="flex items-center gap-2"><button onClick={downloadTemplate} className="hidden items-center gap-2 rounded-full border border-[#d9d1c5] bg-[#fbf9f5] px-4 py-2 text-xs font-medium text-[#6e665b] transition hover:bg-white sm:flex"><Download />템플릿 받기</button><button onClick={share} className="flex items-center gap-2 rounded-full bg-[#2e2a24] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#514a40]">{copied ? <Check /> : <Link2 />}{copied ? '링크 복사됨' : '공유하기'}</button></div>
      </header>
      <div className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[380px_1fr]">
        <aside className="border-b border-[#ddd6ca] bg-[#f7f4ef] p-5 md:p-8 lg:min-h-[calc(100vh-72px)] lg:border-b-0 lg:border-r lg:p-8"><div className="mb-7"><p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a06947]">Create your first impression</p><h1 className="text-2xl font-medium leading-tight tracking-[-0.03em]">마크다운으로<br />블로그의 첫인상을 만들어보세요</h1><p className="mt-3 text-sm leading-6 text-[#81786c]">파일을 올리거나 내용을 직접 입력하면, 블로그를 소개하는 화면이 바로 만들어집니다.</p></div>
          <input ref={fileInput} type="file" accept=".md,text/markdown" onChange={handleFile} className="sr-only" />
          <button onClick={() => fileInput.current?.click()} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#cdbfaf] bg-[#fbf9f5] px-4 py-4 text-sm font-medium text-[#635a4f] transition hover:border-[#a06947] hover:bg-white"><Upload />.md 파일 올리기</button>
          <div className="my-6 flex items-center gap-3 text-[10px] text-[#a49b8e]"><span className="h-px flex-1 bg-[#ddd6ca]" />또는 직접 입력<span className="h-px flex-1 bg-[#ddd6ca]" /></div>
          <div className="overflow-hidden rounded-xl border border-[#d8d0c4] bg-[#fbf9f5] shadow-sm"><div className="flex items-center justify-between border-b border-[#e5ded4] px-4 py-3"><span className="flex items-center gap-2 text-xs font-medium text-[#655d53]"><FileText /> blog-intro.md</span><button aria-label="입력 지우기" onClick={() => updateMarkdown('')} className="text-[#aaa094] transition hover:text-[#665d51]"><X /></button></div><textarea value={markdown} onChange={(e) => updateMarkdown(e.target.value)} spellCheck={false} aria-label="Markdown 원문" className="h-[360px] w-full resize-none bg-transparent p-4 font-mono text-[11px] leading-6 text-[#655d53] outline-none" /></div>
          <div className="mt-5 rounded-xl border border-[#e2d8cb] bg-[#f1e9de] p-4"><div className="flex items-center gap-2 text-xs font-semibold text-[#79543d]"><ChevronDown /> 작성 가이드</div><p className="mt-2 text-xs leading-5 text-[#8a715e]">상단의 frontmatter에 blog_name, tagline을 넣어주세요. 나머지 항목은 선택 사항이며 입력된 항목만 미리보기에 보여요.</p></div>
        </aside>
        <section className="min-w-0 bg-[#ebe6dd] p-5 md:p-8 lg:p-10"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a06947]">Live preview</p><h2 className="mt-1 text-xl font-medium">소개 화면 미리보기</h2></div><div className="flex items-center gap-1 rounded-lg border border-[#d6cec1] bg-[#f7f4ef] p-1"><button onClick={() => setDevice('desktop')} aria-label="데스크톱 미리보기" className={cn('rounded-md p-2 transition', device === 'desktop' ? 'bg-white text-[#4c4439] shadow-sm' : 'text-[#9a9185]')}><Monitor /></button><button onClick={() => setDevice('mobile')} aria-label="모바일 미리보기" className={cn('rounded-md p-2 transition', device === 'mobile' ? 'bg-white text-[#4c4439] shadow-sm' : 'text-[#9a9185]')}><Smartphone /></button></div></div>{data.errors.length > 0 && <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-[#e6c9bc] bg-[#fcf1eb] p-4 text-xs text-[#945b48]"><span className="mt-0.5">!</span><div><p className="font-semibold">확인이 필요한 항목이 있어요</p><ul className="mt-1 list-disc pl-4">{data.errors.map((error) => <li key={error}>{error}</li>)}</ul></div></div>}<BlogPreview data={data} mobile={device === 'mobile'} /><div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#958c80]"><PanelLeft /> {device === 'mobile' ? '모바일 화면으로 보고 있어요' : '데스크톱 화면으로 보고 있어요'}</div></section>
      </div>
    </main>
  )
}







