import { v4 as uuidv4 } from 'uuid'
import { PrismaClient } from '@prisma/client'

export class GamesRepository {
    private prisma: PrismaClient = new PrismaClient()

    public async listAll(): Promise<GamesRepository[]> {
        const games = await this.prisma.game.findMany()
        return games
    }

    public async getById(id: number): Promise<GamesRepository | null> {
        const game = await this.prisma.game.findUnique({
            where: { id: id }
        })
        return game
    }

    public async create(title: string, description: string, releaseDate: Date): Promise<GamesRepository> {
        const game = await this.prisma.game.create({
            data: {
                title,
                description,
                releaseDate,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return game
    }

    public async update(id: number, title: string, description: string, releaseDate: Date): Promise<GamesRepository| null> {
        const game = await this.prisma.game.update({
            where: { id: id },
            data: {
                title,
                description,
                releaseDate,
                updatedAt: new Date()
            }
        })
        return game
    }

    public async delete(id: number): Promise<void> {
        await this.prisma.game.delete({
            where: { id: id }
        })
    }
}