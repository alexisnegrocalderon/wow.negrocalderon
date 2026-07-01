export type ServiceIconKey =
  | 'web'
  | 'brand'
  | 'ai'
  | 'content'
  | 'growth'
  | 'maintenance'
  | 'events'

export type Service = {
  number: string
  name: string
  icon: ServiceIconKey
  description: string
  checklist: string[]
  idealPara: string[]
  price: string
}

export const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Web Experiences',
    icon: 'web',
    description:
      'Tu presencia digital, diseñada para convertir. Desde landing pages directas hasta sitios multi-página con arquitectura premium.',
    checklist: [
      'Landing pages de alta conversión',
      'Sitios multi-página',
      'SEO técnico',
      'Mobile-first',
      'Performance optimizado',
    ],
    idealPara: ['Negocios', 'Emprendedores', 'Startups'],
    price: 'desde $350',
  },
  {
    number: '02',
    name: 'Brand Powering',
    icon: 'brand',
    description:
      'Construimos marcas auténticas con identidad, estrategia y propósito para destacar y conectar.',
    checklist: [
      'Estrategia de marca',
      'Identidad visual',
      'Posicionamiento',
      'Arquitectura de marca',
      'Brand storytelling',
    ],
    idealPara: ['Negocios', 'Emprendedores', 'Startups'],
    price: 'desde $600',
  },
  {
    number: '03',
    name: 'AI & Automation',
    icon: 'ai',
    description:
      'Procesos que trabajan mientras duermes. CRM, email flows, chatbots, integraciones inteligentes.',
    checklist: [
      'n8n / Make',
      'Chatbots con IA',
      'Email flows automatizados',
      'Integraciones CRM',
      'Reportes automáticos',
    ],
    idealPara: ['Negocios', 'Equipos en crecimiento', 'E-commerce'],
    price: 'desde $800',
  },
  {
    number: '04',
    name: 'Content Studio',
    icon: 'content',
    description:
      'Copy que vende sin sonar a vendedor. Web, email, redes — con intención y con voz propia.',
    checklist: [
      'Copywriting estratégico',
      'Contenido para redes',
      'Email marketing',
      'SEO content',
      'Guion y storytelling',
    ],
    idealPara: ['Marcas personales', 'Negocios', 'Startups'],
    price: 'desde $400',
  },
  {
    number: '05',
    name: 'Growth Strategy',
    icon: 'growth',
    description:
      'Estrategia de crecimiento basada en datos. Funnels, paid ads y optimización de conversión para escalar con intención.',
    checklist: [
      'Estrategia de funnels',
      'Paid ads (Meta/Google)',
      'Optimización de conversión',
      'Analítica y reporting',
      'Roadmap de crecimiento',
    ],
    idealPara: ['Negocios en escalamiento', 'E-commerce', 'Startups'],
    price: 'desde $700',
  },
  {
    number: '06',
    name: 'Maintenance & Support',
    icon: 'maintenance',
    description:
      'Tu sitio, siempre en óptimas condiciones. Actualizaciones, monitoreo y soporte técnico continuo.',
    checklist: [
      'Actualizaciones mensuales',
      'Monitoreo de uptime',
      'Backups automáticos',
      'Soporte prioritario',
      'Mejoras incrementales',
    ],
    idealPara: ['Negocios activos', 'E-commerce', 'Sitios en producción'],
    price: 'desde $90/mes',
  },
  {
    number: '07',
    name: 'Events & Experiences',
    icon: 'events',
    description:
      'Microsites y landing pages para tu próximo evento. Registro, ticketing y una experiencia digital memorable.',
    checklist: [
      'Landing de evento',
      'Registro y ticketing',
      'Countdown y agenda',
      'Integración con email',
      'Diseño a medida',
    ],
    idealPara: ['Eventos', 'Conferencias', 'Lanzamientos'],
    price: 'desde $450',
  },
]
