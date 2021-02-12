# RIHOR-BOT

Apenas um bot de [discord](https://discordapp.com/).

## TOKEN

Para usar o bot você precisa de um token do discord e de credenciais da google.

Um arquivo `credentials.json` deve existe. Esse arquivo tem que ter a seguinte estrutura:

```json
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY-----\nEXEMPLO\n-----END PRIVATE KEY-----\n",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```

Para conseguir essas credenciais é necessário ir no console da google.

https://console.developers.google.com/

- Criar um projeto;
- Habilitar o uso da `Google Sheets API`;
- Ir na página de credenciais;
- Clicar em criar credenciais;
- Criar `Chave de API` e depois `Criar conta de serviço` também;

O arquivo json que você baixar você coloca na raiz do projeto como `credentials.json`.

A chave de API você coloca no `.env`. Conforme o exemplo `.env.example`.
