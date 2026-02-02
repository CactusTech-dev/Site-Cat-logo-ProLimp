import ProdutoRepository from "./produto.repository.js";

const produtoRepository = new ProdutoRepository();

/**
 * GET /api/produtos
 */
export async function listarProdutos(req, res) {
  try {
    const produtos = await produtoRepository.listar();
    return res.json(produtos);

  } catch (error) {
    console.error('ERRO AO LISTAR PRODUTOS:', error);
    return res.status(500).json({
      erro: error.message || error
    });
  }
}

/**
 * GET /api/produtos/:id
 */
export async function buscarProdutoPorId(req, res) {
  try {
    const { id } = req.params;

    const produto = await produtoRepository.buscarPorId(id);

    if (!produto) {
      return res.status(404).json({
        erro: "Produto não encontrado"
      });
    }

    return res.json(produto);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro ao buscar produto"
    });
  }
}

/**
 * POST /api/produtos
 */
export async function criarProduto(req, res) {
  try {
    const { nome, preco, descricao } = req.body;

    if (!nome || !preco) {
      return res.status(400).json({
        erro: "Nome e preço são obrigatórios"
      });
    }

    const imagem = req.file
      ? `/uploads/produtos/${req.file.filename}`
      : null;

    const produto = await produtoRepository.criar({
      nome,
      preco,
      descricao,
      imagem
    });

    return res.status(201).json(produto);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro ao criar produto"
    });
  }
}

/**
 * PUT /api/produtos/:id
 */
export async function atualizarProduto(req, res) {
  try {
    const { id } = req.params;
    const { nome, preco, descricao } = req.body;

    const produtoExistente = await produtoRepository.buscarPorId(id);

    if (!produtoExistente) {
      return res.status(404).json({
        erro: "Produto não encontrado"
      });
    }

    const imagem = req.file
      ? `/uploads/produtos/${req.file.filename}`
      : produtoExistente.imagem;

    const produtoAtualizado = await produtoRepository.atualizar(id, {
      nome: nome ?? produtoExistente.nome,
      preco: preco ?? produtoExistente.preco,
      descricao: descricao ?? produtoExistente.descricao,
      imagem
    });

    return res.json(produtoAtualizado);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro ao atualizar produto"
    });
  }
}

/**
 * DELETE /api/produtos/:id
 */
export async function deletarProduto(req, res) {
  try {
    const { id } = req.params;

    const produtoExistente = await produtoRepository.buscarPorId(id);

    if (!produtoExistente) {
      return res.status(404).json({
        erro: "Produto não encontrado"
      });
    }

    await produtoRepository.deletar(id);

    return res.status(204).send();

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro ao deletar produto"
    });
  }
}
