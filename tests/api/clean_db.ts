import { prisma } from '~/api/prisma'

const cleanDb = async () => {
  await prisma.duo.deleteMany({})
  await prisma.tirageAuSort.deleteMany({})
  await prisma.participant.deleteMany({})
  await prisma.famille.deleteMany({})
  await prisma.session.deleteMany({})
}

export default cleanDb
