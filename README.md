# PlayHub — Portal de Mini-Jogos

Portal de mini-jogos gratuitos, direto no navegador. HTML, CSS e JavaScript puros — sem frameworks, sem build, sem instalação. Também funciona como PWA (instalável e com suporte offline via Service Worker).

## Jogos

| Jogo | Descrição |
|---|---|
| 🎮 Jogo da Velha | Clássico 2 jogadores no mesmo dispositivo |
| 🐍 Snake | Coma as maçãs, cresça e não bata na parede nem em você mesmo |
| 🔢 2048 | Combine os números e tente chegar ao bloco 2048 |
| 🃏 Jogo da Memória | Vire as cartas e encontre todos os pares |
| 🧩 Quebra-Cabeça 15 | Reorganize as peças até formar a sequência correta |
| 💣 Campo Minado | Revele as células sem tocar em nenhuma mina, três níveis |
| ⚽ Fantasy World Cup | Monte seu Dream Team escalando jogadores reais de Copas do Mundo históricas por posição no campo (com formações táticas: 4-4-2, 4-3-3, 3-5-2, 5-3-2, 4-2-3-1) e dispute um torneio simulado |

## Rodando localmente

Como é um site 100% estático, basta servir a pasta com qualquer servidor HTTP simples (necessário para o Service Worker/PWA funcionar corretamente — abrir os arquivos direto via `file://` também funciona para jogar, mas sem PWA):

```bash
# Python
python -m http.server 8080

# ou Node
npx serve .
```

Depois acesse `http://localhost:8080`.

## Estrutura do projeto

```
.
├── index.html          # Página inicial com a grade de jogos
├── about.html           # Sobre o projeto
├── manifest.json         # Manifest do PWA
├── sw.js                 # Service Worker (cache offline)
├── assets/
│   ├── style.css          # Estilo global (temas, layout, componentes)
│   ├── theme.js           # Alternância de temas
│   ├── sfx.js              # Efeitos sonoros
│   ├── share.js            # Compartilhamento de resultados
│   ├── pwa.js               # Registro do Service Worker / instalação PWA
│   ├── icons.js              # Ícones SVG inline usados nos jogos
│   ├── photos.js              # Utilitários de imagens/fotos
│   └── icon.svg                 # Ícone do app
└── games/
    ├── tictactoe.html
    ├── snake.html
    ├── 2048.html
    ├── memory.html
    ├── puzzle.html
    ├── minesweeper.html
    └── worldcup.html
```

## Tecnologias

- HTML5, CSS3, JavaScript (vanilla, sem dependências externas)
- PWA (manifest + service worker) para instalação e uso offline
- Alternância de tema visual (Retro/Neon) via `assets/theme.js`

## Licença

Uso pessoal / educacional.
