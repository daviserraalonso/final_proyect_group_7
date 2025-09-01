```mermaid
erDiagram
    TTSCMGROUP {
        bigint id PK
        varchar name
        varchar ttscmgroupid "LEGACY - código original"
        varchar inventsiteid "LEGACY - sitio original"
        int idgrupoformativo "LEGACY - ID grupo formativo original"
        varchar dataareaid "LEGACY - mantener para migración"
        varchar code "Nueva columna - código limpio"
        varchar site_id "Nueva columna - sitio"
        bigint formation_id "Nueva columna - FK a formations"
        timestamp created_at
        timestamp updated_at
    }
    
    FORMATIONS {
        bigint id PK
        varchar name
        smallint period
        timestamp created_at
        timestamp updated_at
    }
    
    FORMATIONSTRANS {
        bigint id PK
        smallint idformation "FK a formations"
        varchar name
        varchar language
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMEPIS {
        bigint id PK
        varchar epi "LEGACY - nombre original"
        varchar dataareaid "LEGACY - mantener para migración"
        varchar name "Nueva columna - nombre limpio"
        varchar description "Nueva columna - descripción"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMMEDIDAS {
        bigint id PK
        varchar descripmedidas "LEGACY - descripción original"
        varchar ttidmedidas "LEGACY - ID medida original"
        varchar dataareaid "LEGACY - mantener para migración"
        varchar description "Nueva columna - descripción limpia"
        varchar code "Nueva columna - código limpio"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMRIESGOS {
        bigint id PK
        varchar descripriesgos "LEGACY - descripción original"
        varchar ttidriesgo "LEGACY - ID riesgo original"
        varchar dataareaid "LEGACY - mantener para migración"
        varchar description "Nueva columna - descripción limpia"
        varchar code "Nueva columna - código limpio"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPEPI {
        bigint id PK
        varchar scmgrooup "LEGACY - grupo original"
        varchar epi "LEGACY - EPI original"
        varchar dataareaid "LEGACY - mantener para migración"
        bigint ttscmgroup_id "Nueva columna - FK a grupos"
        bigint ttscmepi_id "Nueva columna - FK a EPIs"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPMEDIDAS {
        bigint id PK
        varchar descripmedidas "LEGACY - descripción original"
        varchar ttidmedidas "LEGACY - ID medida original"
        varchar ttidriesgo "LEGACY - ID riesgo original"
        varchar ttscmgroupid "LEGACY - ID grupo original"
        varchar dataareaid "LEGACY - mantener para migración"
        varchar description "Nueva columna - descripción"
        bigint ttscmgroup_id "Nueva columna - FK a grupos"
        bigint ttscmmedida_id "Nueva columna - FK a medidas"
        bigint ttscmriesgo_id "Nueva columna - FK a riesgos"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPRIESGOS {
        bigint id PK
        varchar descripriesgos "LEGACY - descripción original"
        varchar ttscmgroupid "LEGACY - ID grupo original"
        varchar ttidriesgo "LEGACY - ID riesgo original"
        varchar dataareaid "LEGACY - mantener para migración"
        varchar description "Nueva columna - descripción"
        bigint ttscmgroup_id "Nueva columna - FK a grupos"
        bigint ttscmriesgo_id "Nueva columna - FK a riesgos"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPTASK {
        bigint id PK
        varchar taskname "LEGACY - nombre tarea original"
        varchar groupname "LEGACY - nombre grupo original"
        varchar ttaskid "LEGACY - ID tarea original"
        varchar ttscmgroupid "LEGACY - ID grupo original"
        varchar dataareaid "LEGACY - mantener para migración"
        varchar task_name "Nueva columna - nombre tarea"
        varchar task_code "Nueva columna - código tarea"
        bigint ttscmgroup_id "Nueva columna - FK a grupos"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPPROPOSAL {
        bigint id PK
        varchar ttscmgroupid "LEGACY - ID grupo original"
        bigint refrecidproposal "LEGACY - referencia propuesta original"
        varchar dataareaid "LEGACY - mantener para migración"
        bigint ttscmgroup_id "Nueva columna - FK a grupos"
        bigint proposal_reference_id "Nueva columna - referencia propuesta"
        timestamp created_at
        timestamp updated_at
    }

    FORMATIONS ||--o{ FORMATIONSTRANS : "has_translations"
    FORMATIONS ||--o{ TTSCMGROUP : "includes_groups"
    TTSCMGROUP ||--o{ TTSCMGROUPEPI : "assigns_ppe"
    TTSCMGROUP ||--o{ TTSCMGROUPMEDIDAS : "implements_measures"
    TTSCMGROUP ||--o{ TTSCMGROUPRIESGOS : "assesses_risks"
    TTSCMGROUP ||--o{ TTSCMGROUPTASK : "has_tasks"
    TTSCMGROUP ||--o{ TTSCMGROUPPROPOSAL : "creates_proposals"
    TTSCMEPIS ||--o{ TTSCMGROUPEPI : "assigned_to_groups"
    TTSCMMEDIDAS ||--o{ TTSCMGROUPMEDIDAS : "referenced_by_groups"
    TTSCMRIESGOS ||--o{ TTSCMGROUPRIESGOS : "categorizes_group_risks"
    TTSCMRIESGOS ||--o{ TTSCMGROUPMEDIDAS : "mitigated_by_measures"
