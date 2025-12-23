-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'HR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "homeResidence" TEXT NOT NULL,

    CONSTRAINT "Guard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostGuard" (
    "postId" INTEGER NOT NULL,
    "guardId" INTEGER NOT NULL,

    CONSTRAINT "PostGuard_pkey" PRIMARY KEY ("postId","guardId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guard_idNumber_key" ON "Guard"("idNumber");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostGuard" ADD CONSTRAINT "PostGuard_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostGuard" ADD CONSTRAINT "PostGuard_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
