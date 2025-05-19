import { ServicoProduto } from './servico-produto.entity';
export declare class CategoriaServico {
    id: number;
    nome: string;
    descricao: string;
    ativo: boolean;
    dataCriacao: Date;
    dataAtualizacao: Date;
    servicosProdutos: ServicoProduto[];
}
