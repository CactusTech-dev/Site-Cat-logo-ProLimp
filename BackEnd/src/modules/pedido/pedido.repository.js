import { supabase } from '../../lib/supabase.js';

export default class PedidoRepository {

  async listar() {
    const { data, error } = await supabase
      .from('pedido')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async buscarPorId(id) {
    const { data, error } = await supabase
      .from('pedido')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  async criar(pedido) {
    const { data, error } = await supabase
      .from('pedido')
      .insert([pedido])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async excluir(id) {
  const { error } = await supabase
    .from('pedido')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return true;
}

}
