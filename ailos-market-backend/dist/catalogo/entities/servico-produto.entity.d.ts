import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
import { CategoriaServico } from './categoria-servico.entity';
import { SolicitacaoServico } from '../../solicitacoes/entities/solicitacao-servico.entity';
import { Avaliacao } from '../../avaliacoes/entities/avaliacao.entity';
export declare class ServicoProduto {
    id: string;
    fornecedorId: string;
    fornecedor: PerfilFornecedor;
    categoriaId: number;
    categoria: CategoriaServico;
    nome: string;
    descricaoDetalhada: string;
    palavrasChave: string[];
    precoBase: number;
    unidadeMedida: string;
    ativo: boolean;
    dataCriacao: Date;
    dataAtualizacao: Date;
    solicitacoesServicos: SolicitacaoServico[];
    avaliacoesRecebidas: Avaliacao[];
}
