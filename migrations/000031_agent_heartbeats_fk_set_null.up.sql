ALTER TABLE agent_heartbeats
DROP CONSTRAINT agent_heartbeats_provider_id_fkey,
ADD CONSTRAINT agent_heartbeats_provider_id_fkey
    FOREIGN KEY (provider_id)
    REFERENCES llm_providers(id)
    ON DELETE SET NULL;
