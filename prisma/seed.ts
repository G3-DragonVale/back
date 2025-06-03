import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
    const dragons = await prisma.dragon.createMany({
        data: [
            { nom: 'Roger', rarete: 'commun' },
            { nom: 'Draco', rarete: 'rare' },
            { nom: 'Smaug', rarete: 'epique' },
            { nom: 'Falkor', rarete: 'légendaire' },
        ]
    });
    // Create a new user
    const user = await prisma.user.create({
        data: {
            nom: 'John',
            prenom: 'Doe',
            mdp: 'password',
            dragons: {
                create: [
                    {
                        dragon: {
                            connect: { id: 1 }
                        }
                    },
                    {
                        dragon: {
                            connect: { id: 2 }
                        }
                    }
                ]
            }
        }
    });
    console.log('Dragons created:', dragons);
    console.log('User created:', user);

}

// execute the main function
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })