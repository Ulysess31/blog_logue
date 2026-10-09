export type BlogData = {
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

export const sampleMarkdown = `---
blog_name: "나의 기록"
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

매일의 속도를 조금 늦추고 마음에 오래 남는 것들을 기록합니다.

책에서 만난 문장과 여행지에서 발견한 풍경, 그리고 배움의 시간을 나눕니다.`

export function parseMarkdown(source: string): BlogData {
  const errors: string[] = []
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  const frontmatter = match?.[1] ?? ''
  const body = match?.[2]?.trim() ?? ''
  const values: Record<string, string> = {}
  const topics: string[] = []

  if (!match) errors.push('문서 상단에 ---로 감싼 frontmatter가 필요합니다.')
  frontmatter.split('\n').forEach((line) => {
    const pair = line.match(/^([\w]+):\s*(.*)$/)
    if (pair) values[pair[1]] = pair[2].trim().replace(/^['"]|['"]$/g, '')
    const topic = line.match(/^\s*-\s*(.+)$/)
    if (topic) topics.push(topic[1].trim().replace(/^['"]|['"]$/g, ''))
  })

  const required: [string, string][] = [['blog_name', '블로그 이름'], ['tagline', '한 줄 소개']]
  required.forEach(([key, label]) => {
    if (!values[key]) errors.push(`${label}(${key})가 없습니다.`)
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
