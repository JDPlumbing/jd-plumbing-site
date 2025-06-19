'use client'

import { useEffect } from 'react'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'

type Props = {
  content: string
  onChange: (value: string) => void
}

export default function JournalEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        blockquote: false,
        bulletList: false,
        heading: false,
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      CodeBlock,
      Blockquote,
      BulletList,
      Heading.configure({ levels: [1, 2, 3] }),
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
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-[200px] prose prose-invert max-w-none" />
    </div>
  )
}

function EditorToolbar({ editor }: { editor: Editor }) {
  const buttonBase = 'px-2 py-1 rounded text-sm'
  const active = 'bg-blue-600 text-white'
  const inactive = 'bg-neutral-700 text-gray-200 hover:bg-neutral-600'

  const formatButton = (
    label: string,
    isActive: boolean,
    onClick: () => void
  ) => (
    <button
      onClick={onClick}
      className={`${buttonBase} ${isActive ? active : inactive}`}
      type="button"
    >
      {label}
    </button>
  )

  return (
    <div className="flex flex-wrap gap-2 border-b border-neutral-700 pb-2 mb-2">
      {formatButton('Bold', editor.isActive('bold'), () =>
        editor.chain().focus().toggleBold().run()
      )}
      {formatButton('Italic', editor.isActive('italic'), () =>
        editor.chain().focus().toggleItalic().run()
      )}
      {formatButton('Underline', editor.isActive('underline'), () =>
        editor.chain().focus().toggleUnderline().run()
      )}
      {formatButton('H1', editor.isActive('heading', { level: 1 }), () =>
        editor.chain().focus().toggleHeading({ level: 1 }).run()
      )}
      {formatButton('H2', editor.isActive('heading', { level: 2 }), () =>
        editor.chain().focus().toggleHeading({ level: 2 }).run()
      )}
      {formatButton('H3', editor.isActive('heading', { level: 3 }), () =>
        editor.chain().focus().toggleHeading({ level: 3 }).run()
      )}
      {formatButton('• List', editor.isActive('bulletList'), () =>
        editor.chain().focus().toggleBulletList().run()
      )}
      {formatButton('“ Quote', editor.isActive('blockquote'), () =>
        editor.chain().focus().toggleBlockquote().run()
      )}
      {formatButton('Code', editor.isActive('codeBlock'), () =>
        editor.chain().focus().toggleCodeBlock().run()
      )}
      {formatButton('───', false, () =>
        editor.chain().focus().setHorizontalRule().run()
      )}

      {/* 🖼️ Image */}
      <button
        onClick={() => {
          const url = window.prompt('Enter image URL')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
        className={`${buttonBase} ${inactive}`}
        type="button"
      >
        🖼️ Image
      </button>

      {/* 🔗 Link */}
      <button
        onClick={() => {
          const url = window.prompt('Enter URL')
          if (url) {
            editor
              .chain()
              .focus()
              .extendMarkRange('link')
              .setLink({ href: url })
              .run()
          }
        }}
        className={`${buttonBase} ${
          editor.isActive('link') ? active : inactive
        }`}
        type="button"
      >
        🔗 Link
      </button>

      {formatButton('↶ Undo', false, () =>
        editor.chain().focus().undo().run()
      )}
      {formatButton('↷ Redo', false, () =>
        editor.chain().focus().redo().run()
      )}
    </div>
  )
}
