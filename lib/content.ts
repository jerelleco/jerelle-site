import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  price: string
  features: string[]
  image: string
  imagePosition: 'left' | 'right'
  active: boolean
  order: number
}

export interface Client {
  name: string
  logo: string
}

export interface ClientsData {
  clients: Client[]
  whiteLogos: string[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  details: string[]
}

export interface ProcessData {
  steps: ProcessStep[]
}

export interface ProcessGalleryImage {
  src: string
}

export function getServices(): Service[] {
  const servicesDirectory = path.join(contentDirectory, 'services')
  
  // Check if directory exists
  if (!fs.existsSync(servicesDirectory)) {
    console.error('Services directory does not exist:', servicesDirectory)
    return []
  }

  const filenames = fs.readdirSync(servicesDirectory)
  console.log('All files found:', filenames)
  
  const services = filenames
    .filter(filename => {
      const isJson = filename.endsWith('.json')
      console.log(`${filename} - is JSON: ${isJson}`)
      return isJson
    })
    .map(filename => {
      const filePath = path.join(servicesDirectory, filename)
      console.log(`\n>>> Reading file: ${filename}`)
      console.log(`>>> Full path: ${filePath}`)
      
      const fileContents = fs.readFileSync(filePath, 'utf8')
      console.log(`>>> File size: ${fileContents.length} chars`)
      console.log(`>>> Content preview: ${fileContents.substring(0, 50)}...`)
      console.log(`>>> Content end: ...${fileContents.substring(fileContents.length - 50)}`)
      
      try {
        const parsed = JSON.parse(fileContents)
        console.log(`>>> ✓ Successfully parsed ${filename}`)
        return parsed
      } catch (error) {
        console.error(`>>> ✗ FAILED to parse ${filename}`)
        console.error(`>>> Error:`, error)
        console.error(`>>> Full file contents:`)
        console.error(fileContents)
        throw error
      }
    })
    .filter(service => service.active)
    .sort((a, b) => a.order - b.order)

  console.log(`\n>>> Total services loaded: ${services.length}`)
  return services
}

export function getClients(): ClientsData {
  const clientsPath = path.join(contentDirectory, 'clients', 'clients.json')
  const fileContents = fs.readFileSync(clientsPath, 'utf8')
  return JSON.parse(fileContents)
}

export function getProcess(): ProcessData {
  const processPath = path.join(contentDirectory, 'process', 'process.json')
  const fileContents = fs.readFileSync(processPath, 'utf8')
  return JSON.parse(fileContents)
}

export function getProcessGallery(): ProcessGalleryImage[] {
  const filePath = path.join(contentDirectory, 'process-gallery.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)
  
  return data.images.map((src: string) => ({ src }))
}
