import MaterialFlowViz from '@/components/climate-podcast/MaterialFlowViz'
import fs from 'fs/promises'
import path from 'path'
import Papa from 'papaparse'

async function getMaterialData() {
  const filePath = path.join(process.cwd(), 'src/app/data/material-flow.tsv')
  const fileContent = await fs.readFile(filePath, 'utf-8')

  return new Promise<any[]>((resolve, reject) => {
    Papa.parse(fileContent, {
      delimiter: '\t',
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data.map((row) => {
          const country = (row as { [key: string]: string })[
            'freq,indic_env,material,unit,geo\\TIME_PERIOD'
          ].split(',')[4]
          const yearValues: { [key: string]: number | null } = {}

          Object.entries(row as { [key: string]: string }).forEach(
            ([key, value]) => {
              if (key !== 'freq,indic_env,material,unit,geo\\TIME_PERIOD') {
                yearValues[key] =
                  value === ':'
                    ? null
                    : parseFloat(value.replace(' s', '').replace(' e', ''))
              }
            },
          )

          return {
            country,
            ...yearValues,
          }
        })
        resolve(parsedData)
      },
      error: (error: Error) => reject(error),
    })
  })
}

export async function MaterialFlowData() {
  const data: any[] = await getMaterialData()
  const topCountries = data
    .filter((d) => d['2023'])
    .sort((a, b) => b['2023'] - a['2023'])
    .slice(0, 10)

  return (
    <MaterialFlowViz initialData={data} initialTopCountries={topCountries} />
  )
}
