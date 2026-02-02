import multer from "multer";
import path from "path";

// define onde e como salvar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/produtos");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nome = Date.now() + ext;

    cb(null, nome);
  }
});

// filtro de tipo de arquivo
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
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});
