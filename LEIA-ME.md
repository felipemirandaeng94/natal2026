# Lista de Natal 2026

Página de cartinhas com tamanhos (camisa ou blusa, calça e bermuda, calçado). As respostas caem numa planilha do Google, em letras maiúsculas.

Arquivos:
- `index.html`: a página. Já está ligada ao Apps Script (campo `endpoint`).
- `assets/`: floresta (`cena.jpg`), trenó (`trineo.webp`) e música (`musica.mp3`). Para trocar a música, substitua `assets/musica.mp3` mantendo o nome.
- `apps-script.gs`: código que recebe as respostas e grava na planilha.

## 1. Criar a planilha e o script

1. Entre em https://sheets.google.com e crie uma planilha em branco. Nome sugerido: `Lista de Natal 2026`.
2. No menu da planilha: Extensões > Apps Script.
3. Apague o código que vier no editor e cole todo o conteúdo de `apps-script.gs`. Salve (ícone de disquete).
4. Na lista de funções acima do editor, escolha `preparar` e clique em Executar. O Google vai pedir autorização: Revisar permissões > escolha sua conta > Avançado > Acessar (não seguro) > Permitir. Isso é normal em script próprio.
5. Volte à planilha: deve existir a aba `CARTINHAS` com o cabeçalho.

## 2. Publicar como aplicativo da web

1. No Apps Script: Implantar > Nova implantação.
2. Engrenagem ao lado de "Selecionar tipo" > Aplicativo da Web.
3. Descrição: `Lista de Natal`. Executar como: **Eu**. Quem pode acessar: **Qualquer pessoa**.
4. Implantar e copiar a **URL do app da web** (termina em `/exec`).
5. Teste: abra essa URL no navegador. Deve aparecer `{"ok":true,"mensagem":"Lista de Natal 2026 no ar."}`.

Se mudar o código depois, use Implantar > Gerenciar implantações > lápis > Versão: Nova versão. A URL continua a mesma.

## 3. Ligar a página à planilha

1. (Já feito neste repositório.) Abra `index.html` e procure a linha:
   `const CONFIG = { endpoint: "" };`
2. Cole a URL entre as aspas:
   `const CONFIG = { endpoint: "https://script.google.com/macros/s/XXXX/exec" };`
3. Salve e envie para o GitHub.
4. Com o endpoint preenchido, o aviso de prévia some, o botão passa a dizer "Revisar e enviar" e o envio é de verdade.

## 4. Publicar no GitHub Pages

1. No repositório: Settings > Pages.
2. Source: Deploy from a branch. Branch: `main`, pasta `/ (root)`. Salvar.
3. Em 1 a 2 minutos a página fica em `https://SEU-USUARIO.github.io/natal2026/`.

## 5. Teste final

1. Abra a página publicada, preencha uma cartinha de teste, confirme no pop up.
2. Confira se a linha apareceu na aba `CARTINHAS`, em maiúsculas.
3. Apague a linha de teste antes de divulgar o link.

## Observações

- A página não consegue ler a resposta do Google (limitação do navegador com `no-cors`), então "Cartinha enviada" significa que o envio saiu. Por isso o teste da etapa 5 é importante.
- Quem tiver a URL do app pode enviar linhas. Para um link de família, o risco é baixo.
- A música é um arquivo comercial. Em site público, considere trocar por uma faixa livre.
