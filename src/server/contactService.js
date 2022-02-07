/* eslint-disable no-useless-return */
const jsforce = require('jsforce');

module.exports = class contactService {

    /**
     * Builds the authentication service
     * @param {winston.Logger} logger
     * @param {AuthenticationService} authService
     */
     constructor(logger, authService) {
        this.logger = logger;
        this.authService = authService;
    }

    /**
     * Runs an SOQL query on Salesforce
     * @param {jsforce.Connection} conn - jsforce Connection
     * @param {string} soqlQuery - SOQL query
     * @returns {Promise<Array>} Promise holding an Array of records returned by SOQL query
     */
    _runSoql(conn, soqlQuery) {
        return new Promise((resolve, reject) => {
            conn.query(soqlQuery, (error, result) => {
                if (error) {
                    this.logger.error(
                        `Failed to run SOQL query: ${soqlQuery}`, 
                        error
                    );
                    reject(error);
                }
                resolve(result.records);
            });
        });
    }

    /**
     * Gets Conference Session records from Salesforce
     * @param {Object} req - server request
     * @param {Object} res - server response
     */
    getContactDetailList(req, res){
        const session = this.authService.getSession(req, res);
        if (session === null) {
            return;
        }
        const conn = new jsforce.Connection({
            accessToken: session.sfdcAccessToken,
            instanceUrl: session.sfdcInstanceUrl
        });

        // //Query
        // let soqlQuery;
        
        // soqlQuery = `SELECT Id, FirstName, LastName, Email 
        //     FROM Contact LIMIT 10`;

        // // Execute query and respond with result or error
        // this._runSoql(conn, soqlQuery).then((result) => {
        //     const formattedData = result.map(contactRecord => {
        //         return{
        //             id: contactRecord.id,
        //             firstName: contactRecord.firstName,
        //             lastName: contactRecord.lastName,
        //             email: contactRecord.email
        //         };
        //     });
        //     res.json({ data: formattedData });
        // })
        // .catch((error) => {
        //     this.logger.error(
        //         'Failed to retrieve conference session(s)',
        //         error
        //     );
        //     res.status(500).send(error);
        // });
        const soql = `SELECT Id, FirstName, LastName, Email, Picture_URL__c 
            FROM Contact WHERE Id IN ('0035j000008dUBzAAM','0035j000008dUC0AAM','0035j000008dUC1AAM','0035j000008dUC2AAM')`;
            conn.query(soql, (err, result) => {
                if (err) {
                    res.sendStatus(500);
                } else if (result.records.length === 0) {
                    res.status(404).send('Contact not found.');
                } else {
                    console.log('Data is here');
                    console.log(result.records);
                    const formattedData = result.records.map(conRecord => {                        
                        return {
                            id: conRecord.Id,
                            firstName: conRecord.FirstName,
                            lastName: conRecord.LastName,
                            email: conRecord.Email,
                            pic: conRecord.Picture_URL__c,
                        };
                    });
                    res.json({ data: formattedData });
                }
            });
    }
}