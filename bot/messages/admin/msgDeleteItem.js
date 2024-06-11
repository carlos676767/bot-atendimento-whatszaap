function deleteItemMsg(nome) {
  const deletedItem = `
  ✅ **Produto deletado com sucesso!**
  
  **o produto foi deletado com sucesso!:**
  **- ${nome}**
  
  **Verifique a lista de produtos atualizada para mais detalhes.
   Obrigado por utilizar o sistema de administração!**
  `;
  return deletedItem;
}

module.exports = deleteItemMsg;
