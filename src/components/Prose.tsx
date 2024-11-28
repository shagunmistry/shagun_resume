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
        // Base prose customization
        'prose-headings:scroll-mt-16',
        'prose-h1:mb-8 prose-h1:text-3xl prose-h1:font-bold prose-h1:tracking-tight',
        'prose-h2:mb-6 prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight',
        'prose-h3:mb-4 prose-h3:text-xl prose-h3:font-semibold',
        'prose-p:text-gray-700 dark:prose-p:text-gray-300',
        'prose-p:leading-relaxed',

        // Link styling
        'prose-a:text-blue-600 dark:prose-a:text-blue-400',
        'prose-a:no-underline hover:prose-a:underline',
        'prose-a:font-medium',

        // Strong text
        'prose-strong:text-gray-900 dark:prose-strong:text-white',
        'prose-strong:font-semibold',

        // Enhanced list styling
        // Unordered lists
        'prose-ul:my-6 prose-ul:space-y-2',
        'prose-ul:list-none',
        '[&>ul>li]:relative [&>ul>li]:pl-6',
        '[&>ul>li]:before:absolute [&>ul>li]:before:left-1 [&>ul>li]:before:top-2.5',
        '[&>ul>li]:before:size-1.5 [&>ul>li]:before:rounded-full',
        '[&>ul>li]:before:bg-gray-300 dark:[&>ul>li]:before:bg-gray-700',
        // Nested unordered lists
        '[&>ul>li>ul]:mt-2 [&>ul>li>ul]:space-y-1',
        '[&>ul>li>ul>li]:relative [&>ul>li>ul>li]:pl-6',
        '[&>ul>li>ul>li]:before:absolute [&>ul>li>ul>li]:before:left-1 [&>ul>li>ul>li]:before:top-2.5',
        '[&>ul>li>ul>li]:before:size-1 [&>ul>li>ul>li]:before:rounded-full',
        '[&>ul>li>ul>li]:before:bg-gray-300 dark:[&>ul>li>ul>li]:before:bg-gray-700',

        // Ordered lists
        'prose-ol:counter-reset-[item] prose-ol:my-6 prose-ol:list-none',
        'prose-ol:space-y-2',
        '[&>ol>li]:relative [&>ol>li]:pl-10',
        '[&>ol>li]:before:absolute [&>ol>li]:before:left-0 [&>ol>li]:before:top-0',
        '[&>ol>li]:before:text-sm [&>ol>li]:before:font-medium',
        '[&>ol>li]:before:text-gray-500 dark:[&>ol>li]:before:text-gray-400',
        '[&>ol>li]:before:counter-increment-[item] [&>ol>li]:before:content-[counter(item)]',
        // Nested ordered lists
        '[&>ol>li>ol]:mt-2 [&>ol>li>ol]:space-y-1',
        '[&>ol>li>ol>li]:relative [&>ol>li>ol>li]:pl-8',
        '[&>ol>li>ol>li]:before:left-0 [&>ol>li>ol>li]:before:top-0',
        '[&>ol>li>ol>li]:before:text-sm',

        // List content styling
        'prose-li:text-gray-700 dark:prose-li:text-gray-300',
        'prose-li:leading-relaxed',

        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700',
        'prose-blockquote:pl-4 prose-blockquote:italic',
        'prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300',

        // Images
        'prose-img:rounded-lg prose-img:shadow-md',

        // Horizontal rules
        'prose-hr:my-8 prose-hr:border-gray-200 dark:prose-hr:border-gray-800',

        // Container constraints
        '[&>*]:mx-auto [&>*]:max-w-3xl',
        // Custom components
        '[&>.CalloutBox]:my-8 [&>.CalloutBox]:max-w-none',
      )}
      {...props}
    />
  )
}
