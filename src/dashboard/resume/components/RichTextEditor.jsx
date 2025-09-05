import React, { useState, useContext, useEffect } from 'react'
import {
  BtnBold,
  Toolbar,
  BtnItalic,
  Editor,
  EditorProvider,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  Separator,
  BtnBulletList,
  BtnLink
} from 'react-simple-wysiwyg'
import { Button } from '../../../components/ui/button'
import { Brain, LoaderCircle } from 'lucide-react'
import { AIChatSession } from '../../../../service/AIModel'
import { toast } from 'sonner'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'

const PROMPT = `position title: {positionTitle}. Based on this position title, write 5-7 bullet points summarizing my experience for a resume (do not include experience level and do NOT return JSON). Format the response using HTML <ul><li> tags.`

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '')
  const { resumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)

  // Update internal state if defaultValue changes (optional but safe)
  useEffect(() => {
    setValue(defaultValue || '')
  }, [defaultValue])

  const GenerateSummeryFromAI = async () => {
    const experienceList = resumeInfo?.Experience || [] // Capital E assumed

    if (!experienceList[index]?.title) {
      toast('Please add Position Title')
      return
    }

    setLoading(true)

    try {
      const prompt = PROMPT.replace('{positionTitle}', experienceList[index].title)
      const result = await AIChatSession.sendMessage(prompt)
      const resp = await result.response.text()
      console.log('AI Response:', resp)

      const cleaned = resp.replace('[', '').replace(']', '')
      setValue(cleaned)
      onRichTextEditorChange({ target: { value: cleaned } }, index)
    } catch (error) {
      console.error('AI generation failed:', error)
      toast('AI generation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs font-semibold'>Summary</label>
        <Button
          onClick={GenerateSummeryFromAI}
          className='border border-blue-500 text-blue-600 px-2 py-1 rounded hover:bg-blue-50 flex gap-2 text-sm'
        >
          {loading ? (
            <LoaderCircle className='animate-spin h-4 w-4' />
          ) : (
            <>
              <Brain className='h-4 w-4' />
              Generate From AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            const html = e.target.value
            setValue(html)
            onRichTextEditorChange({ target: { value: html } }, index)
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
