import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'jhon.doe@gmail.com',
            avatarUrl: 'https://github.com/isaque2304.png'
        }
    });

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    await prisma.game.create({
        data:{
            date: '2022-11-02T12:00:00.269Z',
            firstTeamCountryCode: 'DE',
            secondTeamCoutryCode: 'BR'
        }
    });

    await prisma.game.create({
        data:{
            date: '2022-11-03T12:00:00.269Z',
            firstTeamCountryCode: 'BR',
            secondTeamCoutryCode: 'AR',

            guesses: {
                create:{
                    firstTeamPoints: 4,
                    secondTeamPoints: 2,
                    
                    participant: {
                       connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id
                        }
                       }
                    }
                }
            }
        }
    });
}

main();