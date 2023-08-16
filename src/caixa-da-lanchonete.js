class CaixaDaLanchonete {
    constructor(){
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
          };

          this.formasDePagamento = ['dinheiro', 'debito', 'credito']
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (Object.keys(itens).length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if(!this.formasDePagamento.includes(metodoDePagamento)){
            return "Forma de pagamento inválida!"
        }

        let valorTotal = 0
        const quantidades = {}

        for(const item of itens){
            const [codigoItem, quantidade] = item.split(",")

            if(!this.cardapio[codigoItem]){
                return "Item inválido!"
            }

            if(!quantidades[codigoItem]){
                quantidades[codigoItem] = 0
            }

            if (parseInt(quantidade, 10) === 0) {
                return "Quantidade inválida!";
            }

            quantidades[codigoItem] += parseInt(quantidade, 10)
        }

        for (const codigoItem in quantidades){
            const item = this.cardapio[codigoItem]
            const quantidade = quantidades[codigoItem]

            if(codigoItem === 'chantily' && !quantidades['cafe']){
                return "Item extra não pode ser pedido sem o principal"
            }

            if(codigoItem === 'queijo' && !quantidades['sanduiche']){
                return "Item extra não pode ser pedido sem o principal"
            }

            valorTotal += item.valor * quantidade
        }

        if(metodoDePagamento === 'dinheiro'){
            valorTotal = valorTotal * 0.95

        } else if (metodoDePagamento === 'credito'){
            valorTotal = valorTotal * 1.03
        }

        return `R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
}

export { CaixaDaLanchonete };
