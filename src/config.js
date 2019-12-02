global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';//chave exemplo
global.EMAIL_TMPL = 'Olá jovem Padawan, <strong> {0}</strong>, ';

module.exports = {
    connectionString: 'CONECTION_STRING',
    sendGridKey: 'sendGrid-Key',//chade de acesso a api de envio de e-mail criado no sendgrid.com
    // userImagesBlobConnectionString: 'DefaultEndpointsProtocol=https;AccountName=valdionorjs;AccountKey=rYHTrl5JyCbwNBMzzQLFtUPhxrqiidE1ocvZIO4Bjh8N/f9iG3qagZkbrJbWQc4Uw93yW8eA3aPJfrJMJ26i9w==;EndpointSuffix=core.windows.net' //usado para armazenar imagens no Eger
    userImagesBlobConnectionString: "CONECTION_STRING"
}
