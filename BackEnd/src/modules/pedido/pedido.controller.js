import PedidoRepository from "./pedido.repository.js";

const pedidoRepository = new PedidoRepository();

/**
 * GET /api/pedido
 */
export async function listarPedidos(req, res) {
  try {
    const pedidos = await pedidoRepository.listar();
    return res.json(pedidos);
  } catch (error) {
    console.error('ERRO AO LISTAR PEDIDOS:', error);
    return res.status(500).json({ erro: error.message });
  }
}

/**
 * GET /api/pedido/:id
 */
export async function buscarPedidoPorId(req, res) {
  try {
    const { id } = req.params;
    const pedido = await pedidoRepository.buscarPorId(id);

    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    return res.json(pedido);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

/**
 * POST /api/pedido
 */
export async function criarPedido(req, res) {
  try {
    const { ident, numero, observacao, produtos } = req.body;

    if (!ident || !produtos?.length) {
      return res.status(400).json({
        erro: "Identificação e produtos são obrigatórios"
      });
    }

    const pedido = await pedidoRepository.criar({
      ident,
      numero,
      observacao,
      produtos
    });

    return res.status(201).json(pedido);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

/**
 * DELETE /api/pedido/:id
 */
export async function cancelarPedido(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ erro: 'ID do pedido é obrigatório' });
    }

    await pedidoRepository.excluir(id);

    return res.status(200).json({ mensagem: 'Pedido excluído com sucesso' });
  } catch (error) {
    console.error('ERRO AO EXCLUIR PEDIDO:', error);
    return res.status(500).json({ erro: error.message });
  }
}

