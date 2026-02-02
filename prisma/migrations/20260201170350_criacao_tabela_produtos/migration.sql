-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT,
    "url_imagem" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
