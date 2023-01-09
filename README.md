# Trabalho IHC

## Requisitos
  - expo - https://docs.expo.dev/get-started/installation/
  - node.js - https://nodejs.org/en/
  - Para rodar o projeto pode se usar o emulador no PC ou baixar o app Expo na Play Store - https://play.google.com/store/apps/details?id=host.exp.exponent&gl=US&pli=1
  
  

## Configurar IP

No front no arquivo sr/services/API.js colocar IP do seu computador no lugar de IP:

```javascript
const api = axios.create({
  baseURL: `http://IP:4000` //endereço ipv4 + porta da api
});
```

## Instalação

Rodar tanto para o front quanto para o back:

```bash
npm install
```

## Rodar

### Front

```javascript
npx expo start
```

### Back

```javascript
npm start
```
