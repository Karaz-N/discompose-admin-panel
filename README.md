# Procedure per il deployment

## Prerequisiti

- Docker
- Node
- Bun

## Creare DB

```bash
    source make-db.sh
```

## Sucati l'IP del DB

```bash
    docker ps
```

```bash
    docker inspect <container_id> | grep IPAddress
```

## Creare Client

```bash
    source deploy.sh
```

## Fare porting del DB

```bash
    bun src/db/dump.ts
```

Ordine:
    - Places
    - Events
    - Prints, Images, Manuscripts
    - DocumentData
