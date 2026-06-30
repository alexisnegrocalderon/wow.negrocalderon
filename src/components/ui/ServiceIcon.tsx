import type { ServiceIconKey } from '@/lib/servicesData'

type ServiceIconProps = {
  icon: ServiceIconKey
  size?: number
  color?: string
}

const PATHS: Record<ServiceIconKey, React.ReactNode> = {
  web: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.4 4 5.3 4 8.5s-1.4 6.1-4 8.5M12 3.5c-2.6 2.4-4 5.3-4 8.5s1.4 6.1 4 8.5" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3l1.8 5.6L19.5 10l-5.7 1.4L12 17l-1.8-5.6L4.5 10l5.7-1.4L12 3z" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3.5a4 4 0 00-4 4v.3a3.2 3.2 0 00-1.7 5.6A3.4 3.4 0 008 19.5h8a3.4 3.4 0 001.7-6.1A3.2 3.2 0 0016 7.8v-.3a4 4 0 00-4-4z" />
      <path d="M9.5 13.5h5M10 16.5h4" />
    </>
  ),
  content: (
    <>
      <rect x="3.5" y="6" width="17" height="13" rx="1.5" />
      <path d="M3.5 9.5h17M8 6V4.5h8V6" />
    </>
  ),
  growth: (
    <>
      <path d="M4 18.5l5-5.5 3.5 3 6-7" />
      <path d="M15.5 8.5h3v3" />
    </>
  ),
  maintenance: (
    <>
      <path d="M14.7 6.3a3.5 3.5 0 01-4.6 4.6L4.5 16.5a1.6 1.6 0 002.2 2.2l5.6-5.6a3.5 3.5 0 014.6-4.6l-2.4 2.4-1.6-1.6 2.4-2.4z" />
    </>
  ),
  events: (
    <>
      <rect x="3.5" y="5.5" width="17" height="14" rx="1.5" />
      <path d="M3.5 10h17M8 3.5V7M16 3.5V7" />
    </>
  ),
}

export function ServiceIcon({ icon, size = 22, color = 'rgba(212,175,90,0.85)' }: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[icon]}
    </svg>
  )
}
