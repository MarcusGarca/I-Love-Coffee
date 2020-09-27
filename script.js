function cafe() {
    return document.getElementById("un-colheres").value * 20;
}
function compra() {
    return parseFloat(document.getElementById("gr-compra").value.replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.'));
}
function dispensa() {
    let saldoEmbalagem = compra();
    let consumido = consumoGrama();
    return saldoEmbalagem - consumido;
}
function feedCafe() {
    document.getElementById("cons-cafe").value = cafe() + " gramas";
}

function feedAgua() {
    document.getElementById("cons-agua").value = document.getElementById("un-colheres").value * 200 + " mililitros";
}

function consumoReal() {
    let valor = parseFloat(document.getElementById("vr-compra").value.replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.'));
    let embalagem = parseFloat(document.getElementById("gr-compra").value.replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.'));
    let consPreparo = cafe();
    let mes = parseFloat(document.getElementById("por-mes").value.replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.'));
    let dia = parseFloat(document.getElementById("por-dia").value.replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.'));
    return (consPreparo * dia * mes) * valor / embalagem;
}
function feedConsumoReal() {
    document.getElementById("real-porcao").value = consumoReal().toFixed(2)
}
function consumoGrama() {
    let cafeDia = parseFloat(document.getElementById("por-dia").value.replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.'));
    let cafeMes = parseFloat(document.getElementById("por-mes").value.replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.'));
    let cafeCons = cafe();

    return cafeDia * cafeMes * cafeCons
}

function feedConsumoGrama() {
    document.getElementById("grama-porcao").value = consumoGrama()
}

/** função Monetária**/

function formatarMoeda() {

    let ids = "";

    if (document.body.id == "cafe") { ids = ["vr-compra"] };


    for (let i = 0; i < ids.length; i++) {
        let elemento = document.getElementById(ids[i]);

        let valor = elemento.value;

        if (valor == 0) {
            valor === 0;
        } else {

            valor = valor + '';
            valor = parseInt(valor.replace(/[\D]+/g, ''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ",$1");


            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            if (valor.length > 10) {
                valor = valor.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3");
            }
            if (valor.length > 14) {
                valor = valor.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4");
            }
            if (valor.length > 18) {
                valor = valor.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3.$4,$5");
            }
            if (valor.length > 22) {
                valor = valor.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3.$4.$5,$6");
            }
            if (valor.length > 26) {
                valor = 0;
            }
            elemento.value = valor;
        }
    }
}

function alterarSmall() {
    let altere = "";
    if (consumoGrama() > compra()) {
        altere = document.getElementById("inf-cons-cafe").innerHTML = "Em tese seu café acabou";
        document.getElementById("inf-cons-cafe").className = "nova-small";
    } else {
        altere = document.getElementById("inf-cons-cafe").innerHTML = "Conforme suas informações";
        document.getElementById("inf-cons-cafe").className = "form-text text-muted";
    }
    return altere;

}

/**Tabela JS**/

google.charts.load('current', { 'packages': ['corechart'] });

function desenharPizza() {

    var tabela = new google.visualization.DataTable();
    tabela.addColumn('string', 'status');
    tabela.addColumn('number', 'gramas');
    tabela.addRows([

        ['Consumo', consumoGrama()],
        ['Minha Embalagem', dispensa()]
    ]);

    var opcoes = {
        'title': 'Consumo I Love Coffee',
        colors: ['#4b3621'],
    }
    var grafico = new google.visualization.ColumnChart(document.getElementById('graficoPizza'));
    grafico.draw(tabela, opcoes)

}

$(window).resize(function () {
    desenharPizza();
});


google.charts.setOnLoadCallback(desenharPizza);




