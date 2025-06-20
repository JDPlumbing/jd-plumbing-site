'use client'

import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'

export default function JsonRenderer({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        blockquote: false,
        bulletList: false,
        heading: false,
      }),
      Underline,
      Link,
      CodeBlock,
      Blockquote,
      BulletList,
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
    ],
    editable: false,
    content,
  })

  if (!editor) return null

  return <EditorContent editor={editor} className="prose prose-invert max-w-none" />
}
