```mermaid
  erDiagram
    %% Estado ACTUAL de la base de datos - SIN claves foráneas definidas
    
    %% Tablas de formaciones (ya existen)
    FORMATIONS {
        bigint id PK
        varchar name
        smallint period
        timestamp created_at
        timestamp updated_at
    }
    
    FORMATIONSTRANS {
        bigint id PK
        smallint idformation "Debería ser FK a formations.id"
        varchar name
        varchar language
        timestamp created_at
        timestamp updated_at
    }
    
    %% Entidad principal
    TTSCMGROUP {
        bigint recid PK "Campo original"
        varchar name
        varchar ttscmgroupid "Código único del grupo"
        varchar inventsiteid "ID del sitio"
        varchar dataareaid "Campo legacy obligatorio"
        int idgrupoformativo "Debería apuntar a formations.id"
        timestamp created_at
        timestamp updated_at
    }
    
    %% Tablas de catálogos
    TTSCMEPIS {
        bigint recid PK "Campo original"
        varchar epi "Nombre del EPI"
        varchar dataareaid "Campo legacy obligatorio"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMMEDIDAS {
        bigint recid PK "Campo original"
        varchar descripmedidas "Descripción de la medida"
        varchar ttidmedidas "ID único de medida"
        varchar dataareaid "Campo legacy obligatorio"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMRIESGOS {
        bigint recid PK "Campo original - FALTA EN DEFINICIÓN"
        varchar descripriesgos "Descripción del riesgo"
        varchar ttidriesgo "ID único de riesgo"
        varchar dataareaid "Campo legacy obligatorio"
        timestamp created_at
        timestamp updated_at
    }
    
    %% Tablas de relación (SIN FKs definidas)
    TTSCMGROUPEPI {
        bigint recid PK "Campo original"
        varchar scmgrooup "Debería apuntar a ttscmgroup.ttscmgroupid"
        varchar epi "Debería apuntar a ttscmepis.epi"
        varchar dataareaid "Campo legacy obligatorio"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPMEDIDAS {
        bigint recid PK "Campo original"
        varchar descripmedidas "Descripción de medida específica"
        varchar ttidmedidas "Debería apuntar a ttscmmedidas.ttidmedidas"
        varchar ttidriesgo "Debería apuntar a ttscmriesgos.ttidriesgo"
        varchar ttscmgroupid "Debería apuntar a ttscmgroup.ttscmgroupid"
        varchar dataareaid "Campo legacy obligatorio"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPRIESGOS {
        bigint recid PK "Campo original"
        varchar descripriesgos "Descripción de riesgo específico"
        varchar ttscmgroupid "Debería apuntar a ttscmgroup.ttscmgroupid"
        varchar ttidriesgo "Debería apuntar a ttscmriesgos.ttidriesgo"
        varchar dataareaid "Campo legacy obligatorio"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPTASK {
        bigint recid PK "Campo original"
        varchar taskname "Nombre de la tarea"
        varchar groupname "Nombre del grupo"
        varchar ttaskid "ID de la tarea"
        varchar ttscmgroupid "Debería apuntar a ttscmgroup.ttscmgroupid"
        varchar dataareaid "Campo legacy obligatorio"
        timestamp created_at
        timestamp updated_at
    }
    
    TTSCMGROUPPROPOSAL {
        bigint recid PK "Campo original"
        varchar ttscmgroupid "Debería apuntar a ttscmgroup.ttscmgroupid"
        bigint refrecidproposal "Referencia a propuesta externa"
        varchar dataareaid "Campo legacy obligatorio"
        timestamp created_at
        timestamp updated_at
    }
