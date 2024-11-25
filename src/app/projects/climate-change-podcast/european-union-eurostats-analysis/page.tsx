import Analysis from './analysis.mdx'
import { Prose } from '@/components/Prose'
import DownloadButton from '@/components/climate-podcast/DownloadMaterialFlowDataButton'

export default function Page() {
  return (
    <>
      <Prose>
        <Analysis />
      </Prose>
      {/* <MaterialFlowData /> */}
      <DownloadButton />
    </>
  )
}
