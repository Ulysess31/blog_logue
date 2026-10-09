'use client'

import { useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogData } from '@/lib/blog'

export function BlogPreview({ data, mobile = false }: { data: BlogData; mobile?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false)
  const validImage = data.heroImage && !imageFailed
  return (
    <div className={cn('overflow-hidden rounded-[22px] border border-[#d9d2c5] bg-[#fbfaf7] shadow-[0_24px_70px_rgba(46,42,34,0.12)] transition-all', mobile ? 'mx-auto w-[292px]' : 'w-full')}>
      <div className="flex items-center justify-between border-b border-[#e7e1d7] bg-[#f5f1ea] px-5 py-3 text-[11px] text-[#8b8377]">
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#c9c0b2]" /><span className="size-2 rounded-full bg-[#d5cdc1]" /><span className="size-2 rounded-full bg-[#e1dad0]" /></span>
        <span>blog-preview.local</span><span className="w-10" />
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
        {(data.body || data.author) && <section className="border-t border-[#e7e1d7] px-6 py-10 md:px-10 md:py-14"><div className="grid gap-8 md:grid-cols-[0.6fr_1fr]"><div><p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a06947]">About the blog</p><h2 className="mt-3 text-2xl">블로그에 대하여</h2></div><div><p className="whitespace-pre-line text-[14px] leading-8 text-[#686055]">{data.body || data.description}</p>{data.author && <p className="mt-6 font-sans text-xs text-[#978e82]">운영자 · {data.author}</p>}</div></div></section>}
        {data.topics.length > 0 && <section className="border-t border-[#e7e1d7] px-6 py-8 md:px-10"><p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a06947]">Topics</p><div className="mt-4 flex flex-wrap gap-2">{data.topics.map((topic) => <span key={topic} className="rounded-full border border-[#d9d0c4] px-3 py-1.5 font-sans text-xs text-[#655d53]">{topic}</span>)}</div></section>}
        <footer className="flex items-center justify-between border-t border-[#e7e1d7] px-6 py-5 font-sans text-[10px] text-[#988f83]"><span>{data.blogName || '블로그 이름'}</span><span>© {new Date().getFullYear()} All rights reserved.</span></footer>
      </article>
    </div>
  )
}
