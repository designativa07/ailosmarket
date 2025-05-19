import { SolicitacaoServico } from './solicitacao-servico.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare class MensagemSolicitacao {
    id: string;
    solicitacaoId: string;
    solicitacao: SolicitacaoServico;
    remetenteId: string;
    remetente: Usuario;
    conteudo: string;
    lida: boolean;
    dataEnvio: Date;
}
