import type { Meta, StoryObj } from '@storybook/react'
import StatCard from './StatCard'
import Icon    from '../Icon/Icon'

const meta: Meta<typeof StatCard> = {
  title:      'KORE/Atoms/StatCard',
  component:  StatCard,
  tags:       ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    value: 24,
    label: 'Entrenamientos',
  },
}
export default meta

type Story = StoryObj<typeof StatCard>

export const Default: Story = {}

export const ConIcono: Story = {
  args: {
    icon: <Icon name="Dumbbell" size="sm" color="inherit" />,
  },
}

export const TendenciaPositiva: Story = {
  args: {
    icon:       <Icon name="TrendingUp" size="sm" color="inherit" />,
    trend:      'up',
    trendValue: '+3 esta semana',
  },
}

export const TendenciaNegativa: Story = {
  args: {
    value:      '68 kg',
    label:      'Peso actual',
    icon:       <Icon name="Scale" size="sm" color="inherit" />,
    trend:      'down',
    trendValue: '−1.2 kg',
  },
}

export const SoloValor: Story = {
  args: {
    value: '🔥 14',
    label: 'Racha actual',
  },
}

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 220px)', gap: 16 }}>
      <StatCard value={24}      label="Entrenamientos" />
      <StatCard value="68 kg"   label="Peso actual"     trend="down"    trendValue="−1.2 kg" />
      <StatCard value="14 días" label="Racha"           trend="up"      trendValue="+3 días" />
      <StatCard value="1.840"   label="Calorías"        trend="neutral" trendValue="igual que ayer" />
    </div>
  ),
}
