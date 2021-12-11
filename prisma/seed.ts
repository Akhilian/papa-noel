/* eslint-disable no-console */
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const sessionData: Prisma.SessionCreateInput = {
  name: 'Première session',
  familles: {
    create: [
      {
        name: 'Saunier',
        participants: {
          create: [
            {
              name: 'Adrien',
              telephone: 0
            },
            {
              name: 'Pauline',
              telephone: 1
            },
            {
              name: 'Alix',
              telephone: 2
            },
            {
              name: 'Catherine',
              telephone: 3
            },
            {
              name: 'Frédéric',
              telephone: 4
            }
          ]
        }
      }
    ]
  }
}

async function main () {
  console.log('Start seeding ...')
  const session = await prisma.session.create({
    data: sessionData
  })
  console.log(session)
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
