import { ImageResponse } from 'next/og'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt         = 'Juan Antonio Amate — Mid Frontend Developer'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:     '#1A1A1A',
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'flex-start',
          justifyContent: 'flex-end',
          padding:        '64px 72px',
          position:       'relative',
        }}
      >
        {/* Gradiente de acento terracota */}
        <div
          style={{
            position:   'absolute',
            top:        0,
            right:      0,
            width:      '50%',
            height:     '100%',
            background: 'radial-gradient(ellipse at 80% 30%, rgba(176,94,58,0.18) 0%, transparent 65%)',
          }}
        />

        {/* Logo KORE */}
        <div
          style={{
            position:    'absolute',
            top:         64,
            right:       72,
            color:       '#B05E3A',
            fontSize:    52,
            fontWeight:  300,
            letterSpacing: '0.08em',
          }}
        >
          KORE
        </div>

        {/* Overline */}
        <div
          style={{
            color:         '#B05E3A',
            fontSize:      14,
            fontWeight:    600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom:  20,
          }}
        >
          Portfolio técnico
        </div>

        {/* Nombre */}
        <div
          style={{
            color:         '#F7F4F1',
            fontSize:      68,
            fontWeight:    300,
            letterSpacing: '-0.02em',
            lineHeight:    1,
            marginBottom:  16,
          }}
        >
          Juan Antonio Amate
        </div>

        {/* Rol */}
        <div
          style={{
            color:      'rgba(247,244,241,0.65)',
            fontSize:   24,
            fontWeight: 400,
            marginBottom: 32,
          }}
        >
          Mid Frontend Developer · React / React Native
        </div>

        {/* Stack chips */}
        <div style={{ display: 'flex', gap: 10 }}>
          {['React 19', 'Next.js 16', 'TypeScript', 'GSAP', 'Turborepo'].map(tech => (
            <div
              key={tech}
              style={{
                background:    'rgba(176,94,58,0.12)',
                border:        '0.5px solid rgba(176,94,58,0.4)',
                borderRadius:  100,
                padding:       '6px 16px',
                color:         '#B05E3A',
                fontSize:      13,
                fontWeight:    600,
                letterSpacing: '0.04em',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
