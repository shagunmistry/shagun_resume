import clsx from 'clsx'

export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'prose dark:prose-invert',
        // Customize prose styling
        'prose-headings:scroll-mt-16',
        'prose-h1:text-3xl prose-h1:font-bold prose-h1:tracking-tight',
        'prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight',
        'prose-h3:text-xl prose-h3:font-semibold',
        'prose-p:text-gray-700 dark:prose-p:text-gray-300',
        'prose-a:text-blue-600 dark:prose-a:text-blue-400',
        'prose-strong:text-gray-900 dark:prose-strong:text-white',
        'prose-ul:my-6 prose-ul:list-disc',
        'prose-ol:my-6 prose-ol:list-decimal',
        'prose-li:my-2',
        'prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700',
        'prose-blockquote:pl-4 prose-blockquote:italic',
        'prose-img:rounded-lg',
        'prose-hr:my-8',
        '[&>*]:mx-auto [&>*]:max-w-3xl',
        // Add custom styles for CalloutBox
        '[&>.CalloutBox]:my-8 [&>.CalloutBox]:max-w-none',
      )}
      {...props}
    />
  )
}
