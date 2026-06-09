import { useWindowDimensions } from 'react-native'
import { breakpoints }         from '@kore/tokens'

export const useDeviceWidths = () => {
  const { width } = useWindowDimensions()
  return {
    isTablet:  width >= breakpoints.tablet,
    isDesktop: width >= breakpoints.desktop,
    isWide:    width >= breakpoints.wide,
    width,
  }
}
