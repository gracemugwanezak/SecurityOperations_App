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
    await prisma.user.upsert({
        where: { email: 'super@system.com' },
        update: {},
        create: {
            email: 'super@system.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    const client1 = await prisma.client.upsert({
        where: { email: 'ops@citybank.com' },
        update: {},
        create: {
            name: 'City Bank HQ',
            email: 'ops@citybank.com',
            location: 'Nairobi CBD',
            contractEnd: new Date('2026-12-31'),
        }
    });
    const client2 = await prisma.client.upsert({
        where: { email: 'info@topmall.com' },
        update: {},
        create: {
            name: 'TopSec Mall',
            email: 'info@topmall.com',
            location: 'Westlands',
            contractEnd: new Date('2025-06-30'),
        }
    });
    const guard1 = await prisma.guard.upsert({
        where: { idNumber: '2025-001' },
        update: {},
        create: {
            name: 'John Doe',
            idNumber: '2025-001',
            homeResidence: 'Nairobi'
        }
    });
    const guard2 = await prisma.guard.upsert({
        where: { idNumber: '2025-002' },
        update: {},
        create: {
            name: 'Jane Smith',
            idNumber: '2025-002',
            homeResidence: 'Mombasa'
        }
    });
    await prisma.post.create({
        data: {
            title: 'Main Vault Entrance',
            content: 'High security monitoring',
            clientId: client1.id,
            guards: {
                create: [{ guard: { connect: { id: guard1.id } } }]
            }
        }
    });
    await prisma.post.create({
        data: {
            title: 'Parking Gate A',
            content: 'Vehicle screening area',
            clientId: client2.id,
            guards: {
                create: [{ guard: { connect: { id: guard2.id } } }]
            }
        }
    });
    console.log('✅ Seed successful!');
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
//# sourceMappingURL=prisma.seeds.js.map