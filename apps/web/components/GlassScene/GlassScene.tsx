'use client'

import { SceneRoot, Blob1, Blob2, Blob3 } from './GlassScene.styles'

export interface GlassSceneProps {
  /** 'fixed' para páginas completas (login/register), 'absolute' para secciones (Hero) */
  position?: 'fixed' | 'absolute'
}

const GlassScene = ({ position = 'fixed' }: GlassSceneProps) => (
  <SceneRoot $position={position} aria-hidden="true">
    <Blob1 />
    <Blob2 />
    <Blob3 />
  </SceneRoot>
)

export default GlassScene
