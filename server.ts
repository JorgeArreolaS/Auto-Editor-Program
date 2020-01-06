import { writeTemplate } from './src/Templates';
import { PluginList } from './src/Declarations';
import { copySync, existsSync, removeSync } from 'fs-extra';
import { Plugin, Template } from './src/Interfaces';
var express = require('express')
var http = require('http')
var path = require('path')
var reload = require('reload')
var bodyParser = require('body-parser')
var logger = require('morgan')
var watch = require('watch')
 
var app = express()

const currentTemplate = 'simpleText';
const templateBuilderPath = './templateBuilder';
const builderPageTemplate = 'builderPageTemplate.html';
 
app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, templateBuilderPath)));
var server = http.createServer(app)

const loadPlugin = (plugin: Plugin) => 
    copySync(path.join('./',plugin.src), path.join(templateBuilderPath, plugin.src));

const refreshFile = () => {
    return writeTemplate({
        name: currentTemplate,
        customPath: templateBuilderPath,
        customName: 'index.html',
        customMainTemplate: path.join(templateBuilderPath, builderPageTemplate)
    }).then( (temp: Template) => {
        const plugins: any[] = temp.plugins|| [];
        const pluginSources = PluginList.filter(plugin => plugins.includes(plugin.name))
        pluginSources.forEach( plugin => {
            if(!existsSync(path.join(templateBuilderPath, plugin.src))) loadPlugin(plugin)
        })
    })
}

const startServer = async () => {
    const reloadReturned = await reload(app);
    server.listen(app.get('port'), () => console.log('Web server listening on port ' + app.get('port')))
    watch.watchTree(__dirname + "/templates", async () => {
        await refreshFile();
        reloadReturned.reload()
    })
}

startServer()

process.on('SIGINT', ()=> {
    server.close();
    removeSync(path.join(templateBuilderPath,'node_modules'))
    process.exit();
})