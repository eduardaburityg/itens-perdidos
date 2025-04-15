-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categoria" (
    "categoria_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "item_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_objeto" TEXT NOT NULL,
    "dataEvento" DATETIME NOT NULL,
    "localizacao" TEXT NOT NULL,
    "foto" TEXT,
    "status" INTEGER NOT NULL,
    "codigoAcesso" TEXT NOT NULL,
    "categoria_ID" INTEGER NOT NULL,
    "usuario_ID" INTEGER,
    CONSTRAINT "Item_categoria_ID_fkey" FOREIGN KEY ("categoria_ID") REFERENCES "Categoria" ("categoria_ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_usuario_ID_fkey" FOREIGN KEY ("usuario_ID") REFERENCES "Usuario" ("usuario_ID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_codigoAcesso_key" ON "Item"("codigoAcesso");
