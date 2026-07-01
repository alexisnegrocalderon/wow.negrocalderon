import { SITE_CONFIG } from '@/config'
import type { Service } from '@/lib/servicesData'

export function buildServicesWhatsAppMessage(selected: Service[]) {
  const serviceList = selected.map((s) => `• ${s.name} (${s.price})`).join('\n')

  return (
    `Hola NEGR0CALDERON 👋\n\n` +
    `Quiero solicitar un presupuesto para mi proyecto.\n\n` +
    `✈️ *SERVICIOS SELECCIONADOS*\n${serviceList}\n\n` +
    `📋 *Plan de trabajo*\n` +
    `Me gustaría que me cuenten cómo armarían el plan de trabajo y los tiempos ` +
    `para estos servicios.\n\n` +
    `¡Listo para despegar! ✈️`
  )
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}
