-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "mdp" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dragon" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "rarete" TEXT NOT NULL,

    CONSTRAINT "Dragon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDragon" (
    "userId" INTEGER NOT NULL,
    "dragonId" INTEGER NOT NULL,

    CONSTRAINT "UserDragon_pkey" PRIMARY KEY ("userId","dragonId")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dragon_nom_key" ON "Dragon"("nom");

-- AddForeignKey
ALTER TABLE "UserDragon" ADD CONSTRAINT "UserDragon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDragon" ADD CONSTRAINT "UserDragon_dragonId_fkey" FOREIGN KEY ("dragonId") REFERENCES "Dragon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
