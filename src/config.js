global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';//chave exemplo
global.EMAIL_TMPL = 'Olá jovem Padawan, <strong> {0}</strong>, ';

module.exports = {
    connectionString: 'mongodb+srv://junior:bwi280281@cluster0-ruhsa.gcp.mongodb.net/nodedb',
    sendGridKey: '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',//chade de acesso a api de envio de e-mail criado no sendgrid.com
    // userImagesBlobConnectionString: 'DefaultEndpointsProtocol=https;AccountName=valdionorjs;AccountKey=rYHTrl5JyCbwNBMzzQLFtUPhxrqiidE1ocvZIO4Bjh8N/f9iG3qagZkbrJbWQc4Uw93yW8eA3aPJfrJMJ26i9w==;EndpointSuffix=core.windows.net' //usado para armazenar imagens no Eger
    userImagesBlobConnectionString: 'DefaultEndpointsProtocol=https;AccountName=valdionor;AccountKey=uoFvvgB6wGO5a1vNbLWVF/Y1+/lsGyK1YRD+sBuAvq6VzuoIgdVCGIWu+zLThIEypm5as2Rrl5mH2Q5RWLk7Tg==;EndpointSuffix=core.windows.net'
}