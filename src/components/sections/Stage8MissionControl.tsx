'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_CONFIG } from '@/config'
import { useSceneStore } from '@/store/sceneStore'

// ─── Types ───────────────────────────────────────────────────────────────────
type ProjectType = 'landing' | 'website-small' | 'website-large' | 'ecommerce' | null
type Timeline = 'express' | 'standard' | 'relaxed' | null
type Addons = {
  branding: boolean
  automation: boolean
  content: boolean
  domain: boolean
  hosting: boolean
  integrations: boolean
}

type FormData = {
  name: string
  company: string
  businessType: string
  objective: string
  projectType: ProjectType
  timeline: Timeline
  addons: Addons
  comments: string
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
const BASE_PRICES: Record<string, number> = {
  landing: 350,
  'website-small': 1200,
  'website-large': 2500,
  ecommerce: 3500,
}
const ADDON_PRICES: Record<string, number> = {
  branding: 600,
  automation: 800,
  content: 400,
  domain: 30,
  hosting: 120,
  integrations: 400,
}
const TIMELINE_MULT: Record<string, number> = {
  express: 1.3,
  standard: 1.0,
  relaxed: 0.9,
}
const TIMELINE_WEEKS: Record<string, string> = {
  express: '1–2',
  standard: '2–4',
  relaxed: '4–8',
}

// ─── Pre-fill from Section 3's selected service windows ───────────────────────
const SERVICE_TO_PROJECT_TYPE: Record<string, ProjectType> = {
  'Landing Pages': 'landing',
  'Sitios Web': 'website-small',
}
const SERVICE_TO_ADDON: Record<string, keyof Addons> = {
  Branding: 'branding',
  'Automatización IA': 'automation',
  Contenido: 'content',
}

function buildInitialForm(): FormData {
  const selectedServices = useSceneStore.getState().selectedServices
  const addons: Addons = {
    branding: false,
    automation: false,
    content: false,
    domain: false,
    hosting: false,
    integrations: false,
  }
  let projectType: ProjectType = null
  selectedServices.forEach((name) => {
    if (SERVICE_TO_PROJECT_TYPE[name] && !projectType) projectType = SERVICE_TO_PROJECT_TYPE[name]
    if (SERVICE_TO_ADDON[name]) addons[SERVICE_TO_ADDON[name]] = true
  })
  return {
    name: '',
    company: '',
    businessType: '',
    objective: '',
    projectType,
    timeline: null,
    addons,
    comments: '',
  }
}

function calcPrice(form: FormData) {
  if (!form.projectType || !form.timeline) return { price: 0, weeks: '' }
  const base = BASE_PRICES[form.projectType] || 0
  const addons = Object.entries(form.addons).reduce((sum, [k, v]) => {
    return sum + (v ? ADDON_PRICES[k] || 0 : 0)
  }, 0)
  return {
    price: Math.round((base + addons) * TIMELINE_MULT[form.timeline]),
    weeks: TIMELINE_WEEKS[form.timeline],
  }
}

function buildWhatsApp(form: FormData, price: number, weeks: string) {
  const addonNames: Record<string, string> = {
    branding: 'Branding / Identidad',
    automation: 'Automatización IA',
    content: 'Copywriting',
    domain: 'Dominio .com',
    hosting: 'Hosting (1 año)',
    integrations: 'Integraciones',
  }
  const addonList = Object.entries(form.addons)
    .filter(([, v]) => v)
    .map(([k]) => `• ${addonNames[k]}`)
    .join('\n')
  const typeNames: Record<string, string> = {
    landing: 'Landing Page',
    'website-small': 'Sitio Web (2–5 págs)',
    'website-large': 'Sitio Web Avanzado (6–10 págs)',
    ecommerce: 'E-commerce',
  }
  const tlNames: Record<string, string> = {
    express: 'Express (1–2 sem)',
    standard: 'Standard (2–4 sem)',
    relaxed: 'Relajado (4–8 sem)',
  }
  const msg =
    `Hola NEGR0CALDERON 👋\n\nSoy ${form.name}${form.company ? ` de ${form.company}` : ''}.\n\n` +
    `✈️ *SOLICITUD DE PROYECTO*\n\n` +
    `📋 *Detalles*\n• Tipo de negocio: ${form.businessType}\n• Objetivo: ${form.objective}\n\n` +
    `🚀 *Servicios*\n• Proyecto: ${form.projectType ? typeNames[form.projectType] : ''}\n• Timeline: ${form.timeline ? tlNames[form.timeline] : ''}` +
    (addonList ? `\n\n🔧 *Add-ons*\n${addonList}` : '') +
    `\n\n💰 *Presupuesto estimado*\n$${price.toLocaleString()} USD\n\n` +
    `⏱ *Tiempo estimado*\n${weeks} semanas` +
    (form.comments ? `\n\n💬 *Comentarios*\n${form.comments}` : '') +
    `\n\n¡Listo para despegar! ✈️`
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Option({
  selected,
  onClick,
  label,
  sub,
}: {
  selected: boolean
  onClick: () => void
  label: string
  sub?: string
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="pointer"
      style={{
        background: selected ? 'rgba(240,237,232,0.07)' : 'transparent',
        border: `1px solid ${selected ? 'rgba(240,237,232,0.4)' : 'rgba(240,237,232,0.1)'}`,
        color: selected ? 'rgba(240,237,232,0.95)' : 'rgba(240,237,232,0.5)',
        padding: '1rem 1.5rem',
        cursor: 'none',
        textAlign: 'left',
        transition: 'all 0.25s ease',
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}
    >
      <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 400 }}>
        {label}
      </span>
      {sub && (
        <span
          style={{
            display: 'block',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            opacity: 0.5,
            marginTop: '0.25rem',
          }}
        >
          {sub}
        </span>
      )}
    </button>
  )
}

function CheckOption({
  checked,
  onClick,
  label,
  price,
}: {
  checked: boolean
  onClick: () => void
  label: string
  price: string
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="pointer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        background: checked ? 'rgba(240,237,232,0.05)' : 'transparent',
        border: `1px solid ${checked ? 'rgba(240,237,232,0.3)' : 'rgba(240,237,232,0.08)'}`,
        color: checked ? 'rgba(240,237,232,0.9)' : 'rgba(240,237,232,0.45)',
        padding: '0.85rem 1.2rem',
        cursor: 'none',
        textAlign: 'left',
        transition: 'all 0.25s ease',
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
        width: '100%',
      }}
    >
      <span
        style={{
          width: '14px',
          height: '14px',
          border: `1px solid ${checked ? 'rgba(240,237,232,0.6)' : 'rgba(240,237,232,0.2)'}`,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.6rem',
        }}
      >
        {checked ? '✓' : ''}
      </span>
      <span style={{ flex: 1, fontSize: '0.85rem' }}>{label}</span>
      <span
        style={{
          fontSize: '0.65rem',
          opacity: 0.4,
          letterSpacing: '0.05em',
        }}
      >
        +{price}
      </span>
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function Stage8MissionControl() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  const [form, setForm] = useState<FormData>(buildInitialForm)

  const { price, weeks } = calcPrice(form)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 70%', once: true },
    })
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  // Animate step transitions
  const goStep = useCallback((n: number) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setStep(n)
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
      },
    })
  }, [])

  const toggleAddon = (key: keyof Addons) => {
    setForm((f) => ({
      ...f,
      addons: { ...f.addons, [key]: !f.addons[key] },
    }))
  }

  const canContinue = [
    form.name.trim() !== '',
    form.businessType.trim() !== '',
    form.objective.trim() !== '',
    form.projectType !== null,
    form.timeline !== null,
    true, // addons step always ok
    true, // comments step always ok
  ][step]

  const TOTAL_STEPS = 7
  const progress = step < TOTAL_STEPS ? (step / TOTAL_STEPS) * 100 : 100

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>
              PASO 1 / 7 — IDENTIFICACIÓN
            </p>
            <h3
              className="display-md"
              style={{ marginBottom: '2.5rem', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
            >
              ¿Cómo te llamas?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
              <input
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Empresa / Proyecto (opcional)"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>
        )
      case 1:
        return (
          <div>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>
              PASO 2 / 7 — CONTEXTO
            </p>
            <h3
              className="display-md"
              style={{ marginBottom: '2.5rem', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
            >
              ¿A qué se dedica
              <br />
              <em className="editorial">tu negocio?</em>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
              <input
                type="text"
                placeholder="Ej: Consultoría de marketing, tienda de ropa..."
                value={form.businessType}
                onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Objetivo principal del proyecto"
                value={form.objective}
                onChange={(e) => setForm((f) => ({ ...f, objective: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>
              PASO 3 / 7 — PROYECTO
            </p>
            <h3
              className="display-md"
              style={{ marginBottom: '2.5rem', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
            >
              ¿Qué necesitas?
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
                maxWidth: '600px',
              }}
            >
              {[
                { v: 'landing', l: 'Landing Page', s: 'desde $350' },
                { v: 'website-small', l: 'Sitio Web (2–5 págs)', s: 'desde $1,200' },
                { v: 'website-large', l: 'Sitio Web Avanzado', s: 'desde $2,500' },
                { v: 'ecommerce', l: 'E-commerce', s: 'desde $3,500' },
              ].map((o) => (
                <Option
                  key={o.v}
                  selected={form.projectType === o.v}
                  onClick={() => setForm((f) => ({ ...f, projectType: o.v as ProjectType }))}
                  label={o.l}
                  sub={o.s}
                />
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>
              PASO 4 / 7 — AGENDA
            </p>
            <h3
              className="display-md"
              style={{ marginBottom: '2.5rem', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
            >
              ¿Cuándo necesitas
              <br />
              <em className="editorial">despegar?</em>
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '0.75rem',
                maxWidth: '540px',
              }}
            >
              {[
                { v: 'express', l: '⚡ Express', s: '1–2 semanas · +30%' },
                { v: 'standard', l: 'Standard', s: '2–4 semanas' },
                { v: 'relaxed', l: 'Relajado', s: '4–8 semanas · −10%' },
              ].map((o) => (
                <Option
                  key={o.v}
                  selected={form.timeline === o.v}
                  onClick={() => setForm((f) => ({ ...f, timeline: o.v as Timeline }))}
                  label={o.l}
                  sub={o.s}
                />
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>
              PASO 5 / 7 — COMPLEMENTOS
            </p>
            <h3
              className="display-md"
              style={{ marginBottom: '2.5rem', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
            >
              ¿Qué más
              <br />
              <em className="editorial">necesitas?</em>
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                maxWidth: '520px',
              }}
            >
              {[
                { k: 'branding', l: 'Branding / Identidad Visual', p: '$600' },
                { k: 'automation', l: 'Automatización con IA', p: '$800' },
                { k: 'content', l: 'Copywriting / Contenido', p: '$400' },
                { k: 'domain', l: 'Dominio (.com, 1 año)', p: '$30' },
                { k: 'hosting', l: 'Hosting (1 año)', p: '$120' },
                { k: 'integrations', l: 'Integraciones (CRM, Email, Analytics)', p: '$400' },
              ].map((o) => (
                <CheckOption
                  key={o.k}
                  checked={form.addons[o.k as keyof Addons]}
                  onClick={() => toggleAddon(o.k as keyof Addons)}
                  label={o.l}
                  price={o.p}
                />
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>
              PASO 6 / 7 — COMENTARIOS
            </p>
            <h3
              className="display-md"
              style={{ marginBottom: '2.5rem', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
            >
              ¿Algo más que
              <br />
              <em className="editorial">quieras compartir?</em>
            </h3>
            <textarea
              placeholder="Referencias, ideas, restricciones, deadline específico..."
              value={form.comments}
              onChange={(e) => setForm((f) => ({ ...f, comments: e.target.value }))}
              rows={4}
              style={{
                ...inputStyle,
                maxWidth: '520px',
                resize: 'vertical',
                minHeight: '120px',
              }}
            />
          </div>
        )
      case 6:
        return (
          <div style={{ maxWidth: '600px' }}>
            <p className="label-text" style={{ marginBottom: '1.5rem' }}>
              RESUMEN DE VUELO
            </p>
            <h3
              className="display-md"
              style={{ marginBottom: '3rem', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
            >
              Tu proyecto,
              <br />
              <em className="editorial">listo para despegar.</em>
            </h3>

            <div
              style={{
                borderTop: '1px solid rgba(240,237,232,0.1)',
                paddingTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}
            >
              <SummaryRow label="Pasajero" value={`${form.name}${form.company ? `, ${form.company}` : ''}`} />
              <SummaryRow label="Sector" value={form.businessType} />
              <SummaryRow label="Proyecto" value={form.projectType
                ? { landing: 'Landing Page', 'website-small': 'Sitio Web', 'website-large': 'Sitio Web Avanzado', ecommerce: 'E-commerce' }[form.projectType]
                : '—'} />
              <SummaryRow label="Timeline" value={form.timeline
                ? { express: 'Express (1–2 sem)', standard: 'Standard (2–4 sem)', relaxed: 'Relajado (4–8 sem)' }[form.timeline]
                : '—'} />
              <SummaryRow
                label="Add-ons"
                value={
                  Object.entries(form.addons)
                    .filter(([, v]) => v)
                    .map(([k]) => ({ branding: 'Branding', automation: 'IA', content: 'Contenido', domain: 'Dominio', hosting: 'Hosting', integrations: 'Integraciones' }[k]))
                    .join(', ') || 'Ninguno'
                }
              />
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(240,237,232,0.1)',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '2.5rem',
              }}
            >
              <div>
                <p className="label-text" style={{ marginBottom: '0.5rem' }}>
                  INVERSIÓN ESTIMADA
                </p>
                <p
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    color: 'rgba(240,237,232,0.95)',
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  }}
                >
                  ${price.toLocaleString()}
                  <span style={{ fontSize: '1rem', opacity: 0.4, marginLeft: '0.5rem' }}>USD</span>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="label-text" style={{ marginBottom: '0.5rem' }}>
                  TIEMPO ESTIMADO
                </p>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    color: 'rgba(240,237,232,0.75)',
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  }}
                >
                  {weeks} sem.
                </p>
              </div>
            </div>

            <a
              href={buildWhatsApp(form, price, weeks)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(240,237,232,0.06)',
                border: '1px solid rgba(240,237,232,0.25)',
                color: 'rgba(240,237,232,0.9)',
                padding: '1.1rem 2.5rem',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.35s ease',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                cursor: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(240,237,232,0.1)'
                el.style.borderColor = 'rgba(240,237,232,0.6)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(240,237,232,0.06)'
                el.style.borderColor = 'rgba(240,237,232,0.25)'
              }}
            >
              ✈️ &nbsp;Abrir puerta de embarque
            </a>

            <p
              className="body-text"
              style={{ marginTop: '1.5rem', fontSize: '0.75rem', opacity: 0.3 }}
            >
              Esto abrirá WhatsApp con tu resumen completo ya redactado.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section
      id="mission-control"
      ref={sectionRef}
      className="stage-section"
      style={{
        minHeight: '100vh',
        padding: '15vh 2rem 10vh',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <span
          className="label-text"
          style={{ display: 'block', marginBottom: '2rem' }}
        >
          08 — MISSION CONTROL
        </span>

        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '1px',
            background: 'rgba(240,237,232,0.08)',
            marginBottom: '6vh',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'rgba(240,237,232,0.5)',
              transition: 'width 0.5s ease',
            }}
          />
        </div>

        {/* Step content */}
        <div ref={contentRef}>{renderStep()}</div>

        {/* Navigation */}
        {step < 6 && (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '3rem',
            }}
          >
            {step > 0 && (
              <button
                onClick={() => goStep(step - 1)}
                data-cursor="pointer"
                style={{
                  ...navBtnStyle,
                  color: 'rgba(240,237,232,0.35)',
                  borderColor: 'rgba(240,237,232,0.1)',
                }}
              >
                ← Anterior
              </button>
            )}
            <button
              onClick={() => canContinue && goStep(step + 1)}
              disabled={!canContinue}
              data-cursor="pointer"
              style={{
                ...navBtnStyle,
                opacity: canContinue ? 1 : 0.3,
                cursor: canContinue ? 'none' : 'default',
              }}
            >
              {step === 5 ? 'Ver resumen →' : 'Continuar →'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '2rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid rgba(240,237,232,0.05)',
      }}
    >
      <span className="label-text" style={{ minWidth: '120px' }}>
        {label}
      </span>
      <span
        style={{
          fontSize: '0.85rem',
          color: 'rgba(240,237,232,0.65)',
          textAlign: 'right',
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
        }}
      >
        {value}
      </span>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1px solid rgba(240,237,232,0.12)',
  borderRadius: 0,
  color: 'rgba(240,237,232,0.85)',
  padding: '0.9rem 1rem',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
  transition: 'border-color 0.25s ease',
}

const navBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(240,237,232,0.2)',
  color: 'rgba(240,237,232,0.7)',
  padding: '0.85rem 2rem',
  fontSize: '0.7rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  cursor: 'none',
  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
  transition: 'all 0.25s ease',
}
