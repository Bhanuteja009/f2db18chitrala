var house = require('../models/house'); 
 
// List of all Houses 
exports.house_list = async function(req, res) { 
    try{ 
        theHouses = await house.find(); 
        res.send(theHouses); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// for a specific House. 
exports.house_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: House detail: ' + req.params.id); 
}; 
 
// Handle House create on POST. 
exports.house_create_post = function(req, res) { 
    res.send('NOT IMPLEMENTED: House create POST'); 
}; 
 
// Handle House delete form on DELETE. 
exports.house_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: House delete DELETE ' + req.params.id); 
}; 
 
// Handle House update form on PUT. 
exports.house_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: House update PUT' + req.params.id); 
};