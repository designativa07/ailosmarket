import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare enum HomologationStatus {
    PENDENTE = "PENDENTE",
    EM_ANALISE = "EM_ANALISE",
    APROVADO = "APROVADO",
    REJEITADO = "REJEITADO"
}
export declare class PerfilFornecedor {
    usuarioId: string;
    usuario: Usuario;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    enderecoCompleto: string;
    descricaoEmpresa: string;
    segmentosAtuacao: string[];
    certificacoesUrls: string[];
    referenciasComerciais: string;
    statusHomologacao: HomologationStatus;
    justificativaRejeicao: string;
    dataSolicitacaoHomologacao: Date;
    dataHomologacao: Date;
    administradorHomologadorId: string;
    logoUrl: string;
    documentosEnviados: any;
    dataUltimaVerificacaoAdmin: Date;
    dataAtualizacao: Date;
}
