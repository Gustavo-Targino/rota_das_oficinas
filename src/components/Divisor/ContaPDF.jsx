import pdfMake from "pdfmake/build/pdfmake";



export default function ContaPDF(conta) {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const dono = `Conta de${conta.map((pessoa)=>' '+pessoa.nome)}` 

    const contaHeader = [{
        text: [dono, '\n\n\n\n'],
        alignment: 'center',
        fontSize: 20,
        bold: true, 
        margin: [15,20,0,15] //left, top, right, bottom
    }]


    

    const dados =  conta.map((cliente)=> {
            return  [
                {text: `${cliente.nome}` , fontSize: 12},
                {text: `${cliente.consumiu.join(', ')}`,  fontSize: 12},
                {text: `R$${cliente.total_a_pagar}`,  fontSize: 12},
            ]
        })
    

    const detalhes = [{
        table:{
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: [
                [
                    {text: 'Cliente', style:'tableHeader', fontSize: 15},
                    {text: 'Produtos', style:'tableHeader', fontSize: 15},
                    {text: 'Total', style:'tableHeader', fontSize: 15},
                ],
                ...dados,
            ]
        }, 
        layout: 'lightHorizontalLines',
        alignment: 'center'
    }]

    const rodape = [{
        text: `© Gustavo Targino - Desenvolvedor Front-End - ${new Date().getFullYear()}`,
        aligment: 'left',
        style: ['quote'],
        bold: true, 
        margin: [15,0,0,15] //left, top, right, bottom
    }]


    const definicoes = {
        pageSize: 'a4',
        pageMargins: [15, 50, 15, 40],

        header:[contaHeader],

        content: [detalhes, {text:'\n \n \n \n \nA conta é gerada da seguinte forma:\n Todos os itens que o cliente consumiu são somados, e este valor é dividido pelo total de pessoas que consumiram o mesmo que aquele cliente. \n Exemplo: João consumiu água, de valor R$3. Então, João deve pagar R$3.\n José, Mayara e Clara consumiram uma pizza, de valor R$51. Então, cada um deve pagar R$17. Assim, o total é para cada item que o cliente comprou.\nNo exemplo de José, Mayara e Clara, caso eles comprassem duas pizzas, ao invés de uma, o valor deve ser R$34 para cada.'}],

        footer: [rodape],

        info: {
            title: dono,
            author: 'Divisor de conta de restaurante',
            subject: 'Este arquivo possui uma divisão de valores em uma conta de restaurante',
            creator: 'Divisor de conta de restaurante',
            producer: 'Repositório no GitHub'
        }

    }

    pdfMake.createPdf(definicoes).download(`${dono}`)

}

