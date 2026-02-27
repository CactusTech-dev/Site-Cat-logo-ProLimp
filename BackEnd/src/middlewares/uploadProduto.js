import multer from "multer";

// ✅ ALTERAÇÃO VITAL: Usar memoryStorage para não tentar gravar no disco da Vercel
const storage = multer.memoryStorage();

// filtro de tipo de arquivo (mantemos o seu, que está ótimo!)
function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Formato de imagem inválido"), false);
  }
}

export const uploadProduto = multer({
  storage, // Agora usando memória
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});