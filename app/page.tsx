'use client'

import { ChangeEvent, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Image as ImageIcon,
  Laptop,
  Link2,
  Menu,
  Monitor,
  Moon,
  PanelLeft,
  Smartphone,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type BlogData = {
  blogName?: string
  tagline?: string
  description?: string
  author?: string
  topics: string[]
  heroImage?: string
  highlight?: string
  buttonText?: string
  buttonUrl?: string
  body: string
  errors: string[]
}

const sampleMarkdown = `---
blog_name: "느린 기록"
tagline: "일상에서 발견한 작은 생각을 기록합니다"
description: "책과 여행, 배움에 관한 이야기를 나누는 개인 블로그입니다."
author: "홍길동"
topics:
  - 책
  - 여행
  - 기록
hero_image: ""
highlight: "천천히 읽고, 오래 기억하기"
button_text: "글 둘러보기"
button_url: "/posts"
---

매일의 속도를 조금 늦추고, 마음에 오래 남는 것들을 기록합니다.

이곳에서는 책을 읽으며 만난 문장과 여행지에서 발견한 풍경, 그리고 배움의 순간을 나눕니다.`

function parseMarkdown(source: string): BlogData {
  const errors: string[] = []
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  const frontmatter = match?.[1] ?? ''
  const body = match?.[2]?.trim() ?? ''
  const values: Record<string, string> = {}
  let topics: string[] = []

  if (!match) errors.push('문서 상단에 ---로 감싼 frontmatter가 필요합니다.')
  frontmatter.split('\n').forEach((line) => {
    const pair = line.match(/^([\w]+):\s*(.*)$/)
    if (pair) values[pair[1]] = pair[2].trim().replace(/^['"]|['"]$/g, '')
    const topic = line.match(/^\s*-\s*(.+)$/)
    if (topic) topics.push(topic[1].trim().replace(/^['"]|['"]$/g, ''))
  })

  const required: [string, string][] = [['blog_name', '블로그 이름'], ['tagline', '한 줄 소개']]
  required.forEach(([key, label]) => {
    if (!values[key]) errors.push(`${label}(${key})이(가) 없습니다.`)
  })

  return {
    blogName: values.blog_name,
    tagline: values.tagline,
    description: values.description,
    author: values.author,
    topics,
    heroImage: values.hero_image,
    highlight: values.highlight,
    buttonText: values.button_text,
    buttonUrl: values.button_url,
    body,
    errors,
  }
}

function Preview({ data, mobile }: { data: BlogData; mobile: boolean }) {
  const [imageFailed, setImageFailed] = useState(false)
  const validImage = data.heroImage && !imageFailed
  return (
    <div className={cn('overflow-hidden rounded-[22px] border border-[#d9d2c5] bg-[#fbfaf7] shadow-[0_24px_70px_rgba(46,42,34,0.12)] transition-all', mobile ? 'mx-auto w-[292px]' : 'w-full')}>
      <div className="flex items-center justify-between border-b border-[#e7e1d7] bg-[#f5f1ea] px-5 py-3 text-[11px] text-[#8b8377]">
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#c9c0b2]" /><span className="size-2 rounded-full bg-[#d5cdc1]" /><span className="size-2 rounded-full bg-[#e1dad0]" /></span>
        <span>blog-preview.local</span>
        <span className="w-10" />
      </div>
      <article className="font-serif text-[#28251f]">
        <nav className="flex items-center justify-between px-6 py-5 md:px-10">
          <span className="max-w-[180px] truncate text-[15px] font-semibold tracking-tight">{data.blogName || '블로그 이름'}</span>
          <div className="hidden items-center gap-6 text-[11px] text-[#81796d] md:flex"><span>소개</span><span>카테고리</span><span>연락하기</span></div>
          <Menu className="md:hidden" aria-label="메뉴" />
        </nav>
        <section className={cn('grid gap-8 px-6 pb-10 pt-10 md:grid-cols-[1fr_0.8fr] md:items-center md:px-10 md:pb-16 md:pt-16', !validImage && 'md:grid-cols-1')}>
          <div>
            {data.highlight && <p className="mb-5 text-[11px] font-sans font-medium tracking-[0.2em] text-[#a06947]">{data.highlight}</p>}
            <h1 className="max-w-xl text-[34px] font-medium leading-[1.16] tracking-[-0.04em] md:text-[52px]">{data.tagline || '한 줄 소개를 입력해주세요'}</h1>
            {data.description && <p className="mt-6 max-w-md font-sans text-[13px] leading-7 text-[#736b60]">{data.description}</p>}
            {data.buttonText && <a href={data.buttonUrl || '#'} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2e2a24] px-5 py-3 font-sans text-xs font-medium text-[#fffdf8] transition hover:bg-[#514a40]">{data.buttonText}<ArrowUpRight /></a>}
          </div>
          {validImage && <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#e8e0d4]"><img src={data.heroImage} alt={`${data.blogName || '블로그'} 대표 이미지`} className="size-full object-cover" onError={() => setImageFailed(true)} /><span className="absolute bottom-3 left-3 rounded-full bg-[#fffdf8]/85 px-3 py-1 font-sans text-[10px] text-[#70685d]">대표 이미지</span></div>}
        </section>
        {(data.body || data.author) && <section className="border-t border-[#e7e1d7] px-6 py-10 md:px-10 md:py-14"><div className="grid gap-8 md:grid-cols-[0.6fr_1fr]"><div><p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a06947]">About the blog</p><h2 className="mt-3 text-2xl">이곳에 대하여</h2></div><div><p className="whitespace-pre-line text-[14px] leading-8 text-[#686055]">{data.body || data.description}</p>{data.author && <p className="mt-6 font-sans text-xs text-[#978e82]">운영자 · {data.author}</p>}</div></div></section>}
        {data.topics.length > 0 && <section className="border-t border-[#e7e1d7] px-6 py-8 md:px-10"><p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a06947]">Topics</p><div className="mt-4 flex flex-wrap gap-2">{data.topics.map((topic) => <span key={topic} className="rounded-full border border-[#d9d0c4] px-3 py-1.5 font-sans text-xs text-[#655d53]">{topic}</span>)}</div></section>}
        <footer className="flex items-center justify-between border-t border-[#e7e1d7] px-6 py-5 font-sans text-[10px] text-[#988f83] md:px-10"><span>{data.blogName || '블로그 이름'}</span><span>© {new Date().getFullYear()} All rights reserved.</span></footer>
      </article>
    </div>
  )
}

export default function Page() {
  const [markdown, setMarkdown] = useState(() => {
    if (typeof window === 'undefined') return sampleMarkdown
    const shared = new URLSearchParams(window.location.search).get('content')
    return shared || sampleMarkdown
  })
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const data = useMemo(() => parseMarkdown(markdown), [markdown])

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.name.endsWith('.md')) return
    const reader = new FileReader()
    reader.onload = () => setMarkdown(String(reader.result))
    reader.readAsText(file)
  }
  const downloadTemplate = () => { const blob = new Blob([sampleMarkdown], { type: 'text/markdown' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'blog-intro-template.md'; a.click(); URL.revokeObjectURL(url) }
  const share = async () => { const url = `${window.location.origin}/?content=${encodeURIComponent(markdown)}`; try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.history.replaceState({}, '', `?content=${encodeURIComponent(markdown)}`) } }

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
          <div className="overflow-hidden rounded-xl border border-[#d8d0c4] bg-[#fbf9f5] shadow-sm"><div className="flex items-center justify-between border-b border-[#e5ded4] px-4 py-3"><span className="flex items-center gap-2 text-xs font-medium text-[#655d53]"><FileText /> blog-intro.md</span><button aria-label="입력 지우기" onClick={() => setMarkdown('')} className="text-[#aaa094] transition hover:text-[#665d51]"><X /></button></div><textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} spellCheck={false} aria-label="Markdown 원문" className="h-[360px] w-full resize-none bg-transparent p-4 font-mono text-[11px] leading-6 text-[#655d53] outline-none" /></div>
          <div className="mt-5 rounded-xl border border-[#e2d8cb] bg-[#f1e9de] p-4"><div className="flex items-center gap-2 text-xs font-semibold text-[#79543d]"><ChevronDown /> 작성 가이드</div><p className="mt-2 text-xs leading-5 text-[#8a715e]">상단의 frontmatter에 blog_name, tagline을 넣어주세요. 나머지 항목은 선택 사항이며 입력된 항목만 미리보기에 보여요.</p></div>
        </aside>
        <section className="min-w-0 bg-[#ebe6dd] p-5 md:p-8 lg:p-10"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a06947]">Live preview</p><h2 className="mt-1 text-xl font-medium">소개 화면 미리보기</h2></div><div className="flex items-center gap-1 rounded-lg border border-[#d6cec1] bg-[#f7f4ef] p-1"><button onClick={() => setDevice('desktop')} aria-label="데스크톱 미리보기" className={cn('rounded-md p-2 transition', device === 'desktop' ? 'bg-white text-[#4c4439] shadow-sm' : 'text-[#9a9185]')}><Monitor /></button><button onClick={() => setDevice('mobile')} aria-label="모바일 미리보기" className={cn('rounded-md p-2 transition', device === 'mobile' ? 'bg-white text-[#4c4439] shadow-sm' : 'text-[#9a9185]')}><Smartphone /></button></div></div>{data.errors.length > 0 && <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-[#e6c9bc] bg-[#fcf1eb] p-4 text-xs text-[#945b48]"><span className="mt-0.5">!</span><div><p className="font-semibold">확인이 필요한 항목이 있어요</p><ul className="mt-1 list-disc pl-4">{data.errors.map((error) => <li key={error}>{error}</li>)}</ul></div></div>}<Preview data={data} mobile={device === 'mobile'} /><div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#958c80]"><PanelLeft /> {device === 'mobile' ? '모바일 화면으로 보고 있어요' : '데스크톱 화면으로 보고 있어요'}</div></section>
      </div>
    </main>
  )
}
