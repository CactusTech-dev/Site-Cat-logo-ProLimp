import { supabase } from "../../lib/supabase.js";

export default class AdminRepository {

  static async findByEmail(email) {
    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single();

    if (error) return null;

    return data;
  }

  static async create({ email, senha }) {
    const { data, error } = await supabase
      .from("admin")
      .insert([{ email, senha }])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

}