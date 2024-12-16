# Usando a imagem oficial do Node.js
FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do repositório para o container
COPY . .

# Exponha a porta na qual o app vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
