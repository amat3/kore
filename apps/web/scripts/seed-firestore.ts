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
    title:     'Full body con peso libre',
    category:  'Fuerza',
    duration:  45,
    level:     'intermediate',
    imageSrc:  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    featured:  true,
    order:     1,
  },
  {
    title:     'Yoga restaurativo',
    category:  'Yoga',
    duration:  30,
    level:     'beginner',
    imageSrc:  'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80',
    featured:  false,
    order:     2,
  },
  {
    title:     'HIIT explosivo',
    category:  'Cardio',
    duration:  20,
    level:     'advanced',
    imageSrc:  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80',
    featured:  true,
    order:     3,
  },
  {
    title:     'Pilates core profundo',
    category:  'Pilates',
    duration:  40,
    level:     'intermediate',
    imageSrc:  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    featured:  false,
    order:     4,
  },
  {
    title:     'Sentadillas y glúteos',
    category:  'Fuerza',
    duration:  35,
    level:     'intermediate',
    imageSrc:  'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80',
    featured:  false,
    order:     5,
  },
  {
    title:     'Stretching post-entreno',
    category:  'Movilidad',
    duration:  15,
    level:     'beginner',
    imageSrc:  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    featured:  false,
    order:     6,
  },
  {
    title:     'Cardio funcional en casa',
    category:  'Cardio',
    duration:  25,
    level:     'intermediate',
    imageSrc:  'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80',
    featured:  false,
    order:     7,
  },
  {
    title:     'Vinyasa flow',
    category:  'Yoga',
    duration:  50,
    level:     'intermediate',
    imageSrc:  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    featured:  true,
    order:     8,
  },
  {
    title:     'Movilidad de caderas',
    category:  'Movilidad',
    duration:  20,
    level:     'beginner',
    imageSrc:  'https://images.unsplash.com/photo-1593810450967-f9c42742e326?w=600&q=80',
    featured:  false,
    order:     9,
  },
  {
    title:     'Fuerza de espalda y hombros',
    category:  'Fuerza',
    duration:  40,
    level:     'advanced',
    imageSrc:  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    featured:  false,
    order:     10,
  },
  {
    title:     'Pilates con banda elástica',
    category:  'Pilates',
    duration:  30,
    level:     'beginner',
    imageSrc:  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80',
    featured:  false,
    order:     11,
  },
  {
    title:     'Tabata total body',
    category:  'Cardio',
    duration:  25,
    level:     'advanced',
    imageSrc:  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    featured:  true,
    order:     12,
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
