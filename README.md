# 💈 Barbearia Virtual

A **Barbearia Virtual** é uma aplicação moderna desenvolvida com **React-Native.js**, **TypeScript** e **Expo**, oferecendo uma experiência completa para gerenciamento de agendamentos, visualização de barbeiros, serviços e muito mais. O sistema consome uma **API própria** desenvolvida em Node.js.

---

## 🚀 Tecnologias Utilizadas

- **React-Native.js**
- **TypeScript**
- **Expo**
- **Axios**
- **JWT Autenticação**
---

## ⚙️ Funcionalidades

- ✔️ Autenticação com JWT  
- ✔️ Listagem de barbeiros  
- ✔️ Agendamento de serviços  
- ✔️ Filtragem por "role" 
- ✔️ Cancelamento e remoção de agendamentos
- ✔️ Upload de avatar
- ✔️ Consumo da API própria  
- ✔️ Controle de permissões por usuário  
---

## 🖥️ Como rodar a aplicação

### 1️⃣ Clone o repositório e instale as dependências
```bash
git clone https://github.com/EduardoAugustoFReis/Barbearia-virtual.git

# Acesse o diretório do projeto
cd Barbearia-virtual

# Instale as dependências
npm install

# Se ainda não possuir o Expo CLI
npm install -g expo-cli

2️⃣ Configure a URL da API (baseURL do Axios)

# Para que a aplicação consiga consumir a API, é necessário configurar a URL base no arquivo:
src/services/api.ts

# Lá você encontrará algo como:
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

# Na raíz do projeto, caso não exista, crie um arquivo com o nome de ".env" e nele coloque a coloque o seguinte trecho de código.

EXPO_PUBLIC_API_URL=http://localhost:3333

# Importante!
# Em dispositivos físicos (seu celular por exemplo), localhost não funciona.
# Use sempre o IP da sua máquina na mesma rede Wi-Fi.
# Exemplo de uso:

EXPO_PUBLIC_API_URL=http://192.168.x.x:3333

3️⃣ Execute o projeto
npm run start
# ou
expo start
```

## 📚 API Consumida

A aplicação consome a API própria:

🔗 **[Repositório da API](https://github.com/EduardoAugustoFReis/api-barbearia)**

Principais endpoints:
```
POST /login
POST /users
GET  /users
GET  /users/barbers
GET  /services
POST /appointments
GET  /appointments
DELETE /appointments/:id
````

## 🧑‍💻 Autor

Desenvolvido por **Eduardo Augusto Franciscon Reis**

💼 **LinkedIn:**  
[www.linkedin.com/in/eduardo-augusto-franciscon-reis-173410283](https://www.linkedin.com/in/eduardo-augusto-franciscon-reis-173410283/)
