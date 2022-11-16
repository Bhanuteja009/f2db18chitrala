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
exports.house_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await house.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 
 

 
// Handle House delete on DELETE. 
exports.house_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await house.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
};  
 
// Handle House update form on PUT. 
exports.house_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await house.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.house_bedrooms)  
               toUpdate.house_bedrooms = req.body.house_bedrooms; 
        if(req.body.house_rent) toUpdate.house_rent = req.body.house_rent; 
        if(req.body.house_address) toUpdate.house_address = req.body.house_address; 
        let result = await toUpdate.save(); 
        console.log("Success " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 

// VIEWS 
// Handle a show all view 
exports.house_view_all_Page = async function(req, res) { 
    try{ 
        theHouses = await house.find(); 
        res.render('house', { title: 'House Search Results', results: theHouses }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
};

// Handle House create on POST. 
exports.house_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new house(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"costume_type":"goat", "cost":12, "size":"large"} 
    document.house_bedrooms = req.body.house_bedrooms; 
    document.house_rent = req.body.house_rent; 
    document.house_address = req.body.house_address; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// Handle a show one view with id specified by query 
exports.house_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await house.findById( req.query.id) 
        res.render('housedetail',  
{ title: 'House Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

 // Handle building the view for creating a costume. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.house_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('houseCreate', { title: 'House Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 
 

// Handle building the view for updating a costume. 
// query provides the id 
exports.house_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await house.findById(req.query.id) 
        res.render('houseupdate', { title: 'House Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
};

// Handle a delete one view with id from query 
exports.house_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await house.findById(req.query.id) 
        res.render('housedelete', { title: 'House Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 