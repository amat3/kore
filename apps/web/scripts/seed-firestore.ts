/**
 * Seed script — puebla Firestore con workouts de KORE
 *
 * Ejecutar desde apps/web:
 * npx tsx scripts/seed-firestore.ts
 */

import { initializeApp }           from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const app = initializeApp({
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
})

const db = getFirestore(app)

const WORKOUTS = [
  {
    title:       'Full body con peso libre',
    category:    'Fuerza',
    duration:    45,
    level:       'intermediate',
    imageSrc:    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    featured:    true,
    order:       1,
    description: 'Sesión completa de fuerza con mancuernas y barra. Trabajamos los principales grupos musculares en un circuito de 4 rondas: sentadillas, press de banca, peso muerto y remo. Ideal para ganar fuerza funcional y masa muscular de forma progresiva.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Yoga restaurativo',
    category:    'Yoga',
    duration:    30,
    level:       'beginner',
    imageSrc:    'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80',
    featured:    false,
    order:       2,
    description: 'Práctica suave orientada a la recuperación y la calma. Posturas sostenidas con apoyo de accesorios para liberar tensión acumulada en espalda, caderas y hombros. Perfecta para terminar el día o el día después de un entrenamiento intenso.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'HIIT explosivo',
    category:    'Cardio',
    duration:    20,
    level:       'advanced',
    imageSrc:    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80',
    featured:    true,
    order:       3,
    description: 'Entrenamiento de alta intensidad por intervalos diseñado para quemar grasa y mejorar la capacidad cardiovascular en poco tiempo. 8 ejercicios explosivos en formato 40/20. No necesitas equipamiento, solo ganas.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Pilates core profundo',
    category:    'Pilates',
    duration:    40,
    level:       'intermediate',
    imageSrc:    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    featured:    false,
    order:       4,
    description: 'Trabajo profundo de la musculatura estabilizadora del tronco. Ejercicios de control motor que activan transverso, multífidos y suelo pélvico. Mejora la postura, reduce el dolor lumbar y sienta las bases para cualquier otro entrenamiento.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Sentadillas y glúteos',
    category:    'Fuerza',
    duration:    35,
    level:       'intermediate',
    imageSrc:    'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80',
    featured:    false,
    order:       5,
    description: 'Sesión especializada en tren inferior con foco en glúteos y cuádriceps. Combinamos sentadilla goblet, peso muerto rumano, hip thrust y patadas traseras en cuadrupedia. Con o sin banda de resistencia según tu nivel.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Stretching post-entreno',
    category:    'Movilidad',
    duration:    15,
    level:       'beginner',
    imageSrc:    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    featured:    false,
    order:       6,
    description: 'Rutina de estiramientos estáticos para hacer inmediatamente después de entrenar. Trabajamos los músculos más solicitados: isquiotibiales, psoas, pectorales y trapecios. Reduce las agujetas y acelera la recuperación muscular.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Cardio funcional en casa',
    category:    'Cardio',
    duration:    25,
    level:       'intermediate',
    imageSrc:    'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80',
    featured:    false,
    order:       7,
    description: 'Circuito cardiovascular sin impacto que puedes hacer en cualquier espacio. Combinamos movimientos de bajo impacto con ejercicios funcionales para elevar el ritmo cardíaco sin dañar las articulaciones. Perfecto para días de recuperación activa.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Vinyasa flow',
    category:    'Yoga',
    duration:    50,
    level:       'intermediate',
    imageSrc:    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    featured:    true,
    order:       8,
    description: 'Práctica dinámica que encadena posturas con la respiración en un flujo continuo. Trabajamos fuerza, flexibilidad y equilibrio a través de saludos al sol, guerreros y flexiones hacia atrás. Una práctica completa que activa cuerpo y mente.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Movilidad de caderas',
    category:    'Movilidad',
    duration:    20,
    level:       'beginner',
    imageSrc:    'https://images.unsplash.com/photo-1593810450967-f9c42742e326?w=600&q=80',
    featured:    false,
    order:       9,
    description: 'Secuencia específica para liberar la tensión acumulada en caderas y zona lumbar, habitual en personas que pasan muchas horas sentadas. Abriremos el psoas, los rotadores externos y los flexores de cadera con ejercicios progresivos.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Fuerza de espalda y hombros',
    category:    'Fuerza',
    duration:    40,
    level:       'advanced',
    imageSrc:    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    featured:    false,
    order:       10,
    description: 'Sesión de fuerza avanzada para el tren superior. Dominadas, remo con barra, press militar y face pulls para construir una espalda ancha y hombros fuertes y saludables. Requiere acceso a barra de dominadas o máquina de poleas.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Pilates con banda elástica',
    category:    'Pilates',
    duration:    30,
    level:       'beginner',
    imageSrc:    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80',
    featured:    false,
    order:       11,
    description: 'Introducción al Pilates usando una banda elástica para añadir resistencia controlada. Los ejercicios activan la musculatura profunda del core mientras trabajamos brazos, piernas y espalda. Solo necesitas una banda y una esterilla.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
  {
    title:       'Tabata total body',
    category:    'Cardio',
    duration:    25,
    level:       'advanced',
    imageSrc:    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    featured:    true,
    order:       12,
    description: 'Protocolo Tabata (20 segundos de trabajo / 10 de descanso) aplicado a todo el cuerpo. 6 bloques de 4 minutos con ejercicios compuestos de máxima intensidad. Uno de los métodos más eficientes para mejorar la capacidad aeróbica y anaeróbica.',
    videoUrl:    'https://www.youtube.com/embed/UBMk30rjy0o',
  },
]

async function seed() {
  console.log('🌱 Iniciando seed de Firestore...\n')

  // Limpiar colección existente
  const existing = await getDocs(collection(db, 'workouts'))
  const deletePromises = existing.docs.map(doc => deleteDoc(doc.ref))
  await Promise.all(deletePromises)
  console.log(`🗑  Eliminados ${existing.docs.length} workouts existentes`)

  // Insertar nuevos workouts
  for (const workout of WORKOUTS) {
    await addDoc(collection(db, 'workouts'), {
      ...workout,
      createdAt: new Date().toISOString(),
    })
    console.log(`✅ ${workout.title}`)
  }

  console.log(`\n🎉 Seed completado — ${WORKOUTS.length} workouts insertados`)
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Error en seed:', err)
  process.exit(1)
})
