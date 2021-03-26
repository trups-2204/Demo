const express = require('express');
const _ = require('lodash');
const fs =require('fs');
const bodyParser = require('body-parser');
const log = require('fancy-log');
const colors = require('ansi-colors')
const app = express();
const endpoints = require('./endpoints.json');
const { request } = require('http');
const yargs = require('yargs');

const settings ={
    port: 8080,
    ip: '0.0.0.0',
    mountRoot: '/',
}

const DEFAULT_ERROR_RESPONSE ={"errors":[{"code":"123456", "message":"Unable to process your request.Please try again later" }]};

const writeContent =( res, parsedResonse, url) => {

    const status = _.get(parsedResonse,'status',500);
    const body = JSON.stringify(_.get(parsedResonse,'body',DEFAULT_ERROR_RESPONSE));
    const requestLog= (status == 200)? colors.greenBright(`Success respnse : ${url}`): colors.redBright(`Failure response: ${url}`);
    log.info(requestLog);
    res.writeHead(status,{
        'Content-Type': 'application/json',
    });
    res.write(body);
    res.end();
}
const ENDPOINT_TYPE ={

    SINGLE_DATA: 'single_data',
    MULTI_DATA: 'multi_data'
}

const startServer = (argv, conf)=>{

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Methods','*');
        res.header('Access-Control-Allow-Credentials','*');        
        res.header('Access-Control-Allow-Headers','*');        
        next();

    });
    app.use(bodyParser.json());
    if(argv.staticJsonPath){
        if(fs.existsSync(argv.staticJsonPath)){
            const endpointsData = _.get(endpoints,'endpoints',[]);
            if(endpointsData.length){
                endpointsData.forEach((endpoint) =>{

                    const {endpoint_type = ENDPOINT_TYPE.SINGLE_DATA}= endpoint;
                    if(endpoint_type === ENDPOINT_TYPE.SINGLE_DATA)
                    {
                        handleSingleDataPoint(argv, endpoint);

                    }
                    else if(endpoint_type === ENDPOINT_TYPE.MULTI_DATA)
                    {
                        handleMultiDataPoint(argv, endpoint);

                    }
                    else{
                        /** Will handle in future for other types of endpoint  */
                    }
                })
            }
        }
        else
        {
            log.error(colors.redBright(`Unable to find the static mock data folder.Please provide valid path`))
            process.exit();
        }
}
else{
    log.error(colors.redBright(`Please provide valid static mock data folder path`))
    process.exit();
}
app.listen(conf.port, conf.ip);
console.log(
    `Server http started successfully on port http://${conf.ip}: ${conf.port} `,
);
};

const handleSingleDataPoint =(argv, endpoint) =>{

    const {endpint_path: url =''}= endpoint;
    if(url){
        try{
            const filePath = `${argv.staticJsonPath}/${url}/default.json`;
            fs.accessSync(filePath, fs.constants.F_OK);
            const fileData = fs.readFileSync(filePath, 'utf8');
            const parsedFileData = JSON.parse(fileData);
            log.info(colors.greenBright(`Mocking endpoint ${colors.yellowBright(`${parsedFileData.method.toUpperCase()}: ${url}`)}`));

            app[parsedFileData.method](`${settings.mountRoot}${url}`, (req,res) =>{
                log.info(colors.yellowBright(`Single data request: ${url}`));
                writeContent(res, parsedFileData, url);
            });
        }
        catch(error){
            log.error(colors.redBright(`Unable to parse the static mock data`));
            log.error(colors.redBright(error));
            process.exit();
        }
    }
    else
    {
        log.error(colors.redBright(`Unable to create the mock endpoint: invalid config parameters`));
        process.exit();

    }
}



const handleMultiDataPoint =(argv, endpoint) =>{

    const {endpint_path: url ='', request_selector =''}= endpoint;
    const filePath = `${argv.staticJsonPath}/${url}/default.json`;

    if(url){
        try{
            fs.accessSync(filePath, fs.constants.F_OK);
            const fileData = fs.readFileSync(filePath, 'utf8');
            const parsedFileData = JSON.parse(fileData);
            log.info(colors.greenBright(`Mocking endpoint ${colors.yellowBright(`${parsedFileData.method.toUpperCase()}: ${url}`)}`));

            app[parsedFileData.method](`${settings.mountRoot}${url}`, (req,res) =>{
                log.info(colors.yellowBright(`Multi data request: ${url}`));
                const dataSelector = _.get( req.body, request_selector, null);
                log.info(colors.yellowBright(`Multi data request selector : ${request_selector}: ${dataSelector}`));
                if(dataSelector!= null)
                {
                    try{
                        const response = fs.readFileSync (`${argv.staticJsonPath}/${url}/${dataSelector}/default.json`);
                        const parsedResonse = JSON.parse(response);
                        writeContent(res, parsedResonse, url);
                    }
                    catch(error){
                        log.error(colors.redBright(`Unable to parse the static mock data`));
                        res.writeHead(500,{
                            'Content-Type': 'application/json',
                        });
                        res.write(JSON.stringify(DEFAULT_ERROR_RESPONSE));
                        res.end();
                    }
                }
                else
                {
                    log.error(colors.redBright(`Unable to read the request selector from the endpoint data`));
                    res.writeHead(500, {
                        'Content-Type': 'application/json',
                    });
                    res.write(JSON.stringify(DEFAULT_ERROR_RESPONSE));
                    res.end();
                }
            });
        }
        catch(error){
            log.error(colors.redBright(`Unable to parse the static mock data`));
            log.error(colors.redBright(error));
            process.exit();
        }
    }
    else
    {
        log.error(colors.redBright(`Unable to create the mock endpoint: invalid config parameters`));
        process.exit();

    }
}

const yargsCommand = {
    command: ' $0 <staticJsonPath>',
    alias: 'start',
    desc: 'start mock server with endpoints from json file',
    handler : argv =>{
        console.info(`starting mock server with endpoints from ${argv.staticJsonPath}`);
        const conf ={
            ip: argv.ip || settings.ip,
            port: argv.port || settings.port,
        };

        startServer(argv, conf);
    
    },
};

const yargsOptions ={

    ip:{
        alias: 'i',
        describe: 'ip address of the mock server',
        default: '0.0.0.0'
    },
    port:{
        alias:'p',
        describe: 'port of the mock server',
        default: '8080',
    },
    staticJsonPath:{
        describe: 'path for static mock json folder',
        default: './mock-api/data',
    },
};

yargs
.command(yargsCommand)
.options(yargsOptions)
.help().argv;