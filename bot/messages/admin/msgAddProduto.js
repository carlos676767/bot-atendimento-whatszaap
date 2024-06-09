function addProdutos(nome, produto) {
    const mensagemProdutosAdicionados = `
✅ **Produtos adicionados com sucesso!**

Os seguintes produtos foram adicionados ao banco de dados:
- Produto A
- Produto B
- Produto C

Verifique a lista de produtos atualizada para mais detalhes. Obrigado por utilizar o sistema de administração!
`;
    return mensagemProdutosAdicionados
}


module.exports = addProdutos