/**
 * Lista de Natal 2026 - recebe as cartinhas e grava na planilha.
 * Cole este arquivo inteiro no editor do Apps Script (veja o LEIA-ME.md).
 * Todos os textos são gravados em MAIÚSCULAS.
 */
const ABA = "CARTINHAS";
const COLUNAS = [
  "RECEBIDO EM", "NOME", "FAIXA", "IDADE", "CAMISA OU BLUSA", "CALÇA E BERMUDA",
  "CALÇADO", "TIPO DE BRINQUEDO", "BRINQUEDO", "COR FAVORITA", "IDEIA DE PRESENTE"
];

function maiusculo_(v) {
  return String(v == null ? "" : v).trim().toLocaleUpperCase("pt-BR");
}

function aba_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) aba = planilha.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    aba.getRange(1, 1, 1, COLUNAS.length).setValues([COLUNAS])
      .setFontWeight("bold").setBackground("#b31b34").setFontColor("#ffffff");
    aba.setFrozenRows(1);
  }
  return aba;
}

/** Rode uma vez à mão (menu Executar > preparar) para criar a aba e autorizar o script. */
function preparar() {
  aba_();
}

function responder_(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Abrir a URL do app no navegador mostra apenas este aviso. */
function doGet() {
  return responder_({ ok: true, mensagem: "Lista de Natal 2026 no ar." });
}

function doPost(e) {
  const trava = LockService.getScriptLock();
  trava.waitLock(20000);
  try {
    const dados = JSON.parse(e.postData.contents);
    const nome = maiusculo_(dados.nome);
    const camisa = maiusculo_(dados.camiseta);
    const calca = maiusculo_(dados.calca);
    const calcado = maiusculo_(dados.calcado);

    // mesma regra do formulário: estes quatro são obrigatórios
    if (!nome || !camisa || !calca || !calcado) {
      return responder_({ ok: false, erro: "Campos obrigatórios faltando." });
    }

    const tipos = Array.isArray(dados.brinquedoTipos)
      ? dados.brinquedoTipos.map(maiusculo_).join(", ")
      : maiusculo_(dados.brinquedoTipos);
    const recebido = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    const linha = [
      recebido, nome, maiusculo_(dados.faixa), maiusculo_(dados.idade),
      camisa, calca, calcado, tipos, maiusculo_(dados.brinquedo),
      maiusculo_(dados.corFavorita), maiusculo_(dados.ideia)
    ];

    const aba = aba_();
    const proxima = aba.getLastRow() + 1;
    const faixa = aba.getRange(proxima, 1, 1, linha.length);
    faixa.setNumberFormat("@");   // grava como texto: "42" e "M" ficam como foram enviados
    faixa.setValues([linha]);
    return responder_({ ok: true });
  } catch (erro) {
    return responder_({ ok: false, erro: String(erro) });
  } finally {
    trava.releaseLock();
  }
}
