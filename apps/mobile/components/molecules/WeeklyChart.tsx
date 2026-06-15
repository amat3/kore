import React, { useState }            from 'react'
import { View, type LayoutChangeEvent } from 'react-native'
import Svg, { Rect, Text as SvgText } from 'react-native-svg'
import { Fonts }                      from '@/constants/fonts'

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const GAP    = 10
const HEIGHT = 80

export interface WeeklyChartProps {
  data:   number[]   // 7 valores, lun…dom
  accent: string
  fg:     string
  border: string
}

const WeeklyChart = ({ data, accent, fg, border }: WeeklyChartProps) => {
  const [width, setWidth] = useState(0)
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)

  const barW = (width - GAP * 6) / 7
  const max  = Math.max(...data, 1)

  return (
    <View onLayout={onLayout} style={{ width: '100%' }}>
      {width > 0 && (
        <Svg width={width} height={HEIGHT + 24}>
          {data.map((val, i) => {
            const barH = Math.max((val / max) * HEIGHT, val > 0 ? 4 : 2)
            const x    = i * (barW + GAP)
            const y    = HEIGHT - barH
            return (
              <React.Fragment key={i}>
                <Rect
                  x={x} y={y} width={barW} height={barH}
                  rx={4} fill={val > 0 ? accent : border}
                  opacity={val > 0 ? 1 : 0.4}
                />
                <SvgText
                  x={x + barW / 2} y={HEIGHT + 16}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily={Fonts.uiRegular}
                  fill={fg}
                >
                  {DAYS[i]}
                </SvgText>
              </React.Fragment>
            )
          })}
        </Svg>
      )}
    </View>
  )
}

export default WeeklyChart
