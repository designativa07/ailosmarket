import { PerfilCooperado } from '../../perfis/entities/perfil-cooperado.entity';
import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
import { ServicoProduto } from '../../catalogo/entities/servico-produto.entity';
import { MensagemSolicitacao } from './mensagem-solicitacao.entity';
import { Avaliacao } from '../../avaliacoes/entities/avaliacao.entity';
export declare enum RequestStatus {
    NOVA = "NOVA",
    EM_ANALISE_FORNECEDOR = "EM_ANALISE_FORNECEDOR",
    PROPOSTA_ENVIADA = "PROPOSTA_ENVIADA",
    ACEITA_COOPERADO = "ACEITA_COOPERADO",
    RECUSADA_COOPERADO = "RECUSADA_COOPERADO",
    EM_ANDAMENTO = "EM_ANDAMENTO",
    CONCLUIDO = "CONCLUIDO",
    CANCELADO = "CANCELADO"
}
export declare class SolicitacaoServico {
    id: string;
    cooperadoId: string;
    cooperado: PerfilCooperado;
    fornecedorId: string;
    fornecedor: PerfilFornecedor;
    servicoProdutoId: string;
    servicoProduto: ServicoProduto;
    mensagemInicial: string;
    status: RequestStatus;
    dataSolicitacao: Date;
    dataUltimaAtualizacaoStatus: Date;
    dataConclusao: Date;
    historicoStatus: any;
    propostaValor: number;
    propostaDetalhes: string;
    dataEnvioProposta: Date;
    dataRespostaProposta: Date;
    mensagens: MensagemSolicitacao[];
    avaliacao: Avaliacao;
}
