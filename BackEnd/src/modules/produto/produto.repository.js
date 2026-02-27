import { supabase } from '../../lib/supabase.js'

export default class ProdutoRepository {

  // Função auxiliar para fazer o upload para o "Bucket"
  async uploadImagem(file) {
    // Gera um nome único para o arquivo
    const fileName = `${Date.now()}-${file.originalname}`;
    
    // Faz o upload do buffer direto para o Supabase Storage
    const { data, error } = await supabase.storage
      .from('produtos') // Nome do Bucket que você criou no painel
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (error) throw error;

    // Retorna a URL pública do arquivo
    const { data: publicData } = supabase.storage
      .from('produtos')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  }

  async listar() {
    const { data, error } = await supabase
      .from('produto')
      .select('*')
      .order('nome', { ascending: true })
    if (error) throw error
    return data
  }

  async buscarPorId(id) {
    const { data, error } = await supabase
      .from('produto')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data
  }

  async criar(produtoDados, file = null) {
    let urlImagem = produtoDados.imagem;

    // Se houver um arquivo vindo do multer, fazemos o upload primeiro
    if (file) {
      urlImagem = await this.uploadImagem(file);
    }

    const { data, error } = await supabase
      .from('produto')
      .insert([{
        nome: produtoDados.nome,
        descricao: produtoDados.descricao,
        imagem: urlImagem // Aqui salvamos o link do Storage
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  async atualizar(id, produtoDados, file = null) {
    let urlImagem = produtoDados.imagem;

    if (file) {
      urlImagem = await this.uploadImagem(file);
    }

    const { data, error } = await supabase
      .from('produto')
      .update({
        nome: produtoDados.nome,
        descricao: produtoDados.descricao,
        imagem: urlImagem
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deletar(id) {
    const { error } = await supabase
      .from('produto')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}