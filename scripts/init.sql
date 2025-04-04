CREATE TYPE tipo AS ENUM ('c', 'd');

CREATE UNLOGGED TABLE IF NOT EXISTS cliente (
    id SERIAL PRIMARY KEY NOT NULL,
    saldo integer NOT NULL check(saldo >= -limite),
    limite integer NOT NULL 
);

CREATE UNLOGGED TABLE IF NOT EXISTS transacao (
    id SERIAL PRIMARY KEY NOT NULL,
    cliente_id SMALLINT,
    data_transacao TIMESTAMP NOT NULL DEFAULT NOW(),
    valor integer NOT NULL,
    tipo_transacao tipo,
    descricao varchar(10),
    CONSTRAINT transactions_client_id_fkey FOREIGN KEY (cliente_id) REFERENCES cliente (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX idx_transacao ON transacao (cliente_id, tipo_transacao, data_transacao DESC);

CREATE OR REPLACE FUNCTION update_saldo(
    cliente_id int,
    valor int,
    tipo_transacao tipo,
    descricao varchar(10)
)
RETURNS json
LANGUAGE plpgsql
AS $$
DECLARE 
  result json;
BEGIN
    WITH temp AS (
        UPDATE cliente SET saldo = CASE
            WHEN tipo_transacao = 'd' THEN saldo - valor
            WHEN tipo_transacao = 'c' THEN saldo + valor
        END
        WHERE id = cliente_id
        RETURNING limite, saldo
    ) SELECT to_json(temp) FROM temp INTO result;

    IF NOT FOUND THEN RETURN NULL;
    END IF;

    INSERT INTO transacao(cliente_id, valor, tipo_transacao, descricao)
    VALUES (cliente_id, valor, tipo_transacao, descricao);

    RETURN result;

EXCEPTION
    WHEN check_violation THEN RETURN NULL;
END
$$;


CREATE OR REPLACE FUNCTION extratos(
    cliente_id_arg int
)
RETURNS json
LANGUAGE plpgsql
AS $$
DECLARE 
  ret json;
BEGIN
    SELECT json_build_object (
        'saldo', (
            SELECT to_json(sld) FROM (
                SELECT saldo AS total, LOCALTIMESTAMP AS data_extrato, limite
                FROM cliente WHERE cliente.id = cliente_id_arg LIMIT 1
            ) sld
        ),
        'ultimas_transacoes',(
            SELECT coalesce(json_agg(tr), '[]'::json) FROM (
                SELECT valor, tipo_transacao as tipo, descricao, data_transacao FROM transacao
                WHERE cliente_id = cliente_id_arg ORDER BY data_transacao DESC LIMIT 10
            ) tr
        )
    ) INTO ret;
    IF NOT FOUND THEN
        ret := NULL;
    END IF;
    RETURN ret;
END
$$;

INSERT INTO cliente (saldo, limite)
VALUES 
(0, 100000),
(0, 80000),
(0, 1000000),
(0, 10000000),
(0, 500000);


-- DB Version: 17
-- OS Type: linux
-- DB Type: web
-- Total Memory (RAM): 360 MB
-- Connections num: 600
-- Data Storage: ssd

ALTER SYSTEM SET
 max_connections = '600';
ALTER SYSTEM SET
 shared_buffers = '90MB';
ALTER SYSTEM SET
 effective_cache_size = '270MB';
ALTER SYSTEM SET
 maintenance_work_mem = '23040kB';
ALTER SYSTEM SET
 checkpoint_completion_target = '0.9';
ALTER SYSTEM SET
 wal_buffers = '2764kB';
ALTER SYSTEM SET
 default_statistics_target = '100';
ALTER SYSTEM SET
 random_page_cost = '1.1';
ALTER SYSTEM SET
 effective_io_concurrency = '200';
ALTER SYSTEM SET
 work_mem = '76kB';
ALTER SYSTEM SET
 huge_pages = 'off';
ALTER SYSTEM SET
 min_wal_size = '1GB';
ALTER SYSTEM SET
 max_wal_size = '4GB';