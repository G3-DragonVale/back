import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LogMiddleware implements NestMiddleware {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const method = req.method;
        const route = req.originalUrl;
        const ip = req.ip;
        const excludedRoutes = ['/logs'];
        const sanitizedRoutes = ['/auth/login', '/auth/register'];

        if (excludedRoutes.includes(req.path)) return next();

        let bodyToLog = req.body;

        if (sanitizedRoutes.includes(req.path)) {
            bodyToLog = { ...req.body };
            if ('mdp' in bodyToLog) bodyToLog.mdp = '***';
        }

        let userId: number | undefined;

        const authHeader = req.headers.authorization;
        let decoded;
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'supersecret' });
                userId = decoded?.sub || undefined; // Récupérer l'ID de l'utilisateur à partir du token
            } catch (e) {
                decoded = e.message; // Si le token est invalide, utiliser un message par défaut
            }
        }

        await this.prisma.logs.create({
            data: {
                method,
                route,
                ip,
                body: JSON.stringify(bodyToLog),
                userId,
            },
        });

        next();
    }
}
