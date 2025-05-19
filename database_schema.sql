CREATE TYPE user_role AS ENUM ('ADMINISTRADOR', 'COOPERADO', 'FORNECEDOR');
CREATE TYPE homologation_status AS ENUM ('PENDENTE', 'EM_ANALISE', 'APROVADO', 'REJEITADO');
CREATE TYPE request_status AS ENUM ('NOVA', 'EM_ANALISE_FORNECEDOR', 'PROPOSTA_ENVIADA', 'ACEITA_COOPERADO', 'RECUSADA_COOPERADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO');
CREATE TYPE indication_status AS ENUM ('PENDENTE', 'EM_ANALISE', 'CONTATADO', 'CONVERTIDO', 'NAO_CONVERTIDO');

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    papel user_role NOT NULL,
    nome_completo VARCHAR(255),
    telefone VARCHAR(20),
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perfis_administradores (
    usuario_id UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    cargo VARCHAR(100)
);

CREATE TABLE perfis_cooperados (
    usuario_id UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    cpf_cnpj VARCHAR(18) UNIQUE, -- Pode ser CPF ou CNPJ dependendo do cooperado
    razao_social VARCHAR(255), -- Se PJ
    nome_fantasia VARCHAR(255), -- Se PJ
    data_associacao DATE
);

CREATE TABLE perfis_fornecedores (
    usuario_id UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    endereco_completo TEXT,
    descricao_empresa TEXT,
    segmentos_atuacao TEXT[], -- Array de strings para segmentos
    certificacoes_urls TEXT[], -- URLs para documentos de certificação
    referencias_comerciais TEXT, -- Opcional
    status_homologacao homologation_status DEFAULT 'PENDENTE',
    justificativa_rejeicao TEXT, -- Se status_homologacao for REJEITADO
    data_solicitacao_homologacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_homologacao TIMESTAMP WITH TIME ZONE,
    administrador_homologador_id UUID REFERENCES usuarios(id) -- Quem aprovou/rejeitou
);

CREATE TABLE categorias_servicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicos_produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fornecedor_id UUID NOT NULL REFERENCES perfis_fornecedores(usuario_id) ON DELETE CASCADE,
    categoria_id INTEGER REFERENCES categorias_servicos(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL,
    descricao_detalhada TEXT NOT NULL,
    palavras_chave TEXT[],
    preco_base DECIMAL(10, 2), -- Opcional, pode ser "sob consulta"
    unidade_medida VARCHAR(50), -- ex: hora, projeto, unidade
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_servicos_fornecedor_id ON servicos_produtos(fornecedor_id);
CREATE INDEX idx_servicos_categoria_id ON servicos_produtos(categoria_id);

CREATE TABLE solicitacoes_servicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cooperado_id UUID NOT NULL REFERENCES perfis_cooperados(usuario_id),
    fornecedor_id UUID NOT NULL REFERENCES perfis_fornecedores(usuario_id),
    servico_produto_id UUID REFERENCES servicos_produtos(id), -- Pode ser uma solicitação genérica ao fornecedor
    mensagem_inicial TEXT,
    status request_status DEFAULT 'NOVA',
    data_solicitacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_ultima_atualizacao_status TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_solicitacoes_cooperado_id ON solicitacoes_servicos(cooperado_id);
CREATE INDEX idx_solicitacoes_fornecedor_id ON solicitacoes_servicos(fornecedor_id);
CREATE INDEX idx_solicitacoes_servico_produto_id ON solicitacoes_servicos(servico_produto_id);

CREATE TABLE mensagens_solicitacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    solicitacao_id UUID NOT NULL REFERENCES solicitacoes_servicos(id) ON DELETE CASCADE,
    remetente_id UUID NOT NULL REFERENCES usuarios(id),
    conteudo TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_mensagens_solicitacao_id ON mensagens_solicitacoes(solicitacao_id);
CREATE INDEX idx_mensagens_remetente_id ON mensagens_solicitacoes(remetente_id);

CREATE TABLE avaliacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    solicitacao_id UUID UNIQUE NOT NULL REFERENCES solicitacoes_servicos(id), -- Uma avaliação por solicitação concluída
    avaliador_id UUID NOT NULL REFERENCES perfis_cooperados(usuario_id),
    avaliado_fornecedor_id UUID NOT NULL REFERENCES perfis_fornecedores(usuario_id),
    nota INTEGER NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_avaliacoes_avaliador_id ON avaliacoes(avaliador_id);
CREATE INDEX idx_avaliacoes_avaliado_fornecedor_id ON avaliacoes(avaliado_fornecedor_id);

CREATE TABLE indicacoes_cooperados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fornecedor_indicador_id UUID NOT NULL REFERENCES perfis_fornecedores(usuario_id),
    nome_empresa_indicada VARCHAR(255) NOT NULL,
    cnpj_indicado VARCHAR(18),
    nome_contato_indicado VARCHAR(255),
    telefone_contato_indicado VARCHAR(20),
    email_contato_indicado VARCHAR(255),
    observacao TEXT,
    status indication_status DEFAULT 'PENDENTE',
    data_indicacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_ultima_atualizacao_status TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    administrador_responsavel_id UUID REFERENCES usuarios(id) -- Quem está tratando a indicação
);
CREATE INDEX idx_indicacoes_fornecedor_id ON indicacoes_cooperados(fornecedor_indicador_id);

-- Funcao para atualizar data_atualizacao automaticamente
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.data_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar data_atualizacao
CREATE TRIGGER set_timestamp_usuarios
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_perfis_fornecedores
BEFORE UPDATE ON perfis_fornecedores
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_categorias_servicos
BEFORE UPDATE ON categorias_servicos
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_servicos_produtos
BEFORE UPDATE ON servicos_produtos
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_solicitacoes_servicos
BEFORE UPDATE ON solicitacoes_servicos
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_indicacoes_cooperados
BEFORE UPDATE ON indicacoes_cooperados
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Adicionar imagem de perfil aos usuários
ALTER TABLE usuarios ADD COLUMN foto_perfil_url TEXT;

-- Adicionar logo da empresa aos fornecedores
ALTER TABLE perfis_fornecedores ADD COLUMN logo_url TEXT;

-- Campos para rastreamento de homologacao em perfis_fornecedores
ALTER TABLE perfis_fornecedores
ADD COLUMN documentos_enviados JSONB, -- Para armazenar uma lista de documentos ou URLs
ADD COLUMN data_ultima_verificacao_admin TIMESTAMP WITH TIME ZONE;

-- Campos para rastreamento em solicitacoes_servicos
ALTER TABLE solicitacoes_servicos
ADD COLUMN historico_status JSONB; -- Para armazenar {status, data, responsavel_mudanca_id}

-- Melhorar tabela de avaliacoes para avaliar o servico_produto especifico também
ALTER TABLE avaliacoes
ADD COLUMN avaliado_servico_produto_id UUID REFERENCES servicos_produtos(id);

-- Adicionar campo para o cooperado aceitar/recusar a proposta na propria solicitacao
ALTER TABLE solicitacoes_servicos
ADD COLUMN proposta_valor DECIMAL(10,2),
ADD COLUMN proposta_detalhes TEXT,
ADD COLUMN data_envio_proposta TIMESTAMP WITH TIME ZONE,
ADD COLUMN data_resposta_proposta TIMESTAMP WITH TIME ZONE;

COMMENT ON COLUMN perfis_cooperados.cpf_cnpj IS 'Pode ser CPF para cooperado PF ou CNPJ para cooperado PJ.';
COMMENT ON COLUMN perfis_fornecedores.segmentos_atuacao IS 'Array de strings com os segmentos que o fornecedor atende.';
COMMENT ON COLUMN perfis_fornecedores.certificacoes_urls IS 'Array de URLs para os documentos de certificação do fornecedor.';
COMMENT ON COLUMN servicos_produtos.palavras_chave IS 'Array de strings para facilitar a busca.';
COMMENT ON COLUMN solicitacoes_servicos.servico_produto_id IS 'Pode ser nulo se a solicitação for mais genérica diretamente ao fornecedor.';
COMMENT ON COLUMN avaliacoes.solicitacao_id IS 'Garante uma avaliação única por solicitação concluída.';
COMMENT ON COLUMN indicacoes_cooperados.cnpj_indicado IS 'CNPJ da empresa indicada, se aplicável e conhecido.';
COMMENT ON COLUMN perfis_fornecedores.documentos_enviados IS 'JSONB para armazenar uma lista flexível de documentos enviados, como URLs ou nomes de arquivos.';
COMMENT ON COLUMN solicitacoes_servicos.historico_status IS 'JSONB para armazenar um log de mudanças de status: [{status: "NOVO", data: "timestamp", responsavel_id: "uuid"}, ...]';