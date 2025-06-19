'use client'

import { useEffect } from 'react'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

type Props = {
  content: string
  onChange: (value: string) => void
}

export default function PageEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ allowBase64: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content])

  if (!editor) return null

  return (
    <div className="border border-neutral-700 rounded p-2 space-y-2 bg-neutral-900 text-white">
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
        <button onClick={() => {
          const url = prompt('Enter image URL')
          if (url) editor.chain().focus().setImage({ src: url }).run()
        }}>🖼 Image</button>
      </div>
      <EditorContent editor={editor} className="min-h-[200px] prose prose-invert max-w-none" />
    </div>
  )
}
