"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting Seed...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@system.com' },
        update: {},
        create: {
            email: 'admin@system.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    const client = await prisma.client.upsert({
        where: { email: 'ops@citybank.com' },
        update: {},
        create: {
            name: 'City Bank HQ',
            email: 'ops@citybank.com',
            location: 'Nairobi CBD',
        }
    });
    const guard = await prisma.guard.upsert({
        where: { idNumber: '2025-001' },
        update: {},
        create: {
            name: 'John Doe',
            idNumber: '2025-001',
            homeResidence: 'Nairobi'
        }
    });
    await prisma.post.create({
        data: {
            title: 'Main Vault Entrance',
            content: 'Secure Area',
            clientId: client.id,
            guards: {
                create: [
                    {
                        guard: {
                            connect: { id: guard.id }
                        }
                    }
                ]
            }
        }
    });
    console.log('✅ Seed successful!');
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
//# sourceMappingURL=prisma.seeds.js.map