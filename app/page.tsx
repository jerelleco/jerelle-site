import ClientPage from './ClientPage'
import { getServices, getClients, getProcess, getProcessGallery } from '@/lib/content'

export default function Home() {
  const allServices = getServices()
  const { clients, whiteLogos } = getClients()
  const { steps } = getProcess()
  const galleryImages = getProcessGallery()

  return (
    <ClientPage
      allServices={allServices}
      clients={clients}
      whiteLogos={whiteLogos}
      steps={steps}
      galleryImages={galleryImages}
    />
  )
}
