import { SolicitacaoServico } from '../../solicitacoes/entities/solicitacao-servico.entity';
import { PerfilCooperado } from '../../perfis/entities/perfil-cooperado.entity';
import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
import { ServicoProduto } from '../../catalogo/entities/servico-produto.entity';
export declare class Avaliacao {
    id: string;
    solicitacaoId: string;
    solicitacao: SolicitacaoServico;
    avaliadorId: string;
    avaliador: PerfilCooperado;
    avaliadoFornecedorId: string;
    avaliadoFornecedor: PerfilFornecedor;
    avaliadoServicoProdutoId: string;
    avaliadoServicoProduto: ServicoProduto;
    nota: number;
    comentario: string;
    dataAvaliacao: Date;
}
