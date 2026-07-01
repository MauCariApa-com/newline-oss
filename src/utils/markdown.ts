import MarkdownItAsync from 'markdown-it-async'
import { fromAsyncCodeToHtml } from '@shikijs/markdown-it/async'
import { codeToHtml } from 'shiki'

// Inisialisasi MarkdownIt async
const mdAsync = MarkdownItAsync()

await mdAsync.use(
  fromAsyncCodeToHtml(codeToHtml, {
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  })
)

export async function renderMarkdown(content: string) {
  return await mdAsync.renderAsync(content)
}