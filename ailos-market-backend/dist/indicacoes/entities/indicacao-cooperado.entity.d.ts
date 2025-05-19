import { PerfilFornecedor } from '../../perfis/entities/perfil-fornecedor.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare enum IndicationStatus {
    PENDENTE = "PENDENTE",
    EM_ANALISE = "EM_ANALISE",
    CONTATADO = "CONTATADO",
    CONVERTIDO = "CONVERTIDO",
    NAO_CONVERTIDO = "NAO_CONVERTIDO"
}
export declare class IndicacaoCooperado {
    id: string;
    fornecedorIndicadorId: string;
    fornecedorIndicador: PerfilFornecedor;
    nomeEmpresaIndicada: string;
    cnpjIndicado: string;
    nomeContatoIndicado: string;
    telefoneContatoIndicado: string;
    emailContatoIndicado: string;
    observacao: string;
    status: IndicationStatus;
    dataIndicacao: Date;
    dataUltimaAtualizacaoStatus: Date;
    administradorResponsavelId: string;
    administradorResponsavel: Usuario;
}
