const express = require('express');
const router = express.Router();
const ChartjsNode = require('chartjs-node');
const config = require('../../modules/config');
const debug = require('debug')('chartjs-node-demo:api:generate-chart');
const azureStorage = require('azure-storage');
const BbPromise = require('bluebird');
const Guid = require('guid');
function uploadChart (azureStorageAccount, azureStorageKey, chartStream) {
    var blobService = BbPromise.promisifyAll(azureStorage.createBlobService(azureStorageAccount, azureStorageKey));
    var blobName = Guid.raw();
    debug('chartjs-node-demo/' + blobName + '.png');
    debug(chartStream.stream);
    debug('length: ' + chartStream.length);
    return blobService.createBlockBlobFromStreamAsync('cdn', 'email/' + blobName + '.png', chartStream.stream, chartStream.length - 1)
    .then(() => {
        return 'https://' + azureStorageAccount + '.azureedge.net/email/' + blobName + '.png';
    });
}
/* GET home page. */
router.post('/', function(req, res) {
    var chartJsConfig = req.body;
    var chartNode = new ChartjsNode(400, 400);
    debug('chartjs config:');
    debug(chartJsConfig);
    debug('options: ' + req.body.options);
    return chartNode.drawChart(chartJsConfig)
    .then(() => {
        return chartNode.getImageStream('image/png');
    })
    .then(result => {
        return uploadChart(config.get('AZURE_STORAGE_ACCOUNT'), config.get('AZURE_STORAGE_KEY'), result);
    })
    .then(link =>{
        return res.status(200).send({
            link: link
        });
    })
    .catch(err => {
        debug(err);
        return res.status(400).send({
            error: {
                title: err.toString(),
                code: 'Invalid Chartjs Config'
            }
        });
    });
});

module.exports = router;
