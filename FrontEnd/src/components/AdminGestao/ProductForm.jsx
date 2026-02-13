import React from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import './ProductForm.css';

const ProductForm = ({ form, setForm, onSave, onVoltar, handleFile }) => {
  const isEditing = !!form.id;

  return (
    <div className="admin-card edit-card product-form-container ">
      <div className="admin-header-min">
        <button className="btn-voltar-simples" onClick={onVoltar}>
          <FaArrowLeft /> Voltar
        </button>
        <h1>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h1>
      </div>

      <form onSubmit={onSave} className="edit-form">
        <div className="input-group">
          <label>Nome do Produto</label>
          <input
            placeholder="Ex: Detergente Neutro 5L"
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>Descrição</label>
          <textarea
            placeholder="Descreva as características..."
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            required
          />
        </div>

        <div className="radio-group-premium">
          <label className={form.tipo === 'link' ? 'active' : ''}>
            <input
              type="radio"
              name="tipoImagem"
              checked={form.tipo === 'link'}
              onChange={() => setForm({ ...form, tipo: 'link' })}
            />
            Link Externo
          </label>

          <label className={form.tipo === 'arquivo' ? 'active' : ''}>
            <input
              type="radio"
              name="tipoImagem"
              checked={form.tipo === 'arquivo'}
              onChange={() => setForm({ ...form, tipo: 'arquivo' })}
            />
            Upload de Arquivo
          </label>
        </div>

        <div className="input-group">
          {form.tipo === 'arquivo' ? (
            <div className="file-input-wrapper">
               <label>Selecionar Imagem</label>
               <input type="file" onChange={handleFile} />
            </div>
          ) : (
            <>
              <label>URL da Imagem</label>
              <input
                type="text"
                placeholder="https://..."
                value={form.imagemUrl}
                onChange={e => setForm({ ...form, imagemUrl: e.target.value })}
                required
              />
            </>
          )}
        </div>

        <button type="submit" className="btn-salvar">
          <FaSave /> {isEditing ? 'Salvar Alterações' : 'Cadastrar Produto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;