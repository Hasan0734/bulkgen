import { Card, CardContent } from './ui/card'
import { useTableStore } from '#/app/store'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import { AnimatePresence, motion } from 'motion/react'
import CopyButton from './ui/copy-button'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface PropsType {
  text: string
  format: 'json' | 'csv' | 'sql'
  currentTableName: string
}

const PreviewPanel = ({ text, format, currentTableName }: PropsType) => {
  const { isGenerating, csv } = useTableStore()

  return (
    <Card className="p-0 relative">
      <AnimatePresence>
        {text && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut', type: 'spring' }}
            className="absolute right-2 top-2 z-10"
          >
            <CopyButton variant={'ghost'} content={text} />
          </motion.div>
        )}
      </AnimatePresence>
      <CardContent className="p-0 h-147 2xl:h-170 overflow-auto scroll-auto">
        {text && format !== 'csv' && (
          <SyntaxHighlighter
            className="h-full bg-card! text-primary!"
            language={format}
            style={docco}
          >
            {text}
          </SyntaxHighlighter>
        )}

        {!isGenerating && csv[currentTableName] && format === 'csv' && (
          <pre className="p-2">{text}</pre>
        )}
        {!isGenerating && !text && (
          <div className="p-3 text-muted-foreground">
            No data — add fields and click Generate.
          </div>
        )}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
                type: 'spring',
              }}
              className="absolute inset-0 z-20 "
            >
              <div className="backdrop-blur-xs h-full flex items-center justify-center">
                <Button>
                  <Spinner /> Generating...
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default PreviewPanel
