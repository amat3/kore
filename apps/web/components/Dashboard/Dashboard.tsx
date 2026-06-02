'use client'

import { useRef, useState, useEffect }                from 'react'
import styled                    from '@emotion/styled'
import { motion, useInView, type Variants } from 'framer-motion'
import { Text }                             from '@kore/ui-web'
import { colorPrimitives }                 from '@kore/tokens'
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
  Cell,
  type TooltipPayload,
}                                from 'recharts'

const WEEKLY_ACTIVITY = [
  { day: 'Lun', minutes: 45 },
  { day: 'Mar', minutes: 0  },
  { day: 'Mié', minutes: 30 },
  { day: 'Jue', minutes: 60 },
  { day: 'Vie', minutes: 45 },
  { day: 'Sáb', minutes: 90 },
  { day: 'Dom', minutes: 20 },
]

const MONTHLY_STREAK = [
  { week: 'S1', days: 3 },
  { week: 'S2', days: 5 },
  { week: 'S3', days: 4 },
  { week: 'S4', days: 6 },
  { week: 'S5', days: 7 },
  { week: 'S6', days: 5 },
  { week: 'S7', days: 7 },
  { week: 'S8', days: 6 },
]

const CATEGORY_BREAKDOWN = [
  { category: 'Fuerza',    sessions: 12, color: colorPrimitives.terracota[500] },
  { category: 'Cardio',    sessions: 8,  color: '#E25C1A' },
  { category: 'Yoga',      sessions: 6,  color: '#4D7C0F' },
  { category: 'Pilates',   sessions: 4,  color: '#6D28D9' },
  { category: 'Movilidad', sessions: 3,  color: '#0F766E' },
]

const QUICK_STATS = [
  { value: '290', unit: 'min',        label: 'Esta semana'  },
  { value: '33',  unit: 'sesiones',   label: 'Este mes'     },
  { value: '7',   unit: 'días',       label: 'Racha actual' },
  { value: '4',   unit: 'categorías', label: 'Entrenadas'   },
]

interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload; label?: string | number }

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <TooltipBox>
      <TooltipLabel variant="overline" as="p">{label}</TooltipLabel>
      {payload.map((p, i) => (
        <TooltipValue key={i} variant="h3" as="p" style={{ color: 'var(--foreground-accent-on-surface)' }}>
          {p.value} {p.name === 'minutes' ? 'min' : p.name === 'days' ? 'días' : ''}
        </TooltipValue>
      ))}
    </TooltipBox>
  )
}

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ── Contador animado ──────────────────────────────────────────────────────
const AnimatedCounter = ({ value }: { value: string }) => {
  const ref          = useRef<HTMLSpanElement>(null)
  const isInView     = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  const target       = parseInt(value)

  useEffect(() => {
    if (!isInView) return
    const duration  = 1200
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3) // ease out cubic
      setDisplay(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, target])

  return <span ref={ref}>{display}</span>
}

const Dashboard = () => {
  const barChartRef  = useRef(null)
  const lineChartRef = useRef(null)
  const catChartRef  = useRef(null)

  const barInView  = useInView(barChartRef,  { once: true, margin: '-60px' })
  const lineInView = useInView(lineChartRef, { once: true, margin: '-60px' })
  const catInView  = useInView(catChartRef,  { once: true, margin: '-60px' })

  return (
    <Section>
      <Container>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <SectionOverline variant="overline" as="span">Dashboard</SectionOverline>
          <SectionTitle variant="h1" as="h2">Datos que <em>motivan</em></SectionTitle>
          <SectionSubtitle variant="body-light">
            Visualización de actividad semanal, racha mensual y desglose por categoría.
            Recharts con animación al entrar en viewport y tooltips custom.
          </SectionSubtitle>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <StatsGrid>
            {QUICK_STATS.map(stat => (
              <motion.div key={stat.label} variants={fadeUp}>
                <StatCard>
<StatValue variant="display" as="span">
  <AnimatedCounter value={stat.value} />
</StatValue>
                  <StatUnit variant="overline" as="span">{stat.unit}</StatUnit>
                  <StatLabel variant="caption" as="span">{stat.label}</StatLabel>
                </StatCard>
              </motion.div>
            ))}
          </StatsGrid>
        </motion.div>

        <ChartsGrid>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <ChartCard ref={barChartRef}>
              <ChartTitle variant="h3" as="h3">Actividad semanal</ChartTitle>
              <ChartSubtitle variant="body-sm">Minutos entrenados por día</ChartSubtitle>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={WEEKLY_ACTIVITY} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke-secondary-on-surface)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: 'var(--foreground-tertiary-on-surface)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--foreground-tertiary-on-surface)', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip content={(props) => <CustomTooltip {...props} />} cursor={{ fill: 'var(--background-action-hover)' }} />
                  <Bar
                    dataKey="minutes"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={barInView}
                    animationBegin={0}
                    animationDuration={800}
                    animationEasing="ease-out"
                  >
                    {WEEKLY_ACTIVITY.map((entry, i) => (
                      <Cell key={i} fill={entry.minutes > 0 ? 'var(--background-accent-solid)' : 'var(--background-surface-low)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <ChartCard ref={lineChartRef}>
              <ChartTitle variant="h3" as="h3">Racha mensual</ChartTitle>
              <ChartSubtitle variant="body-sm">Días activos por semana</ChartSubtitle>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={MONTHLY_STREAK}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke-secondary-on-surface)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: 'var(--foreground-tertiary-on-surface)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 7]} tick={{ fill: 'var(--foreground-tertiary-on-surface)', fontSize: 11 }} axisLine={false} tickLine={false} width={20} />
                  <Tooltip content={(props) => <CustomTooltip {...props} />} />
                  <Line
                    type="monotone"
                    dataKey="days"
                    stroke={colorPrimitives.terracota[500]}
                    strokeWidth={2.5}
                    dot={{ fill: colorPrimitives.terracota[500], r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: colorPrimitives.terracota[500] }}
                    isAnimationActive={lineInView}
                    animationBegin={0}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ gridColumn: '1 / -1' }}
          >
            <ChartCard ref={catChartRef}>
              <ChartTitle variant="h3" as="h3">Sesiones por categoría</ChartTitle>
              <ChartSubtitle variant="body-sm">Distribución del último mes</ChartSubtitle>
              <CategoriesGrid>
                {CATEGORY_BREAKDOWN.map((cat, i) => (
                  <CategoryRow key={cat.category}>
                    <CategoryName variant="body-sm" as="span">{cat.category}</CategoryName>
                    <BarWrapper>
                      <BarFill
                        $color={cat.color}
                        $pct={cat.sessions / 12}
                        initial={{ scaleX: 0 }}
                        animate={catInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.08 }}
                      />
                    </BarWrapper>
                    <CategoryCount variant="body-sm" as="span">{cat.sessions}</CategoryCount>
                  </CategoryRow>
                ))}
              </CategoriesGrid>
            </ChartCard>
          </motion.div>

        </ChartsGrid>

      </Container>
    </Section>
  )
}

const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-block:    clamp(4rem, 10vw, 8rem);
  border-top:       0.5px solid var(--stroke-secondary-on-surface);
`

const Container = styled.div`
  max-width:      1200px;
  margin:         0 auto;
  padding-inline: var(--spacing-l);
  display:        flex;
  flex-direction: column;
  gap:            clamp(2rem, 5vw, 4rem);
  @media (min-width: 600px)  { padding-inline: var(--spacing-2xl); }
  @media (min-width: 1200px) { padding-inline: var(--spacing-3xl); }
`

const SectionOverline = styled(Text)`
  display:       block;
  margin-bottom: var(--spacing-m);
`

const SectionTitle = styled(Text)`
  font-size:   clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
  margin:      0 0 var(--spacing-m);
  em {
    font-style:  italic;
    font-weight: var(--font-weight-semibold);
    color:       var(--foreground-accent-on-surface);
  }
`

const SectionSubtitle = styled(Text)`
  color:     var(--foreground-secondary-on-surface);
  max-width: 600px;
`

const StatsGrid = styled.div`
  display:               grid;
  grid-template-columns: repeat(4, 1fr);
  gap:                   var(--spacing-m);
  @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
`

const StatCard = styled.div`
  padding:        var(--spacing-l);
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-3xs);
`

const StatValue = styled(Text)`
  font-size:   clamp(1.8rem, 3vw, 2.5rem);
  color:       var(--foreground-accent-on-surface);
  line-height: 1;
`

const StatUnit = styled(Text)`
  letter-spacing: var(--letter-spacing-spacious);
  opacity:        0.7;
`

const StatLabel = styled(Text)`
  color:      var(--foreground-secondary-on-surface);
  margin-top: var(--spacing-2xs);
`

const ChartsGrid = styled.div`
  display:               grid;
  grid-template-columns: repeat(2, 1fr);
  gap:                   var(--spacing-m);
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`

const ChartCard = styled.div`
  padding:       var(--spacing-l);
  border-radius: var(--corners-default-card);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  background:    var(--background-surface-solid);
`

const ChartTitle = styled(Text)`
  font-size: var(--scale-xl);
  margin:    0 0 var(--spacing-2xs);
`

const ChartSubtitle = styled(Text)`
  color:  var(--foreground-tertiary-on-surface);
  margin: 0 0 var(--spacing-l);
`

const TooltipBox = styled.div`
  background:    var(--background-surface-solid);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  border-radius: var(--radius-s);
  padding:       var(--spacing-s) var(--spacing-m);
  box-shadow:    0 4px 16px rgba(0,0,0,0.1);
`

const TooltipLabel = styled(Text)`
  color:          var(--foreground-secondary-on-surface);
  letter-spacing: var(--letter-spacing-spacious);
  margin:         0 0 var(--spacing-3xs);
`

const TooltipValue = styled(Text)`
  font-size: var(--scale-xl);
  margin:    0;
`

const CategoriesGrid = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-m);
  margin-top:     var(--spacing-m);
`

const CategoryRow = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-m);
`

const CategoryName = styled(Text)`
  font-weight: var(--font-weight-semibold);
  color:       var(--foreground-secondary-on-surface);
  width:       80px;
  flex-shrink: 0;
`

const BarWrapper = styled.div`
  flex:          1;
  height:        8px;
  border-radius: var(--radius-full);
  background:    var(--background-surface-low);
  overflow:      hidden;
`

const BarFill = styled(motion.div)<{ $color: string; $pct: number }>`
  height:           100%;
  width:            ${({ $pct }) => $pct * 100}%;
  border-radius:    var(--radius-full);
  background-color: ${({ $color }) => $color};
  transform-origin: left;
`

const CategoryCount = styled(Text)`
  font-weight: var(--font-weight-semibold);
  color:       var(--foreground-tertiary-on-surface);
  width:       24px;
  text-align:  right;
  flex-shrink: 0;
`

export default Dashboard
