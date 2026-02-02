import { supabase } from '../../lib/supabase.js'

export default class ProdutoRepository {

  async listar() {
    const { data, error } = await supabase
      .from('produto')
      .select('*')
      .order('nome', { ascending: true })

    if (error) {
      throw error
    }

    return data
  }

  async buscarPorId(id) {
    const { data, error } = await supabase
      .from('produto')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return null
    }

    return data
  }

  async criar(produto) {
    const { data, error } = await supabase
      .from('produto')
      .insert([produto])
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  async atualizar(id, produto) {
    const { data, error } = await supabase
      .from('produto')
      .update(produto)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  async deletar(id) {
    const { error } = await supabase
      .from('produto')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }
  }
}
