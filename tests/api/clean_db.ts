import { prisma } from '~/api/prisma'

const cleanDb = async () => {
  await prisma.$transaction([
    prisma.duo.deleteMany(),
    prisma.tirageAuSort.deleteMany(),
    prisma.participant.deleteMany(),
    prisma.famille.deleteMany(),
    prisma.session.deleteMany()
  ])
}

export default cleanDb
